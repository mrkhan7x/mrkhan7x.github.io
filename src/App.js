import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WeBuild from "./components/WeBuild";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ServicesPage from "./components/ServicesPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import BookingModal from "./components/BookingModal";
import "./App.css";

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const getRouteFromUrl = () => {
    const path = window.location.pathname.replace(/\/$/, "").replace(/^\//, "");
    const hash = window.location.hash.replace(/^#\/?/, "");

    if (path === "services" || hash === "services") return "services";
    if (path === "about" || hash === "about") return "about";
    if (path === "contact" || hash === "contact") return "contact";
    return "home";
  };

  const [currentRoute, setCurrentRoute] = useState(getRouteFromUrl);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(getRouteFromUrl());
    };
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  useEffect(() => {
    if (currentRoute === "services") {
      document.title = "Services — MRKHANSERVICES";
    } else if (currentRoute === "about") {
      document.title = "About Us — MRKHANSERVICES";
    } else if (currentRoute === "contact") {
      document.title = "Contact — MRKHANSERVICES";
    } else {
      document.title = "MRKHANSERVICES — AI Automation & Growth Systems";
    }
  }, [currentRoute]);

  const openBooking = () => setIsBookingOpen(true);

  return (
    <div className="app">
      <div className="app-background" />
      <div className="grid-pattern-global" />

      <div className="orb-global orb-global-1" />
      <div className="orb-global orb-global-2" />
      <div className="orb-global orb-global-3" />

      <Navbar 
        currentRoute={currentRoute} 
        setCurrentRoute={setCurrentRoute} 
        onOpenBooking={openBooking}
      />

      {currentRoute === "services" ? (
        <ServicesPage onOpenBooking={openBooking} />
      ) : currentRoute === "about" ? (
        <AboutPage onOpenBooking={openBooking} />
      ) : currentRoute === "contact" ? (
        <ContactPage onOpenBooking={openBooking} />
      ) : (
        <>
          <Hero onOpenBooking={openBooking} />
          <Projects onOpenBooking={openBooking} />
          <WeBuild onOpenBooking={openBooking} />
          <Contact onOpenBooking={openBooking} />
        </>
      )}

      <Footer onOpenBooking={openBooking} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}

export default App;