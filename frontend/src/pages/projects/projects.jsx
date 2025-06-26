import React from "react";
import "./projects.css";

function Projects() {

    return (
        <div className="projects">
            <h1>Projects</h1>
            <p> I have a few projects that I have worked on in the past.</p>

            <div className="project">
                <h2>Project 1</h2>
                <img src="{projectImage}" alt="Terminal project" />
                <p> project_description </p>
            </div>
        </div>
    );
}
export default Projects;