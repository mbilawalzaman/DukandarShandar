import React, { useEffect } from "react";
import Check from "../../components/checkout/check/check";
import SAddress from "../../components/checkout/saddress/sAddress";
import Footer from "../../components/footer/footer";

const MainCheckout = () => {

  useEffect(() => {
    console.log('MainCheckout component is mounted');
    // Add more logs or check for any potential issues here
  }, []);
  return (
    <>
      <Check />
      <SAddress />
      <Footer />
    </>
  );
};

export default MainCheckout;
