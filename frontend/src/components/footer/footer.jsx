import "./footer.css";
import GithubIcon from "../../assets/github.png";
import LinkedInIcon from "../../assets/linkedin.png";
import EmailIcon from "../../assets/email.png"

function Footer() {
    return (
        <footer>
            <div className="footer-column">
                {/* <div className="icons">
                    <a href="https://github.com/alanarzumanjan" target="_blank" rel="noopener noreferrer">
                        <img src={GithubIcon} alt="github" className="icon" />
                    </a>
                    <a href="https://linkedin.com/in/alanarzumanjan" target="_blank" rel="noopener noreferrer">
                        <img src={LinkedInIcon} alt="linkedin" className="icon" />
                    </a>

                    <a href="https://t.me/maindeline" target="_blank" rel="noopener noreferrer">
                        <img src={EmailIcon} alt="email" className="icon" />
                    </a>
                </div> */}

                <p> © {new Date().getFullYear()} Alan Arzumanjan. All rights reserved.</p>
            </div>

        </footer>
    );
}
export default Footer;
