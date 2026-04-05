import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AcceptorDashboard.css";

const AcceptorDashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:5000/api/request/acceptor/${user.id}`)
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.log(err));
  }, []);

  const pendingCount = requests.filter(r => r.status === "pending").length;
  const acceptedCount = requests.filter(r => r.status === "accepted").length;
  const completedCount = requests.filter(r => r.status === "completed").length;

  return (
    <div className="donor-dashboard">
      {/* SIDEBAR */}
      <div className="donor-sidebar">
            <h2
              className="donor-logo"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              FoodBridge
            </h2>

        <ul>
          <li className="active">My Requests</li>
          <li onClick={() => navigate("/find-food")}>Browse Food</li>
          <li>Profile</li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="donor-main">

        {/* HEADER */}
        <div className="donor-header">
          <h1>My Requests</h1>
          <p>Track your food requests 🍱</p>
        </div>

        {/* STATS */}
        <div className="donor-stats">
          <div className="donor-card">
            <h3>Pending Requests</h3>
            <p>{pendingCount}</p>
          </div>

          <div className="donor-card">
            <h3>Accepted Requests</h3>
            <p>{acceptedCount}</p>
          </div>

          <div className="donor-card">
            <h3>Completed</h3>
            <p>{completedCount}</p>
          </div>
        </div>

        {/* BROWSE BUTTON */}
        <button
          className="browse-btn"
          onClick={() => navigate("/find-food")}
        >
          🍱 Browse More Food
        </button>

        {/* 🔶 PENDING REQUESTS */}
        <div className="donor-section">
          <h2>Pending Requests</h2>
          {requests.filter(r => r.status === "pending").length === 0 ? (
            <p className="donor-empty">No pending requests</p>
          ) : (
            <div className="donor-food-grid">
              {requests
                .filter(r => r.status === "pending")
                .map(r => (
                  <div className="donor-food-card" key={r._id}>
                    <h3>{r.foodId?.title}</h3>
                    <p>📍 Location: <strong>{r.foodId?.location?.city}</strong></p>
                    <p className="request-status status-pending">⏱️ Status: <strong>PENDING</strong></p>
                    <span>Awaiting donor response...</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* 🔶 ACCEPTED REQUESTS */}
        <div className="donor-section">
          <h2>Accepted Requests</h2>
          {requests.filter(r => r.status === "accepted").length === 0 ? (
            <p className="donor-empty">No accepted requests</p>
          ) : (
            <div className="donor-food-grid">
              {requests
                .filter(r => r.status === "accepted")
                .map(r => (
                  <div className="donor-food-card" key={r._id}>
                    <h3>{r.foodId?.title}</h3>

                    <p>👤 Donor: <strong>{r.donorId?.name}</strong></p>
                    
                    {r.donorId?.email && (
                      <p>✉️ Email: <strong>{r.donorId.email}</strong></p>
                    )}
                    {r.donorId?.phone && (
                      <p>📞 Phone: <strong>{r.donorId.phone}</strong></p>
                    )}

                    <p>📍 Location: <strong>{r.foodId?.location?.city}</strong></p>

                    <p className="request-status status-accepted">✅ Status: <strong>ACCEPTED</strong></p>
                    <span>Ready for pickup!</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* 🔶 COMPLETED REQUESTS */}
        <div className="donor-section">
          <h2>Completed Requests</h2>
          {requests.filter(r => r.status === "completed").length === 0 ? (
            <p className="donor-empty">No completed requests</p>
          ) : (
            <div className="donor-food-grid">
              {requests
                .filter(r => r.status === "completed")
                .map(r => (
                  <div className="donor-food-card" key={r._id}>
                    <h3>{r.foodId?.title}</h3>
                    <p>👤 Donor: <strong>{r.donorId?.name}</strong></p>
                    <p className="request-status status-completed">🎉 Status: <strong>COMPLETED</strong></p>
                    <span>Thank you for using FoodBridge!</span>
                  </div>
                ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AcceptorDashboard;