import React from "react";
import "./LandingPage.css";
import foodImg from "./food-delivery.avif";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDonateClick = () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
    } else if (user.role !== "donor") {
      alert("Only donors can donate food");
    } else {
      navigate("/donate");
    }
  };

  const handleFindFoodClick = () => {
    if (!user) {
      alert("Please login first");
      navigate("/login");
    } else if (user.role !== "acceptor") {
      alert("Only acceptors can access food");
    } else {
      navigate("/find-food");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToDashboard = () => {
    if (user.role === "donor") {
      navigate("/donor-dashboard");
    } else {
      navigate("/find-food");
    }
  };

  return (
    <div className="landing">
      {/* ANIMATED BACKGROUND ELEMENTS */}
      <div className="bg-decoration bg-circle-1"></div>
      <div className="bg-decoration bg-circle-2"></div>
      <div className="bg-decoration bg-circle-3"></div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-content">
          <h2 className="logo">
            <span className="logo-icon">🍽️</span>
            FoodBridge
          </h2>

          <div className="nav-buttons">
            {!user ? (
              <>
                <button 
                  className="nav-btn nav-login"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="nav-btn nav-signup"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <span className="user-greeting">
                  Welcome, <strong>{user.name || "User"}</strong>
                </span>

                <button 
                  className="nav-btn nav-dashboard"
                  onClick={goToDashboard}
                >
                  Dashboard
                </button>

                <button 
                  className="nav-btn nav-logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-text">
          <div className="floating-tag">
            <span>✨ Making a difference</span>
          </div>

          <h1 className="hero-title">
            <span className="title-word word-1">Rescue</span>
            <span className="title-word word-2">Food</span>
            <br />
            <span className="title-highlight">Feed Lives</span>
          </h1>

          <p className="hero-description">
            Share excess food and help those in need. Reduce waste, build community,
            and create meaningful impact through FoodBridge.
          </p>

          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={handleDonateClick}
            >
              <span className="btn-icon">📦</span>
              Donate Food
            </button>

            <button
              className="btn btn-secondary"
              onClick={handleFindFoodClick}
            >
              <span className="btn-icon">🔍</span>
              Find Food
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Meals Shared</div>
            </div>
            <div className="stat">
              <div className="stat-number">2.5K</div>
              <div className="stat-label">Active Donors</div>
            </div>
            <div className="stat">
              <div className="stat-number">8.3K</div>
              <div className="stat-label">Families Helped</div>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-wrapper">
            <img src={foodImg} alt="food delivery" />
          </div>
        </div>
      </div>

      {/* FEATURES CARDS */}
      <div className="features-section">
        <div className="section-header">
          <h2>Why Choose FoodBridge?</h2>
          <div className="underline"></div>
        </div>

        <div className="cards">
          <div className="card card-1">
            <div className="card-icon">⚡</div>
            <h3>Quick Donation</h3>
            <p>Upload your food listings in seconds with our intuitive interface</p>
            <div className="card-accent"></div>
          </div>

          <div className="card card-2">
            <div className="card-icon">📍</div>
            <h3>Find Nearby</h3>
            <p>Discover fresh food available in your neighborhood in real-time</p>
            <div className="card-accent"></div>
          </div>

          <div className="card card-3">
            <div className="card-icon">🔄</div>
            <h3>Real-Time Updates</h3>
            <p>Get instant notifications when food is available near you</p>
            <div className="card-accent"></div>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Join the Movement</h2>
          <p>Be part of a community dedicated to reducing food waste and feeding lives</p>
          <button 
            className="btn btn-large"
            onClick={user ? goToDashboard : () => navigate("/signup")}
          >
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
