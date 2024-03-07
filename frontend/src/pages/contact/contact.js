import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ContactHeader from "../../components/contactHeader/contactHeader";
import ContactInfo from "../../components/contactInfo/contactInfo";
import Footer from "../../components/footer/footer";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <ContactHeader />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default Contact;
