import React from "react";
import "./footer.css";

function Footer() {
    return (
        <footer>
            <p>
                © {new Date().getFullYear()} Alan Arzumanjan. All rights reserved.
            </p>
            <p>
                Email:{" "} <a href="mailto:alanarzumanjan@gmail.com">alanarzumanjan@gmail.com</a>
            </p>
            <p>
                <a href="https://github.com/alanarzumanjan" target="_blank" rel="noopener noreferrer">GitHub</a>
            </p>
            <p>
                <a href="https://linkedin.com/in/alanarzumanjan" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </p>
        </footer>
    );
}
export default Footer;
