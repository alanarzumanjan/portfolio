import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./project_anket.css";
import AddIcon from "../../assets/add.png"

function ProjectAnket() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [openReactionMenuId, setOpenReactionMenuId] = useState(null);

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const resProject = await fetch(`${backendUrl}/projects/${id}`);
                const jsonProject = await resProject.json();
                setProject(jsonProject.data);

                const resReviews = await fetch(`${backendUrl}/reviews/project/${id}`);
                const jsonReviews = await resReviews.json();
                setReviews(jsonReviews);
            } catch (err) {
                console.error("Error loading project or reviews:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id, backendUrl]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim() || !comment.trim()) return;

        try {
            const res = await fetch(`${backendUrl}/reviews/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, comment }),
            });

            const result = await res.json();
            if (res.ok) {
                setReviews((prev) => [...prev, result.data]);
                setUsername("");
                setComment("");
                setShowForm(false);
            }
        } catch (err) {
            console.error("Error submitting review:", err);
        }
    };

    const handleReact = async (reviewId, emoji) => {
        const reactedKey = `reacted_${reviewId}_${emoji}`;
        const alreadyReacted = localStorage.getItem(reactedKey);
        const method = alreadyReacted ? "DELETE" : "POST";

        const url = alreadyReacted
            ? `${backendUrl}/reactions/review/${reviewId}?emoji=${encodeURIComponent(emoji)}`
            : `${backendUrl}/reactions/${reviewId}`;

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: method === "POST" ? JSON.stringify({ emoji }) : null,
            });

            const result = await res.json();
            if (!res.ok) return;

            if (alreadyReacted) {
                localStorage.removeItem(reactedKey);
            } else {
                localStorage.setItem(reactedKey, "1");
            }

            setReviews((prev) =>
                prev.map((review) => {
                    if (review.id !== reviewId) return review;

                    const existing = review.reactions?.find((r) => r.emoji === emoji);

                    if (existing) {
                        if (alreadyReacted) {
                            const updated = review.reactions
                                .map((r) =>
                                    r.emoji === emoji
                                        ? { ...r, count: Math.max(0, r.count - 1) }
                                        : r
                                )
                                .filter((r) => r.count > 0);
                            return { ...review, reactions: updated };
                        } else {
                            return {
                                ...review,
                                reactions: review.reactions.map((r) =>
                                    r.emoji === emoji ? { ...r, count: result.data.count } : r
                                ),
                            };
                        }
                    } else {
                        return {
                            ...review,
                            reactions: [...(review.reactions || []), result.data],
                        };
                    }
                })
            );
        } catch (err) {
            console.error("Failed to toggle reaction:", err);
        }
    };



    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest(".reaction-dropdown-click")) {
                setOpenReactionMenuId(null);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!project) return <p>Project not found.</p>;

    return (
        <div className="project-details">
            <div className="project-header">
                <img src={`${backendUrl}${project.imageUrl}`} alt={project.title} />
                <div className="project-info">
                    <h1>{project.title}</h1>
                    <p>{project.description}</p>
                    <p className="project_language">
                        <strong>Languages:</strong> {project.languages}
                    </p>
                    <div className="project-buttons">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-button">Repo</a>
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-button">Live</a>
                        )}
                    </div>
                </div>
            </div>

            <div className="project-reviews">
                <div className="add-review-container">
                    <button className="add-review-button" onClick={() => setShowForm(true)}>
                        <img src={AddIcon} alt="+" />
                    </button>
                </div>

                {reviews.length === 0 && <p>No reviews yet.</p>}
                {reviews.map((review) => (
                    <div key={review.id} className="review-item">
                        <p><strong>{review.username}</strong>:</p>
                        <p>{review.comment}</p>

                        <div className="review-reactions">
                            {review.reactions?.map((reaction) => (
                                <button key={reaction.id} className="reaction-btn"
                                    onClick={() => handleReact(review.id, reaction.emoji)}>
                                    {reaction.emoji} {reaction.count}
                                </button>
                            ))}

                            <div className="reaction-dropdown-click">
                                <button
                                    className="reaction-trigger"
                                    onClick={() =>
                                        setOpenReactionMenuId(
                                            openReactionMenuId === review.id ? null : review.id
                                        )
                                    } > +
                                </button>

                                {openReactionMenuId === review.id && (
                                    <div className="reaction-options-click">
                                        {["👍", "❤️", "😂", "🔥"].map((emoji) => (
                                            <button
                                                key={emoji}
                                                className="reaction-btn"
                                                onClick={() => {
                                                    handleReact(review.id, emoji);
                                                    setOpenReactionMenuId(null);
                                                }}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <small>{new Date(review.createdAt).toLocaleString()}</small>
                    </div>
                ))}
            </div>

            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowForm(false)}>✕</button>
                        <h3>Leave a review</h3>
                        <form className="review-form" onSubmit={handleReviewSubmit}>
                            <input
                                type="text"
                                placeholder="Your name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Your comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectAnket;
