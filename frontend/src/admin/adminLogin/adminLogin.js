import React, { useState } from "react";
import "./adminLogin.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loginState, setloginState] = useState({
    email: "",
    password: "",
  });

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setloginState({ ...loginState, [name]: value });
  };

  const login = async () => {
    // Check the credentials (you may replace this with your actual authentication logic)
    const isValidCredentials = true; // Replace this with your authentication logic
  
    if (isValidCredentials) {
      // Set adminLogin status in localStorage
      localStorage.setItem("adminLogin", "true");
  
      // Display success toast
      toast.success("Admin login successfully");
  
      // Navigate to the /admin route
      navigate("/admin");
    } else {
      // Display error toast for unsuccessful login
      toast.error("Invalid email or password");
  
      // Set adminLogin status to "false" in localStorage for unsuccessful login
      localStorage.setItem("adminLogin", "false");
  
      // Navigate to /admin/login for unsuccessful login
      navigate("/admin/login");
    }
  };
  

  return (
    <>
      <div className="login-page-container">
        <div className="login-up-page">
          <div className="welome-to-login">
            <div className="welome-to-login-inner-div">
              <h2>Welcome to Admin Login!</h2>
              <p>
                To keep contected with us, Please login with youe Admin account
              </p>
            </div>
          </div>
          <div className="login-form-div">
            <div className="login-form-inner-div">
              <h2>Login</h2>
              <p className="useEmail">Use your regisgtered Email to Login</p>
              <div className="input-area-box">
                <input
                  id="loginEmail"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={loginState.email}
                  onChange={handleChange}
                />
                <input
                  id="loginPassword"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginState.password}
                  onChange={handleChange}
                />
                <button onClick={login}>LOG IN</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
