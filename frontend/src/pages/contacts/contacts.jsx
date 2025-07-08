import React, { useState } from "react";
import "./contacts.css";
import PhoneIcon from "../../assets/phone_call.png";
import EmailIcon from "../../assets/email.png";

function Contacts() {

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");
        try {
            const response = await fetch(`${backendUrl}/contacts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("Message sent successfully ✅");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("Failed to send message");
            }
        }
        catch (error) {
            console.error("Error sending message:", error);
            setStatus("Server error.");
        }
    }

    return (
        <div className="contacts">
            <h1>My Contacts</h1>
            <div className="info">
                <div className="email">
                    <img className="email_icon" src={EmailIcon} alt="Email: " />
                    <p><a href="mailto:alanarzumanjan@gmail.com">alanarzumanjan@gmail.com</a></p>
                </div>

                <div className="phone">
                    <img className="phone_icon" src={PhoneIcon} alt="Phone: " />
                    <p><a href="tel:+371 26 684 439">+371 26 684 439</a></p>
                </div>
            </div>


            <div className="social-icons">
                <a href="https://linkedin.com/in/alanarzumanjan" target="_blank" rel="noopener noreferrer" className="icon-btn">
                    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin" />
                </a>

                <a href="https://github.com/alanarzumanjan" target="_blank" rel="noopener noreferrer" className="icon-btn">
                    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="github" />
                </a>

                <a href="https://t.me/maindeline" target="_blank" rel="noopener noreferrer" className="icon-btn">
                    <img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="telegram" />
                </a>
            </div>


            <form onSubmit={handleSubmit}>
                <h2>Contact Me</h2>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                    placeholder="Enter your name" />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                    placeholder="Enter your email" />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required
                    placeholder="Enter your message">
                </textarea>
                <button type="submit" id="submit">Submit</button>
                <p>{status}</p>
            </form>
        </div>
    );
}

export default Contacts;