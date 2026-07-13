import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app-background" />
      <div className="grid-pattern-global" />

      <div className="orb-global orb-global-1" />
      <div className="orb-global orb-global-2" />
      <div className="orb-global orb-global-3" />

      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;