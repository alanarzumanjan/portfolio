import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./project_anket.css";

function ProjectAnket() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [readme, setReadme] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`http://localhost:5000/projects/${id}`);
                const result = await response.json();
                setProject(result?.data);

                const readmeRes = await fetch(`http://localhost:5000/projects/${id}/readme`);
                if (readmeRes.ok) {
                    const readmeJson = await readmeRes.json();
                    setReadme(readmeJson.content);
                } else {
                    setReadme("README not found.");
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
            <img src={`http://localhost:5000${project.imageUrl}`} alt={project.title} />

            <div className="project-info">
                <h1>{project.title}</h1>
                <p>{project.description}</p>
                {/* <div className="readme-content">
                    {readme ? (<ReactMarkdown>{readme}</ReactMarkdown>)
                        : (
                            <p>No README available.</p>
                        )}
                </div> */}

                <p className="project_language"><strong>Languages:</strong> {project.languages} </p>
                {/* <p className="project_tehnologies"><strong>{project.tehnologies}</strong></p> */}
                <div className="project-buttons">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-button">Repo</a>
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-button">Live</a>
                    )}
                </div>
            </div>
        </div>
    );

}

export default ProjectAnket;
