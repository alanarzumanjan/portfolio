import './App.css';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Home from './components/home/home.jsx';
import { Link } from 'react-router-dom';
import Projects from './components/projects/projects.jsx';
import Contacts from './components/contacts/contacts.jsx';
import About from './components/about/about.jsx';
import Cv from './components/cv/cv.jsx';
import Blog from './components/blog/blog.jsx';
import Reviews from './components/reviews/reviews.jsx';

function App() {
  return (
    <div className="App">
      <header>
        <routes>
          <route path="/" element={<Home />}></route>
          <route path="/home" element={<Home />}></route>
          <route path="/projects" element={<Projects />}></route>
          <route path="/contacts" element={<Contacts />}></route>
          <route path="/about" element={<About />}></route>
          <route path="/cv" element={<Cv />}></route>
          <route path="/blog" element={<Blog />}></route>
          <route path="/reviews" element={<Reviews />}></route>
        </routes>
      </header>

      <Footer />

    </div>

  );
}

export default App;
