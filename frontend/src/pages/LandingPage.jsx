import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "../styles/landing-page.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="landing-container"
      >
        <div className="landing-card">
          <div className="glow glow-left" />
          <div className="glow glow-right" />

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="landing-image-section"
          >
            <div className="image-card">
              <img
                src="/Cover.png"
                alt="Landing Visual"
                className="landing-image"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="landing-content"
          >
            <div className="icon-box">
              <img src="/Logo.png" alt="Logo" className="landing-logo" />
            </div>

            <h1 className="landing-title">To Do App</h1>
            <p className="landing-description">
              Manage tasks smarter with your ToDo App.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="landing-button"
              onClick={() => navigate("/home")}
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default LandingPage;
