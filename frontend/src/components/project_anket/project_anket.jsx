import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./project_anket.css";

function ProjectAnket() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const resProject = await fetch(`http://localhost:5000/projects/${id}`);
                const jsonProject = await resProject.json();
                setProject(jsonProject.data);

                const resReviews = await fetch(`http://localhost:5000/reviews/project/${id}`);
                const jsonReviews = await resReviews.json();
                setReviews(jsonReviews);
            } catch (err) {
                console.error("Error loading project or reviews:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim() || !comment.trim()) return;

        try {
            const res = await fetch(`http://localhost:5000/reviews/${id}`, {
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

    if (loading) return <p>Loading...</p>;
    if (!project) return <p>Project not found.</p>;

    return (
        <div className="project-details">
            <div className="project-header">
                <img src={`http://localhost:5000${project.imageUrl}`} alt={project.title} />
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
                <button className="add-review-button" onClick={() => setShowForm(true)}>+</button>
                <h2>Reviews</h2>
                {reviews.length === 0 && <p>No reviews yet.</p>}
                {reviews.map((review) => (
                    <div key={review.id} className="review-item">
                        <p><strong>{review.username}</strong>:</p>
                        <p>{review.comment}</p>
                        <small>{new Date(review.createdAt).toLocaleString()}</small>
                    </div>
                ))}
            </div>


            {/* Modal Form */}
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
