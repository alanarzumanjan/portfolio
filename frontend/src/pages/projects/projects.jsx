import "./projects.css";

function Projects() {

    return (
        <div className="projects">
            <h1>Projects</h1>
            <p> I have a few projects that I have worked on in the past.</p>

            <div className="projects-container">

                <div className="project">
                    <h2>{Projects.title}</h2>
                    <img src={Projects.image} alt="None" />
                    <p>{Projects.description}</p>
                    <a href={Projects.repository} target="_blank"
                        rel="noopener noreferrer" className="project-button">
                        Repository
                    </a>
                </div>

            </div>
        </div>
    );
}
export default Projects;