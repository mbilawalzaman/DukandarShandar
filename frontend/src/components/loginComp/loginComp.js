import React, { useState } from "react";
import "./loginComp.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const LoginComp = () => {
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
    const { email, password } = loginState;

    try {
      if (!isValidEmail(email)) {
        toast.error("Invalid email address");
        return;
      }

      if (password.length < 8) {
        toast.error("Password should be at least 8 characters");
        return;
      }

      if (email && password) {
        const response = await fetch("http://localhost:4000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();
        console.log("data", data);


        if (data && data.message !== "User not found") {
          toast.success("Login successfully");
          window.localStorage.setItem("isLoggedIn", true);
          window.localStorage.setItem("token", data.data.token);
          if (data.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
          console.log("User login successfully", data);
        } else if (data && data.message === "User not found") {
          toast.error("User not found. Redirecting to signup.");
          navigate("/signup");
        } else {
          toast.error("Failed to login. Please try again.");
        }
      } else {
        toast.error("Please fill all the fields");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const signUp = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="login-page-container">
        <div className="login-up-page">
          <div className="welome-to-login">
            <div className="welome-to-login-inner-div">
              <h2>Welcome to Login!</h2>
              <p>
                To keep contected with us, Please login with youe personal email
                info
              </p>
              <p>If you don't have an account </p>
              <button onClick={signUp}> Sign Up</button>
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

export default LoginComp;
