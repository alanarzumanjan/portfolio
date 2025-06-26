import "./home.css";
import { Link } from "react-router-dom";

function Home() {

    return (
        <div className="home">
            <img className="avatar" src="/avatar.png" alt="Avatar" />
            <h1>Welcome to My Portfolio</h1>
            <h2>Hello, I'am Alan Arzumanjan</h2>
            <p>
                Feel free to explore my projects and get to know more about me,
                myskills and experience.
            </p>
            <Link to="/projects" className="view-projects-btn">
                My Projects
            </Link>
        </div>
    );

}
export default Home;