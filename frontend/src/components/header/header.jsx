import { NavLink } from 'react-router-dom';
import './header.css';
import { useState } from "react";
import ThemeSwitcher from "../ThemeSwitcher";

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
                    <li><NavLink to="/home" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                    <li><NavLink to="/projects" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Projects</NavLink></li>
                    <li><NavLink to="/contacts" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Contacts</NavLink></li>
                    <li><NavLink to="/about" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>About</NavLink></li>
                </ul>
            </nav>

            <button className="burger" onClick={toggleMenu}>
                ☰
            </button>
            <ThemeSwitcher />
        </header>
    );
}

export default Header;
