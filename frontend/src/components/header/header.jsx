import React from 'react';
import { Link } from 'react-router-dom';

function Header() {

    return (
        <header>
            <h1>Portfolio</h1>
            <nav>
                <ul>
                    <li> <Link to="/home"></Link> </li>
                    <li> <Link to="/projects">Projects</Link> </li>
                    <li> <Link to="/contacts">Contacts</Link> </li>
                    <li> <Link to="/about">About</Link> </li>
                    <li> <Link to="/cv">CV</Link> </li>
                    <li> <Link to="/blog">Blog</Link> </li>
                    <li> <Link to="/reviews">Reviews</Link> </li>
                </ul>
            </nav>
        </header>
    );

}