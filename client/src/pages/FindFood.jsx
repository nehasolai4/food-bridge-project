import React, { useEffect, useState } from "react";
import "./FindFood.css";

const FindFood = () => {
  const [food, setFood] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:5000/api/food")
      .then(res => res.json())
      .then(data => setFood(data))
      .catch(err => console.log(err));
  }, []);

  const getTimeLeft = (expiry) => {
    const now = new Date();
    const exp = new Date(expiry);
    const diff = exp - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day(s) left`;
    if (hours > 0) return `${hours} hour(s) left`;
    return "Expiring soon";
  };

  const getUrgencyLevel = (expiry) => {
    const now = new Date();
    const exp = new Date(expiry);
    const diff = exp - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours <= 2) return "critical";
    if (hours <= 6) return "warning";
    return "normal";
  };

const handleRequest = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/request/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        foodId: selectedFood._id,
        acceptorId: user.id
      })
    });

    const data = await res.json();

    alert(data.message);
    setSelectedFood(null); // close modal

  } catch (err) {
    console.log(err);
  }
};

  const filteredFood = food.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location?.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="food-page">
      {/* ANIMATED BACKGROUND */}
      <div className="bg-decoration bg-circle-1"></div>
      <div className="bg-decoration bg-circle-2"></div>

      {/* 🔥 NAVBAR */}
      <div className="top-navbar">
        <div className="navbar-brand">
          <h2 className="logo">
            <span className="logo-emoji">🍽️</span>
            FoodBridge
          </h2>
          <span className="nav-badge">Acceptor</span>
        </div>

        <div className="nav-center">
          <span className="nav-status">
            🟢 Active • Searching for food
          </span>
        </div>

        <div className="profile-section">
          <span className="user-name">{user?.name || "User"}</span>

          <div
            className="profile-icon"
            onClick={() => setShowSidebar(true)}
            title="Open profile"
          >
            👤
          </div>
        </div>
      </div>

      {/* 🔥 CENTER WRAPPER */}
      <div className="content-wrapper">
        <div className="heading-section">
          <h1 className="heading">
            <span className="heading-emoji"></span>
            Available Food Near You
          </h1>
          <p className="heading-subtext">
            Discover fresh food available for pickup • Save food, feed families
          </p>
        </div>

        {/* SEARCH */}
        <div className="search-container">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by food type or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>
          <div className="search-results-count">
            {filteredFood.length > 0 && (
              <span>{filteredFood.length} item{filteredFood.length !== 1 ? "s" : ""} found</span>
            )}
          </div>
        </div>

        {/* GRID */}
        {filteredFood.length > 0 ? (
          <div className="food-grid">
            {filteredFood.map((item, index) => (
              <div 
                className={`food-card urgency-${getUrgencyLevel(item.expiry)}`}
                key={item._id}
                style={{ "--card-delay": `${index * 0.1}s` }}
              >
                <div className={`urgency-indicator urgency-${getUrgencyLevel(item.expiry)}`}>
                  <span className="urgency-icon">⏳</span>
                  <span className="urgency-text">{getTimeLeft(item.expiry)}</span>
                </div>

                <div className="card-header">
                  <div className="circle-img">
                    <div className="image-glow"></div>
                    <img
                      src={
                        item.image
                          ? `http://localhost:5000/uploads/${item.image}`
                          : "/placeholder.png"
                      }
                      alt={item.title}
                    />
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="food-title">{item.title}</h3>
                  <p className="desc">
                    <span className="location-icon">📍</span>
                    {item.location?.city}
                  </p>

                  <div className="card-details">
                    <div className="detail-item">
                      <span className="detail-label">Quantity</span>
                      <span className="detail-value">{item.quantity}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Expires</span>
                      <span className="expiry-time">
                        {new Date(item.expiry).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  <button
                    className="request-btn"
                    onClick={() => setSelectedFood(item)}
                  >
                    <span>View Details</span>
                    <span className="btn-arrow">→</span>
                  </button>
                </div>

                <div className="card-accent"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🍱</div>
            <h3>No food available</h3>
            <p>Try searching with different keywords or check back later</p>
          </div>
        )}
      </div>

      {/* 🔥 MODAL */}
      {selectedFood && (
        <div className="modal-overlay" onClick={() => setSelectedFood(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelectedFood(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="modal-image-container">
              <img
                src={`http://localhost:5000/uploads/${selectedFood.image}`}
                alt={selectedFood.title}
                className="modal-img"
              />
              <div className="modal-urgency">
                {getUrgencyLevel(selectedFood.expiry) === "critical" && (
                  <span className="urgency-critical">🔴 Act Fast!</span>
                )}
                {getUrgencyLevel(selectedFood.expiry) === "warning" && (
                  <span className="urgency-warning">🟡 Expires Soon</span>
                )}
                {getUrgencyLevel(selectedFood.expiry) === "normal" && (
                  <span className="urgency-normal">🟢 Available</span>
                )}
              </div>
            </div>

            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">{selectedFood.title}</h2>
                <p className="modal-subtitle">{selectedFood.location?.city}</p>
              </div>

              <div className="modal-details">
                <div className="detail-row">
                  <span className="detail-icon">🏠</span>
                  <div>
                    <label>Address</label>
                    <p>{selectedFood.location?.address}</p>
                  </div>
                </div>

                <div className="detail-row">
                  <span className="detail-icon">📮</span>
                  <div>
                    <label>Pincode</label>
                    <p>{selectedFood.location?.pincode}</p>
                  </div>
                </div>

                <div className="detail-row">
                  <span className="detail-icon">📝</span>
                  <div>
                    <label>Details</label>
                    <p>{selectedFood.description || "No additional details"}</p>
                  </div>
                </div>

                <div className="detail-row">
                  <span className="detail-icon">👨‍🍳</span>
                  <div>
                    <label>Contact</label>
                    <p>{selectedFood.donor || "Contact via app"}</p>
                  </div>
                </div>

                <div className="detail-row highlight">
                  <span className="detail-icon">⏰</span>
                  <div>
                    <label>Expires In</label>
                    <p className="expiry-highlight">{getTimeLeft(selectedFood.expiry)}</p>
                  </div>
                </div>
              </div>

              <button className="request-btn request-btn-large" onClick={handleRequest}>
                <span className="btn-icon">🎯</span>
                Send Request Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 SIDEBAR */}
      {showSidebar && (
        <div className="sidebar-overlay" onClick={() => setShowSidebar(false)}>
          <div className="profile-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <h3>Profile</h3>
              <button
                className="close-btn"
                onClick={() => setShowSidebar(false)}
                aria-label="Close sidebar"
              >
                ✕
              </button>
            </div>

            <div className="profile-info">
              <div className="profile-avatar">
                <span className="avatar-emoji">👤</span>
              </div>

              <div className="info-item">
                <label>Name</label>
                <p>{user?.name}</p>
              </div>

              <div className="info-item">
                <label>Email</label>
                <p>{user?.email}</p>
              </div>

              <div className="info-item">
                <label>Role</label>
                <p className="role-badge">{user?.role}</p>
              </div>
            </div>

            <div className="sidebar-divider"></div>

            <div className="request-history">
              <h4>📊 Request History</h4>
              <p className="history-empty">No requests yet. Start requesting food!</p>
            </div>

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              <span className="logout-icon">🚪</span>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindFood;
