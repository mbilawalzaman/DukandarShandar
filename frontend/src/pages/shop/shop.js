import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ShopComponent from "../../components/shopComp/shopComponent";
import ShopHeader from "../../components/shopHeader/shopHeader";
import Footer from "../../components/footer/footer";

const Shop = () => {
  return (
    <div>
      <Navbar />
      <ShopHeader />
      <ShopComponent />
      <Footer />
    </div>
  );
};

export default Shop;
