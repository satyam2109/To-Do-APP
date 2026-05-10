import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">ToDoAPP</h2>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <button className="nav-btn">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Organize Your Tasks <br />
            <span>Boost Your Productivity</span>
          </h1>

          <p>
            A modern MERN Stack ToDo Application built with
            React, Express, MongoDB and Node.js.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Start Managing Tasks</button>
            <button className="secondary-btn">Explore APIs</button>
          </div>
        </div>

        <div className="hero-card">
          <div className="todo-card">
            <h3>Today's Tasks</h3>

            <ul>
              <li>✅ Complete MERN Backend</li>
              <li>🟡 Build React Frontend</li>
              <li>📘 Learn API Integration</li>
              <li>🚀 Deploy Application</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <h2>Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>📌 Task Management</h3>
            <p>Create, update and manage daily tasks easily.</p>
          </div>

          <div className="feature-card">
            <h3>⚡ MERN Stack</h3>
            <p>Built using MongoDB, Express, React and Node.js.</p>
          </div>

          <div className="feature-card">
            <h3>📘 Swagger APIs</h3>
            <p>Integrated API documentation for backend testing.</p>
          </div>

          <div className="feature-card">
            <h3>🔒 Validation Logic</h3>
            <p>Business rules and structured validation implemented.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="about">
        <h3>ToDoAPP</h3>
        <p>Built by Satyam Choudhary using the MERN Stack.</p>
      </footer>
    </div>
  );
}

export default App;