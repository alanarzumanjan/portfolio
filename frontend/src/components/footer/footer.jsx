import "./footer.css";


function Footer() {
    return (
        <footer>
            <div className="footer-column">

                <p className="footer-text"> © {new Date().getFullYear()} Alan Arzumanjan. All rights reserved.</p>
            </div>

        </footer>
    );
}
export default Footer;
