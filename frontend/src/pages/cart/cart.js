import React from "react";
import Navbar from "../../components/navbar/Navbar";
import CartHeader from "../../components/cartHeader/cartHeader";
import CartSection from "../../components/cartSection/cartSection";
import Footer from "../../components/footer/footer";

const Cart = () => {
  return (
    <div>
      <Navbar />
      <CartHeader />
      <CartSection />
      <Footer />
    </div>
  );
};

export default Cart;
