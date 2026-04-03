import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ submit: data.message || "Login failed" });
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Success animation before redirect
      setTimeout(() => {
        if (data.user.role === "donor") {
          navigate("/donor-dashboard");
        } else {
          navigate("/find-food");
        }
      }, 500);

    } catch (err) {
      console.log(err);
      setErrors({ submit: "Server error. Please try again." });
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* ANIMATED BACKGROUND */}
      <div className="bg-decoration bg-circle-1"></div>
      <div className="bg-decoration bg-circle-2"></div>

      {/* LEFT PANEL */}
      <div className="auth-left login-left">
        <div className="overlay">
          <div className="overlay-content">
            <h1 className="overlay-title">
              <span className="title-emoji">👋</span>
              Welcome Back
            </h1>
            <p className="overlay-subtitle">Login to continue helping others</p>

            <div className="overlay-features">
              <div className="feature-item">
                <span className="feature-icon">🚀</span>
                <span>Quick & Easy</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span>Secure Login</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💚</span>
                <span>Make Impact</span>
              </div>
            </div>

            <div className="overlay-decoration">
              <div className="decoration-circle"></div>
              <div className="decoration-circle"></div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <div className="auth-card">
          <div className="card-header">
            <h2>Login</h2> 
            <p className="card-subtitle">Sign in to your FoodBridge account</p>
          </div>

          <form onSubmit={handleLogin} noValidate>
            {/* ERROR MESSAGE */}
            {errors.submit && (
              <div className="error-message error-submit">
                <span className="error-icon">⚠️</span>
                {errors.submit}
              </div>
            )}

            {/* EMAIL FIELD */}
            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📧</span>
                Email Address
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                />
                {email && <span className="input-valid">✓</span>}
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
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

            {/* REMEMBER & FORGOT */}
            <div className="form-footer">
              <label className="checkbox-wrapper">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
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
                  Logging in...
                </>
              ) : (
                <>
                  <span className="btn-icon">🚀</span>
                  Login
                </>
              )}
            </button>
          </form>

          {/* SIGNUP LINK */}
          <div className="auth-footer">
            <p>
              New user?{" "}
              <Link to="/signup" className="signup-link">
                Create Account
              </Link>
            </p>
          </div>

          {/* DIVIDER */}
          <div className="form-divider">
            <span>Or continue as</span>
          </div>

          {/* QUICK LOGIN BADGES */}
          <div className="quick-access">
            <div className="badge badge-donor">
              <span>🍽️ Donor</span>
            </div>
            <div className="badge badge-acceptor">
              <span>🤝 Acceptor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
