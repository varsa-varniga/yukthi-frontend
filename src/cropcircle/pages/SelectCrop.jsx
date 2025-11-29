// src/cropcircle/pages/SelectCrop.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Firebase auth context
import axios from "axios";

export default function SelectCrop() {
  const { mongoUser, idToken } = useAuth(); // Use mongoUser from context
  const navigate = useNavigate();

  const [crop, setCrop] = useState("");
  const [district, setDistrict] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Wait until mongoUser and token are ready
  useEffect(() => {
    if (!mongoUser) return;
    if (!idToken) return console.log("Waiting for ID Token...");
    console.log("Mongo user:", mongoUser);
    console.log("ID Token ready:", idToken);
  }, [mongoUser, idToken]);

  const handleSubmit = async () => {
    if (!mongoUser) return setError("User not loaded yet. Please login.");
    if (!idToken) return setError("Authenticating, please wait...");
    if (!crop || !district) return setError("Please select both crop and district.");

    setError("");
    setLoading(true);

    try {
      // 1️⃣ Join or create Crop Circle using backend Mongo user ID
      const circleRes = await axios.post(
        "http://localhost:5000/api/crop-circle/join-or-create",
        {
          user_id: mongoUser._id, // <-- use mongo _id directly
          crop_name: crop,
          district,
        },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );

      console.log("Circle response:", circleRes.data);

      // 2️⃣ Navigate to user's profile/dashboard
      navigate("/cropcircle/profile");
    } catch (err) {
      console.error("Error joining/creating circle:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to join/create Crop Circle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, maxWidth: 400, margin: "50px auto" }}>
      <h2>Select Your Crop & District</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Crop name"
        value={crop}
        onChange={(e) => setCrop(e.target.value)}
        style={{ width: "100%", padding: 8, margin: "10px 0" }}
      />

      <input
        placeholder="District"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        style={{ width: "100%", padding: 8, margin: "10px 0" }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !idToken || !mongoUser} // disable until ready
        style={{
          padding: 10,
          width: "100%",
          marginTop: 10,
          background: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing..." : "Join/Create Crop Circle"}
      </button>
    </div>
  );
}
