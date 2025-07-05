import { NavLink } from 'react-router-dom';
import './header.css';

function Header() {

    return (
        <header>
            <div className="logo">
                <h1>Portfolio</h1>
            </div>

            <nav>
                <ul>
                    <li> <NavLink to="/home" activeClassName="active">Home</NavLink></li>
                    <li> <NavLink to="/projects" activeClassName="active">Projects</NavLink> </li>
                    <li> <NavLink to="/contacts" activeClassName="active">Contacts</NavLink> </li>
                    <li> <NavLink to="/about" activeClassName="active">About</NavLink> </li>
                </ul>
            </nav>
        </header>
    );

}
export default Header;