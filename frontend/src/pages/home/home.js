import React from "react";
import Slider from "../../components/slider/slider";
import HeroSection from "../../components/herosection/heroSection";
import TopProducts from "../../components/topproducts/topProducts";
import RederAllProdutcs from "../../components/renderallproducts/rederAllProdutcs";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
      <HeroSection />
      <TopProducts />
      <RederAllProdutcs />
      <Footer />
    </div>
  );
};

export default Home;
