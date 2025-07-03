import { useEffect, useState } from "react";
import "./projects.css";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://localhost:5000/projects");
                const result = await response.json();
                setProjects(result?.data ?? []);
            }
            catch (err) {
                console.error("Error loading projects:", err);
            }
            finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="projects">
            <h1>Projects</h1>
            {loading ? <p>Loading...</p> : (
                <div className="projects-container">
                    {projects.map((project, index) => (
                        <div className="projects-item" key={project.id} style={{ "--delay": `${index * 0.2}s` }}>
                            <div className="projects-inner">
                                <h2>{project.title}</h2>
                                <img src={`http://localhost:5000${project.imageUrl}`} alt={project.title} />
                                <p className="projects-description" title={project.description}>
                                    {project.description}
                                </p>

                                <p className="project_language"><strong>{project.languages}</strong></p>

                                <div className="projects-buttons">
                                    {project.liveUrl && (
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="projects-button">Live</a>
                                    )}
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="projects-button">Repo</a>
                                    <a href={`/projects/${project.id}`} className="projects-button">Read more</a>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Projects;