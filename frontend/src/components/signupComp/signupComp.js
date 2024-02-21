import React, { useState } from "react";
import "./signupComp.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupComp = () => {
  const navigate = useNavigate();
  const [signupState, setSignupState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  let name, value;
  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;

    setSignupState({ ...signupState, [name]: value });
  };

  const createUser = async () => {
    const { firstName, lastName, email, password } = signupState;

    try {
      if (!isValidEmail(email)) {
        toast.error("Invalid email address");
        return;
      }

      if (password.length < 8) {
        toast.error("Password should be at least 8 characters");
        return;
      }

      if (firstName && lastName && email && password) {
        const response = await fetch("http://localhost:4000/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        });

        if (response.ok) {
          toast.success("User created successfully");
          setSignupState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
          navigate("/login");
        } else {
          toast.error("Failed to create user. Please try again.");
        }
      } else {
        toast.error("Please fill all the fields");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const Login = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="signup-page-container">
        <div className="sign-up-page">
          <div className="welome-to-signup">
            <div className="welome-to-signup-inner-div">
              <h2>Welcome to Signup!</h2>
              <p>
                To keep contected with us, Please login with youe personal email
                info
              </p>
              <p>If you already have an account </p>
              <button onClick={Login}> Login</button>
            </div>
          </div>
          <div className="signup-form-div">
            <div className="signup-form-inner-div">
              <h2 className="create-an-account">Create An Account</h2>
              <p className="useEmail">Use your Email for registration</p>
              <div className="input-area-box">
                <input
                  id="signupFirstName"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={signupState.firstName}
                  onChange={handleChange}
                />
                <input
                  id="signupLastName"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={signupState.lastName}
                  onChange={handleChange}
                />
                <input
                  id="signupEmail"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={signupState.email}
                  onChange={handleChange}
                />
                <input
                  id="signupPassword"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={signupState.password}
                  onChange={handleChange}
                />
                <button onClick={createUser}>SIGN UP</button>

                <div className="m-input">
                  <input
                    id="signupFirstName"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={signupState.firstName}
                    onChange={handleChange}
                  />
                  <input
                    id="signupLastName"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={signupState.lastName}
                    onChange={handleChange}
                  />
                  <input
                    id="signupEmail"
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={signupState.email}
                    onChange={handleChange}
                  />
                  <input
                    id="signupPassword"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={signupState.password}
                    onChange={handleChange}
                  />
                  <button onClick={createUser}>SIGN UP</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupComp;
