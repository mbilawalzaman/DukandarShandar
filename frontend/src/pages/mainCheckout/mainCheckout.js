import React from "react";
import Check from "../../components/checkout/check/check";
import SAddress from "../../components/checkout/saddress/sAddress";
import Footer from "../../components/footer/footer";

const MainCheckout = () => {
  return (
    <>
      <Check />
      <SAddress />
      <Footer />
    </>
  );
};

export default MainCheckout;
