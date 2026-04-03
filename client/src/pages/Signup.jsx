import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("donor");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ submit: data.message || "Signup failed" });
        setLoading(false);
        return;
      }

      // Success - redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 500);

    } catch (err) {
      console.log(err);
      setErrors({ submit: "Server error. Please try again." });
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">

      {/* LEFT PANEL */}
      <div className="auth-left signup-left">
        <div className="overlay">
          <div className="overlay-content">
            <h1 className="overlay-title">
              <span className="title-emoji">🌱</span>
              Join Us Today
            </h1>
            <p className="overlay-subtitle">
              Create an account to start making a positive impact in your community
            </p>

            <div className="overlay-features">
              <div className="feature-item">
                <span className="feature-icon">🤝</span>
                <span>Connect with community</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💚</span>
                <span>Reduce food waste</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span>Create real impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <div className="auth-card">
          <div className="card-header">
            <h2>Create Account</h2>
            <p className="card-subtitle">Sign up as a donor or acceptor</p>
          </div>

          {/* ROLE TOGGLE */}
          <div className="role-selection">
            <label className="role-label">Choose your role:</label>
            <div className="role-toggle">
              <button
                type="button"
                className={`role-btn ${role === "donor" ? "active" : ""}`}
                onClick={() => setRole("donor")}
              >
                <span className="role-icon">📦</span>
                <span className="role-text">Donor</span>
              </button>

              <button
                type="button"
                className={`role-btn ${role === "acceptor" ? "active" : ""}`}
                onClick={() => setRole("acceptor")}
              >
                <span className="role-icon">🤝</span>
                <span className="role-text">Acceptor</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* ERROR MESSAGE */}
            {errors.submit && (
              <div className="error-message error-submit">
                <span className="error-icon">⚠️</span>
                {errors.submit}
              </div>
            )}

            {/* NAME FIELD */}
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">👤</span>
                Full Name
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? "input-error" : ""}`}
                />
                {formData.name && !errors.name && <span className="input-valid">✓</span>}
              </div>
              {errors.name && (
                <span className="error-text">
                  <span className="error-dot">●</span>
                  {errors.name}
                </span>
              )}
            </div>

            {/* EMAIL FIELD */}
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                />
                {formData.email && !errors.email && <span className="input-valid">✓</span>}
              </div>
              {errors.email && (
                <span className="error-text">
                  <span className="error-dot">●</span>
                  {errors.email}
                </span>
              )}
            </div>

            {/* PASSWORD FIELD */}
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">🔒</span>
                Password
              </label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? "input-error" : ""}`}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && (
                <span className="error-text">
                  <span className="error-dot">●</span>
                  {errors.password}
                </span>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button 
              type="submit" 
              className={`submit-btn ${loading ? "btn-loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <span className="btn-icon">✨</span>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="signup-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Signup;
