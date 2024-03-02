import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const checkSession = async () => {
    try {
      // Fetch session data from the server
      const response = await fetch("http://localhost:4000/getsession", {
        method: "GET",
        credentials: "include", // Equivalent to withCredentials in axios
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch session");
      }

      const data = await response.json();
      console.log("Session data:", data);

      // Check if the user is logged in based on the session data
      if (data.error) {
        console.log("heyy");
        // Clear the session cookie if the user is not logged in
        Cookies.remove("session");
        navigate("/");
      } else {
        // Set the session cookie if the user is logged in
        Cookies.set("session", "loggedIn");

        // Redirect to "/admin" upon successful login
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error checking session:", error);
      // Clear the session cookie in case of an error
      Cookies.remove("session");
      // navigate("/");
    }
  };

  const handleCheckAndRedirect = async () => {
    await checkSession();
  };

  useEffect(() => {
    handleCheckAndRedirect();
  }, []); // Empty dependency array to mimic componentDidMount

  return (
    <div>
      {children}
    </div>
  );
}

export default ProtectedRoute;
