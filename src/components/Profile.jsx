import React, { useEffect, useState } from "react";
import axios from "axios";

// Set your backend URL safely
const API = "https://vehicle-backend-82q6.onrender.com";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [token]);

  if (!userData) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading profile...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      {/* 👤 Avatar */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          alt="User Avatar"
          style={{
            borderRadius: "50%",
            width: "120px",
            height: "120px",
            objectFit: "cover",
            backgroundColor: "#eee"
          }}
        />
      </div>

      {/* 🧾 User Info */}
      <h2 style={{ textAlign: "center" }}>Welcome, {userData.username}</h2>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Role:</strong> {userData.role}</p>

      {/* 📞 Contact Info */}
      <h3>Contact Info</h3>
      <p><strong>Phone:</strong> {userData.phone || "Not provided"}</p>
      <p><strong>Location:</strong> {userData.location || "Not provided"}</p>

      {/* 🚘 Uploaded Vehicles */}
      <h3>Your Uploaded Vehicles</h3>
      {userData?.uploadedVehicles?.length === 0 ? (
        <p>You haven’t listed any vehicles yet.</p>
      ) : (
        <ul>
          {userData?.uploadedVehicles?.map((v) => (
            <li key={v._id}>
              {v.title} - ₹{v.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
