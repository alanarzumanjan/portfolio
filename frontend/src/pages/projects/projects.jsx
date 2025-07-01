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
                    {projects.map((project) => (
                        <div className="project" key={project.id}>
                            <h2>{project.title}</h2>
                            <img src={`http://localhost:5000${project.imageUrl}`} alt={project.title} />
                            <p className="project-description" title={project.description}>
                                {project.description}
                            </p>
                            <div className="project-buttons">
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-button">Repository</a>
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-button">Live</a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Projects;