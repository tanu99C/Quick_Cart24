import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear stored session data (user info, role, etc.)
      sessionStorage.clear();
      // Redirect to the Home page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error logging out, please try again.");
    }
  };

  return (
    <button onClick={handleLogout} style={{ padding: "10px 20px", margin: "10px" }}>
      Logout
    </button>
  );
}
