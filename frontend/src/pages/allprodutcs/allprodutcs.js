import React from "react";
import AllSingleProduct from "../../components/allSingleProduct/allSingleProduct";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer";

const AllProducts = () => {
  return (
    <div>
      <Navbar />
      <AllSingleProduct />
      <Footer />
    </div>
  );
};

export default AllProducts;
