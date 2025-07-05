import "./home.css";
import { Link } from "react-router-dom";

function Home() {

    return (
        <div className="home">
            <img className="avatar" src="/avatar.png" alt="Avatar" />
            <div className="home-container">
                <h1>Alan Arzumanjan</h1>
                <h2>A Bit about me</h2>
                <p>
                    I am a student programmer and my goal is to contribute to this world while learning modern technology,
                    improving my language skills, and working for the benefit of humanity.
                </p>
                <p>
                    Here you can explore my projects and learn more about me, my skills and experience.
                </p>
                <div className="home-buttons">
                    <Link className="home-link" to="/projects">
                        My Projects
                    </Link>
                    <Link className="home-link" to="/about">About me</Link>
                    <Link className="home-link" to="/contacts">Contacts</Link>
                </div>

                <div className="open-to-develop">
                    <p> <strong>
                        🔍 I'm open to internships, freelance projects, and collaboration.{" "}
                        <br /> Got an idea? Let’s connect!
                    </strong></p>
                </div>

            </div>

        </div>
    );

}
export default Home;