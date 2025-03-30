// src/pages/login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../firebaseConfig";

export default function Login() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    if (!role) {
      alert("Please select a role before logging in!");
      return;
    }

    try {
      const result = await signInWithPopup(auth, provider);
      // Save both the role and the user information in sessionStorage
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("user", JSON.stringify(result.user));
      navigate("/auth");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login Page</h1>
      <p>Select your role:</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={() => setRole("user")}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: role === "user" ? "2px solid blue" : "1px solid gray",
            backgroundColor: role === "user" ? "#add8e6" : "white",
          }}
        >
          User
        </button>
        <button
          onClick={() => setRole("seller")}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: role === "seller" ? "2px solid blue" : "1px solid gray",
            backgroundColor: role === "seller" ? "#add8e6" : "white",
          }}
        >
          Seller
        </button>
      </div>
      <br />
      <button onClick={handleGoogleLogin}>Login using Google</button>
    </div>
  );
}
