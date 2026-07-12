import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Advantage from "./components/Advantage";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
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
      <Advantage />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;