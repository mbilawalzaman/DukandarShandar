import React, { useState } from "react";
import "./contactInfo.css";
import { toast } from "react-toastify";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const ContactInfo = () => {
  const [contactState, setContactState] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContactState({ ...contactState, [name]: value });
  };

  const sendMessage = () => {
    const { fullname, email, subject, message } = contactState;

    if (!isValidEmail(email)) {
      toast.error("Invalid email address");
      return; // Stop further processing if email is invalid
    }

    if (fullname && email && subject && message) {
      toast.success("Message sent successfully");
      setContactState({ fullname: "", email: "", subject: "", message: "" });
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <>
      <div className="contact-Info-container">
        <div className="contact-Info">
          <div className="contact-first-info">
            <h1 className="contact-details">Contact Details</h1>
            <div className="contact-details-info">
              <p className="address-phone">Email : asus52@hotmail.com</p>
              <p className="address-phone">Phone : (+92) 300 9437476</p>
              <p className="address">Address: Lahore Postal Code: 54000</p>
              <p className="address">Pakistan</p>
            </div>
          </div>
          <div className="contact-second-info">
            <div className="contact-form">
              <div className="contat-inputs">
                <div className="first-two-inputs">
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    name="fullname"
                    value={contactState.fullname}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    placeholder="Enter yourEmail"
                    className="email-input"
                    name="email"
                    value={contactState.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="subject-input">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={contactState.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="message-box">
                  <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="10"
                    placeholder="Enter Message"
                    value={contactState.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="contact-btn-div">
                  <button type="submit" onClick={sendMessage}>
                    Send Message
                  </button>
                </div>
              </div>

              <form action="contact-input"></form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
