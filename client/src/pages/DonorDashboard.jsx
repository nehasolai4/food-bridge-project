import React, { useEffect, useState } from "react";
import "./DonorDashboard.css";

const DonorDashboard = () => {

  const [foods, setFoods] = useState([]);
  const [requests, setRequests] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/request/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      // update UI instantly
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
        <h2 className="donor-logo">FoodBridge</h2>

        <ul>
          <li className="active">Dashboard</li>
          <li>Donations</li>
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
          <div className="section">
            <h2>Requests Received</h2>

            {requests.length === 0 ? (
              <p className="empty">No requests yet</p>
            ) : (
              <div className="food-grid">
                {requests.map(req => (
                  <div className="food-card" key={req._id}>

                    <h3>{req.foodId?.title}</h3>

                    <p>Requested by: {req.acceptorId?.name}</p>

                    <span>{req.foodId?.location?.city}</span>

                    {/* ✅ STATUS */}
                    <p className="request-status">
                      Status: <b>{req.status}</b>
                    </p>

                    {/* ✅ ACTION BUTTONS */}
                    {req.status === "pending" && (
                      <div className="request-actions">

                        <button
                          className="request-btn accept-btn"
                          onClick={() => handleStatus(req._id, "accepted")}
                        >
                          Accept
                        </button>

                        <button
                          className="request-btn reject-btn"
                          onClick={() => handleStatus(req._id, "rejected")}
                        >
                          Reject
                        </button>

                      </div>
                    )}

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DonorDashboard;