import React from "react";
import { useNavigate } from "react-router-dom";
import "./placeOrder.css"
import CheckOutNavbar from "../check/checkoutNavbar/checkOutNavbar";
import { Container, Paper, Typography } from "@mui/material";


const PlaceOrder = () => {

    const navigate = useNavigate("")

    const idRandomGenerate = () => {
        let random = Math.floor(Math.random()*10);
        return random 
    } 
    let myRandomNUmber = "#" + idRandomGenerate() + 
    idRandomGenerate() + idRandomGenerate() + 
    idRandomGenerate() + idRandomGenerate() + 
    idRandomGenerate() + idRandomGenerate()

    const backToHome = () => {
        navigate("/")
    }

  return (
    <div>
      <CheckOutNavbar/>
      <Container component="main" maxWidth="sm" sx={{ mb: 4}}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 5 }, p: { xs: 2, md: 3 }, paddingTop: "1rem", border: "none", backgroundColor: "#edf1f4", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
          <Typography component="h1" variant="h4" align="center" sx={{fontFamily:"Poppins", fontWeight: "bold"}}>
            Place Order
          </Typography>
        </Paper>
      </Container>
      <div className="place-order-main-container">
        <div className="place-order-details">
      <h3>Thank you for your order.</h3>
      <p>
        Your order number is {myRandomNUmber}. We have emailed your order confirmation,
        and will send you an update when your order has shipped.
      </p>
      </div>
      </div>
      <div className="backtoHome-btn-container">
      <button onClick={backToHome} className="back-to-home-btn">Back to Home</button>
      </div>
    </div>
  );
};

export default PlaceOrder;
