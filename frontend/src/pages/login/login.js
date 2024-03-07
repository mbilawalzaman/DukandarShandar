import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer";
import LoginComp from "../../components/loginComp/loginComp";

const Login = () => {
  return (
    <div>
      <Navbar />
      <LoginComp />
      <Footer />
    </div>
  );
};

export default Login;
