import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Sphere,
  MeshDistortMaterial,
} from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/Hero.css";

function Avatar3D() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Sphere
          ref={meshRef}
          args={[1, 64, 64]}
          position={[0, 0, 0]}
          scale={hovered ? 1.1 : 1}
        >
          <MeshDistortMaterial
            color="#B000FF"
            roughness={0.2}
            metalness={0.8}
            distort={hovered ? 0.4 : 0.2}
            speed={hovered ? 2 : 1}
            envMapIntensity={1.5}
          />
        </Sphere>

        <mesh position={[-0.4, 0.2, 0.9]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="white" roughness={0.1} metalness={0.1} />
        </mesh>
        <mesh position={[0.4, 0.2, 0.9]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="white" roughness={0.1} metalness={0.1} />
        </mesh>

        <mesh position={[-0.4, 0.2, 1.02]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#1d1d1f" roughness={0} metalness={0} />
        </mesh>
        <mesh position={[0.4, 0.2, 1.02]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#1d1d1f" roughness={0} metalness={0} />
        </mesh>

        <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.4, 64]} />
          <meshStandardMaterial
            color="#B000FF"
            transparent
            opacity={0.3}
            side={2}
            emissive="#B000FF"
            emissiveIntensity={0.5}
          />
        </mesh>

        {[...Array(20)].map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.sin(i * 0.5) * 1.6,
              Math.cos(i * 0.7) * 1.6,
              Math.sin(i * 0.3) * 1.6,
            ]}
            scale={0.03}
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial
              color="#B000FF"
              emissive="#B000FF"
              emissiveIntensity={0.5}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const { hero } = PortfolioContent;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrimaryAction = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-video-bg">
        <video autoPlay muted loop playsInline preload="auto">
          <source src={process.env.PUBLIC_URL + "/assets/hero_bg.mp4"} type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-badge-ref"
            >
              <span className="badge-dot-ref" />
              <span className="badge-text-ref">SYSTEMS & AUTOMATION SPECIALIST</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="hero-title-ref"
            >
              <span className="block-title">SYSTEMS DON'T</span>
              <span className="block-title highlight-text">RUN ON MANUAL.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hero-subtitle-ref"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hero-actions-ref"
            >
              <button
                className="btn-main-primary"
                onClick={handlePrimaryAction}
              >
                <span>{hero.buttons.primary}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="arrow-icon"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button className="btn-main-secondary" onClick={scrollToProjects}>
                <span>{hero.buttons.secondary}</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hero-reviews-ref"
            >
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="star-svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              <span className="reviews-text">5.0 / 5.0 — 100% Client Satisfaction · 4+ Years Experience</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="tech-stack"
          >
            <p className="tech-label">
              <span className="tech-dot" />
              Tech Stack
            </p>
            <div className="tech-grid">
              {hero.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  className="tech-tag"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {tech}
                  <span className="tech-glow" />
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hero-right"
        >
          <div className="avatar-container">
            {!isMobile ? (
              <Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                gl={{
                  antialias: true,
                  powerPreference: "high-performance",
                }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[5, 5, 5]} intensity={1} />
                  <directionalLight
                    position={[-5, -5, 5]}
                    intensity={0.5}
                    color="#B000FF"
                  />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={2}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                  />
                  <Avatar3D />
                </Suspense>
              </Canvas>
            ) : (
              <div className="avatar-placeholder">
                <div className="placeholder-icon">👨‍💻</div>
              </div>
            )}

            <div className="ring-dots" />
            <div className="ring-dots-outer" />

            <div className="particle-ring">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="dot" />
              ))}
            </div>

            <div className="avatar-glow" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
