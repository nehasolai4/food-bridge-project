import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DonorDashboard.css";

const DonorDashboard = () => {
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [requests, setRequests] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/request/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      const data = await res.json();

      // ❌ if backend rejected (like already accepted)
      if (!res.ok) {
        alert(data.message); // show error
        return; // STOP here
      }

      // ✅ only update UI if success
      setRequests(prev =>
        prev.map(r =>
          r._id === id ? { ...r, status } : r
        )
      );

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/food/donor/${user.id}`)
      .then(res => res.json())
      .then(data => setFoods(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/request/donor/${user.id}`)
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="donor-dashboard">

      {/* SIDEBAR */}
      <div className="donor-sidebar">
        <h2
          className="donor-logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          🍽️FoodBridge
        </h2>

        <ul>
          <li className="active">Dashboard</li>

          <li
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/donate-food")}
          >
            Donate Food
          </li>

          <li>Requests</li>
          <li>Profile</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="donor-main">

        {/* HEADER */}
        <div className="donor-header">
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.name || "User"} 👋</p>
        </div>

        {/* STATS */}
        <div className="donor-stats">
          <div className="donor-card">
            <h3>Total Donations</h3>
            <p>{foods.length}</p>
          </div>

          <div className="donor-card">
            <h3>Active Listings</h3>
            <p>{foods.length}</p>
          </div>

          <div className="donor-card">
            <h3>Requests</h3>
            <p>{requests.length}</p>
          </div>
        </div>

        {/* DONATIONS GRID */}
        <div className="donor-section">
          <h2>Your Donations</h2>

          {foods.length === 0 ? (
            <p className="donor-empty">No donations yet</p>
          ) : (
            <div className="donor-food-grid">
              {foods.map(food => (
                <div className="donor-food-card" key={food._id}>
                  <img
                    src={`http://localhost:5000/uploads/${food.image}`}
                    alt="food"
                  />
                  <h3>{food.title}</h3>
                  <p>{food.quantity}</p>
                  <span>{food.location?.city}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* REQUESTS */}
        <div className="donor-section">
          <h2>Requests Received</h2>

          {requests.length === 0 ? (
            <p className="donor-empty">No requests yet</p>
          ) : (
            <div className="requests-container">
              {/* 🔶 PENDING REQUESTS */}
              <div className="requests-group">
                <h2>Pending Requests</h2>
                {requests.filter(req => req.status === "pending").length === 0 ? (
                  <p className="empty-message">No pending requests</p>
                ) : (
                  <div className="requests-grid">
                    {requests
                      .filter(req => req.status === "pending")
                      .map(req => (
                        <div className="request-card" key={req._id}>
                          <h3>{req.foodId?.title}</h3>
                          <p>📍 Requested by: <strong>{req.acceptorId?.name}</strong></p>
                          <span>{req.foodId?.location?.city}</span>

                          <p className="request-status status-pending">
                            Status: <strong>{req.status.toUpperCase()}</strong>
                          </p>

                          <div className="request-actions">
                            <button
                              className="request-btn accept-btn"
                              onClick={() => handleStatus(req._id, "accepted")}
                            >
                              ✓ Accept
                            </button>

                            <button
                              className="request-btn reject-btn"
                              onClick={() => handleStatus(req._id, "rejected")}
                            >
                              ✕ Reject
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* 🔶 ACCEPTED REQUESTS */}
              <div className="requests-group">
                <h2>Accepted Requests</h2>
                {requests.filter(req => req.status === "accepted").length === 0 ? (
                  <p className="empty-message">No accepted requests</p>
                ) : (
                  <div className="requests-grid">
                    {requests
                      .filter(req => req.status === "accepted")
                      .map(req => (
                        <div className="request-card" key={req._id}>
                          <h3>{req.foodId?.title}</h3>
                          <p>📍 Requested by: <strong>{req.acceptorId?.name}</strong></p>
                          
                          {req.acceptorId?.email && (
                            <p>✉️ Email: <strong>{req.acceptorId.email}</strong></p>
                          )}
                          {req.acceptorId?.phone && (
                            <p>📞 Phone: <strong>{req.acceptorId.phone}</strong></p>
                          )}

                          <span>{req.foodId?.location?.city}</span>

                          <p className="request-status status-accepted">
                            Status: <strong>{req.status.toUpperCase()}</strong>
                          </p>

                          <div className="request-actions">
                            <button
                              className="request-btn completed-btn"
                              onClick={() => handleStatus(req._id, "completed")}
                            >
                              ✓ Mark as Picked Up
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* 🔶 COMPLETED REQUESTS */}
              <div className="requests-group">
                <h2>Completed Requests</h2>
                {requests.filter(req => req.status === "completed").length === 0 ? (
                  <p className="empty-message">No completed requests</p>
                ) : (
                  <div className="requests-grid">
                    {requests
                      .filter(req => req.status === "completed")
                      .map(req => (
                        <div className="request-card" key={req._id}>
                          <h3>{req.foodId?.title}</h3>
                          <p>📍 Requested by: <strong>{req.acceptorId?.name}</strong></p>

                          <p className="request-status status-completed">
                            Status: <strong>Food successfully handed over 🎉</strong>
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DonorDashboard;