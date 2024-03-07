import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer";
import SignupComp from "../../components/signupComp/signupComp";

const SignUp = () => {
  return (
    <div>
      <Navbar />
      <SignupComp/>
      <Footer />
    </div>
  );
};

export default SignUp;
