import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
import "./project_anket.css";

function ProjectAnket() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`http://localhost:5000/projects/${id}`);
                const result = await response.json();
                setProject(result?.data);

                const reviewsRes = await fetch(`http://localhost:5000/reviews/project/${id}`);
                if (reviewsRes.ok) {

                    const reviewsJson = await reviewsRes.json();
                    console.log("reviewsJson", reviewsJson);
                    console.log("setReviews:", reviewsJson.data);
                    setReviews(reviewsJson.data ?? []);
                    console.log("✅ Reviews state after set:", reviewsJson.data);

                }

            } catch (err) {
                console.error("Error loading project:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

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
            <div className="reviews">
                {Array.isArray(reviews) && reviews.length > 0 && (
                    <div className="project-reviews">
                        <h2>Reviews</h2>
                        {reviews.map((review) => (
                            <div key={review.id} className="review-item">
                                <p><strong>{review.username}</strong>:</p>
                                <p>{review.comment}</p>
                                <small>{new Date(review.createdAt).toLocaleString()}</small>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}

export default ProjectAnket;
