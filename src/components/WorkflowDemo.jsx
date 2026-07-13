import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/WorkflowDemo.css";

export default function WorkflowDemo() {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const canvasWidth = 720;
  const canvasHeight = 360;

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = () => {
      const parentWidth = containerRef.current.offsetWidth;
      if (parentWidth < canvasWidth) {
        setScale(parentWidth / canvasWidth);
      } else {
        setScale(1);
      }
    };

    // Run initially
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="workflow-demo-wrapper" ref={containerRef}>
      <div 
        className="workflow-demo-scaler" 
        style={{ 
          height: `${canvasHeight * scale}px`,
          width: "100%",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div 
          className="workflow-canvas glass"
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: "top left",
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
            position: "absolute"
          }}
        >
          <div className="workflow-grid-bg"></div>

          {/* Webhook Node (Top-Left Lobe) */}
          <motion.div
            className="workflow-node node-webhook"
            style={{ left: "170px", top: "40px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -2 }}
          >
            <div className="node-side-stripe" style={{ backgroundColor: "#FF5D8F" }} />
            <div className="workflow-node-icon" style={{ "--node-color": "#FF5D8F" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="workflow-node-content">
              <span className="workflow-node-title">Webhook</span>
              <span className="workflow-node-desc">On New Lead</span>
            </div>
            <div className="workflow-node-port port-output" style={{ right: "-4px", top: "50%", transform: "translateY(-50%)" }} />
          </motion.div>

          {/* Gmail Node (Far-Left Side) */}
          <motion.div
            className="workflow-node node-gmail"
            style={{ left: "50px", top: "130px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -2 }}
          >
            <div className="node-side-stripe" style={{ backgroundColor: "#B000FF" }} />
            <div className="workflow-node-port port-input" style={{ left: "-4px", top: "50%", transform: "translateY(-50%)" }} />
            <div className="workflow-node-icon" style={{ "--node-color": "#B000FF" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="workflow-node-content">
              <span className="workflow-node-title">Gmail</span>
              <span className="workflow-node-desc">Send Auto-Reply</span>
            </div>
            <div className="workflow-node-port port-output" style={{ right: "-4px", top: "50%", transform: "translateY(-50%)" }} />
          </motion.div>

          {/* Router Node (Center Lobe Dip) */}
          <motion.div
            className="workflow-node node-router"
            style={{ left: "280px", top: "110px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -2 }}
          >
            <div className="node-side-stripe" style={{ backgroundColor: "#8b5cf6" }} />
            <div className="workflow-node-port port-input" style={{ left: "-4px", top: "50%", transform: "translateY(-50%)" }} />
            <div className="workflow-node-icon" style={{ "--node-color": "#8b5cf6" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="6" y1="3" x2="6" y2="15" />
                <circle cx="18" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <path d="M18 9a9 9 0 0 1-9 9" />
              </svg>
            </div>
            <div className="workflow-node-content">
              <span className="workflow-node-title">Router</span>
              <span className="workflow-node-desc">Filter & Route</span>
            </div>
            <div className="workflow-node-port port-output" style={{ right: "-4px", top: "50%", transform: "translateY(-50%)" }} />
          </motion.div>

          {/* AI Agent Node (Top-Right Lobe) */}
          <motion.div
            className="workflow-node node-ai"
            style={{ left: "390px", top: "40px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -2 }}
          >
            <div className="node-side-stripe" style={{ backgroundColor: "#10b981" }} />
            <div className="workflow-node-port port-input" style={{ left: "-4px", top: "50%", transform: "translateY(-50%)" }} />
            <div className="workflow-node-icon" style={{ "--node-color": "#10b981" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <circle cx="12" cy="5" r="2" />
                <path d="M12 7v4" />
                <line x1="8" y1="16" x2="8" y2="16" />
                <line x1="16" y1="16" x2="16" y2="16" />
              </svg>
            </div>
            <div className="workflow-node-content">
              <span className="workflow-node-title">AI Agent</span>
              <span className="workflow-node-desc">Qualify Lead</span>
            </div>
            <div className="workflow-node-port port-output" style={{ right: "-4px", top: "50%", transform: "translateY(-50%)" }} />
          </motion.div>

          {/* Slack Node (Far-Right Side) */}
          <motion.div
            className="workflow-node node-slack"
            style={{ left: "510px", top: "130px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ y: -2 }}
          >
            <div className="node-side-stripe" style={{ backgroundColor: "#e01e5a" }} />
            <div className="workflow-node-port port-input" style={{ left: "-4px", top: "50%", transform: "translateY(-50%)" }} />
            <div className="workflow-node-icon" style={{ "--node-color": "#e01e5a" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="workflow-node-content">
              <span className="workflow-node-title">Slack Alert</span>
              <span className="workflow-node-desc">Notify Team</span>
            </div>
            <div className="workflow-node-port port-output" style={{ right: "-4px", top: "50%", transform: "translateY(-50%)" }} />
          </motion.div>

          {/* HubSpot CRM Node (Bottom Point) */}
          <motion.div
            className="workflow-node node-hubspot"
            style={{ left: "280px", top: "250px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ y: -2 }}
          >
            <div className="node-side-stripe" style={{ backgroundColor: "#B000FF" }} />
            <div className="workflow-node-port port-input" style={{ left: "-4px", top: "50%", transform: "translateY(-50%)" }} />
            <div className="workflow-node-icon" style={{ "--node-color": "#B000FF" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
              </svg>
            </div>
            <div className="workflow-node-content">
              <span className="workflow-node-title">HubSpot CRM</span>
              <span className="workflow-node-desc">Upsert Contact</span>
            </div>
          </motion.div>

          {/* SVG Connection Lines in Heart Formation */}
          <svg className="workflow-lines" width="100%" height="100%">
            {/* 1. Webhook Output (330, 70) -> Gmail Input (50, 160) - Outer Left Lobe */}
            <motion.path
              className="workflow-conn-line"
              d="M 330 70 C 300 20, 10 70, 50 160"
              fill="none"
              stroke="#FF5D8F"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* 2. Gmail Output (210, 160) -> HubSpot Input (280, 280) - Bottom-Left Edge */}
            <motion.path
              className="workflow-conn-line"
              d="M 210 160 C 210 220, 240 280, 280 280"
              fill="none"
              stroke="#B000FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />

            {/* 3. Webhook Output (330, 70) -> Router Input (280, 140) - Inner Left Dip */}
            <motion.path
              className="workflow-conn-line"
              d="M 330 70 C 330 110, 310 140, 280 140"
              fill="none"
              stroke="#FF5D8F"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* 4. Router Output (440, 140) -> AI Agent Input (390, 70) - Inner Right Dip */}
            <motion.path
              className="workflow-conn-line"
              d="M 440 140 C 470 140, 390 110, 390 70"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            {/* 5. AI Agent Output (550, 70) -> Slack Input (510, 160) - Outer Right Lobe */}
            <motion.path
              className="workflow-conn-line"
              d="M 550 70 C 600 20, 700 100, 510 160"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />

            {/* 6. Slack Output (670, 160) -> HubSpot Input (280, 280) - Bottom-Right Edge */}
            <motion.path
              className="workflow-conn-line"
              d="M 670 160 C 670 220, 320 280, 280 280"
              fill="none"
              stroke="#e01e5a"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
