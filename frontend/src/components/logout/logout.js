import React from 'react';
import Cookies from 'js-cookie';
import "./logout.css"


const Logout = () => {
  const logoutUser = () => {
    window.localStorage.clear();
    Cookies.remove('authToken-b');
    alert("Logout successful!");
    // Redirect to the login page after logout
    window.location.href = "/login";
  };

  return (
    <button onClick={logoutUser} className="logoutButton">
      Log Out
    </button>
  );
}

export default Logout;
