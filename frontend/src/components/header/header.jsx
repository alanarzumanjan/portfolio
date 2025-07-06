import { NavLink } from 'react-router-dom';
import './header.css';
import { useState } from "react";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header>
            <div className="logo">
                <h1>Portfolio</h1>
            </div>

            <nav className={isOpen ? "nav open" : "nav"}>
                <ul>
                    <li><NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                    <li><NavLink to="/projects" className={({ isActive }) => isActive ? "active" : ""}>Projects</NavLink></li>
                    <li><NavLink to="/contacts" className={({ isActive }) => isActive ? "active" : ""}>Contacts</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink></li>
                </ul>
            </nav>

            <button className="burger" onClick={toggleMenu}>
                ☰
            </button>
        </header>
    );
}

export default Header;
