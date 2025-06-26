import { Link } from 'react-router-dom';
import './header.css';

function Header() {

    return (
        <header>
            <h1>Portfolio</h1>
            <nav>
                <ul>
                    <li> <Link to="/home">Home</Link> </li>
                    <li> <Link to="/projects">Projects</Link> </li>
                    <li> <Link to="/contacts">Contacts</Link> </li>
                    <li> <Link to="/about">About</Link> </li>
                    <li> <Link to="/reviews">Reviews</Link> </li>
                </ul>
            </nav>
        </header>
    );

}
export default Header;