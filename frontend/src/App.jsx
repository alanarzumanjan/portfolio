import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Home from './pages/home/home.jsx';
import Projects from './pages/projects/projects.jsx';
import Contacts from './pages/contacts/contacts.jsx';
import About from './pages/about/about.jsx';
import Blog from './pages/blog/blog.jsx';
import Reviews from './pages/reviews/reviews.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
