import React from "react";
import "./contacts.css";

function Contacts() {
    return (
        <div className="contacts">
            <h1>Contacts</h1>
            <p>
                Email:{" "}
                <a href="mailto:alanarzumanjan@gmail">alanarzumanjan@gmail.com</a>
            </p>
            <p>Phone: 555-555-5555</p>
            <a href="https://linkedin.com/in/alanarzumanjan">
                <img
                    src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
                    alt="linkedin"
                />
            </a>

            <a href="https://github.com/alanarzumanjan" target="_blank" rel="noopener noreferrer">
                <img
                    src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
                    alt="github"
                />
            </a>
        </div>
    );
}

export default Contacts;