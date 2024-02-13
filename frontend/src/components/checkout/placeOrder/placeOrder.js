import React from "react";
import { useNavigate } from "react-router-dom";

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
      <h3>Thank you for your order.</h3>
      <p>
        Your order number is {myRandomNUmber}. We have emailed your order confirmation,
        and will send you an update when your order has shipped.
      </p>
      <button onClick={backToHome}>Back to Home</button>
    </div>
  );
};

export default PlaceOrder;
