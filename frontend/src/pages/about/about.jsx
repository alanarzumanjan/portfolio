import './about.css';
import GitHubCalendar from 'react-github-calendar';
import alan_cv from '../../assets/Alan_Arzumanjan_CV.docx';

function About() {

    return (
        <div className="about">
            <div className="left-side">
                <h2>Professional Skills</h2>

                <div className="prog-languages">
                    <h3>Programming Languages</h3>
                    <ul>
                        <li>Python</li>
                        <li>C / C++ / C#</li>
                    </ul>
                </div>

                <div className="web">
                    <h3>Web</h3>
                    <ul>
                        <li>HTML / CSS</li>
                        <li>JavaScript / React / Next.js</li>
                    </ul>
                </div>

                <div className="databases">
                    <h3>Databases</h3>
                    <ul>
                        <li>PostgreSQL</li>
                        <li>MySQL / MariaDB</li>
                        <li>MongoDB</li>
                        <li>SQLite</li>
                    </ul>
                </div>

                <div className="tools">
                    <h3>Tools & Platforms</h3>
                    <ul>
                        <li>Git, GitHub, Bitbucket</li>
                        <li>Kanban / Jira, Notion, Obsidian</li>
                        <li>Docker, PgAdmin, DBeaver</li>
                        <li>Postman, Swagger, Makefiles</li>
                    </ul>
                </div>

                <div className="languages">
                    <h3>Languages</h3>
                    <ul>
                        <li>Russian — Native</li>
                        <li>Latvian — Intermediate</li>
                        <li>English — Intermediate</li>
                    </ul>
                </div>
            </div>

            <div className="right-side">
                <div className="about-me">
                    <h2>About Me</h2>

                    <p>
                        My name is Alan Arzumanjan, and I’m an aspiring developer
                        currently studying at the Victoria Vocational High School in Riga,
                        Latvia, in the IT department. Arch Linux and Windows as my primary
                        operating systems.
                    </p>
                    <p>
                        I’m passionate about software development and eager to grow
                        professionally in this field. I enjoy solving complex problems,
                        writing clean and readable code, and crafting intuitive user
                        interfaces.
                    </p>
                    <p>
                        I’m a fast learner, a great team player, and always see tasks
                        through to the end. My goal is to gain hands-on experience,
                        contribute to real-world projects, master modern technologies, and
                        continuously improve — both technically and personally.
                    </p>
                </div>
                <div className="concepts">
                    <h2>Theoretical & Practical Concepts</h2>

                    <ul>
                        <li>
                            <strong>Web Security:</strong> SQL Injection, JWT Tokens
                        </li>
                        <li>
                            <strong>Databases:</strong> Normal Forms (1NF–3NF), ACID,
                            Isolation Levels, Indexes, SQL PL
                        </li>
                        <li>
                            <strong>SDLC:</strong> Agile, Waterfall, V-Model, SRS, Software
                            Lifecycle Models
                        </li>
                        <li>
                            <strong>Version Control:</strong> Git Flow, GitHub Flow
                        </li>
                        <li>
                            <strong>Backend & APIs:</strong> REST API, FastAPI
                        </li>
                        <li>
                            <strong>Algorithms:</strong> Polymorphism, Linked Lists
                            (LIFO/FIFO), Stack, Queue, etc.
                        </li>
                    </ul>

                    <h3>Additional Experience</h3>
                    <p>Vagrant, Nginx, PHP, AWS, — basic working knowledge.</p>
                </div>

                <a className="cv" href={alan_cv} download>
                    <button>Download CV (PDF)</button>
                </a>

            </div>

            <div className="contact-note">
                <h3>
                    🔍 I'm open to internships, freelance projects, and collaboration.{" "}
                    <br /> Got an idea? Let’s connect!
                </h3>
            </div>

            <div className="github">
                <div className="inner">
                    <h2>GitHub Activity</h2>
                    <div className="github-activity">
                        <GitHubCalendar
                            username="alanarzumanjan"
                            blockSize={14}
                            blockMargin={5}
                            fontSize={14}
                            colorScheme="dark"
                            hideColorLegend="true"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default About;
