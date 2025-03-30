// src/pages/auth.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

export default function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const role = sessionStorage.getItem("role");

        if (role === "user") {
          navigate("/store", { replace: true });
        } else if (role === "seller") {
          navigate("/admin", { replace: true });
        }
      } else {
        navigate("/", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Authenticating...</h1>
    </div>
  );
}
