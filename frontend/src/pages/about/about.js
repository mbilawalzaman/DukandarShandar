import React from "react";
import AboutHeader from "../../components/aboutheader/aboutHeader";
import HeroSection from "../../components/herosection/heroSection";
import AboutHeroSection from "../../components/aboutHerosection/aboutHeroSection";
import AboutExtraInfo from "../../components/aboutextrainfo/aboutExtraInfo";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/footer";

const About = () => {
  return (
    <div>
      <Navbar />
      <AboutHeader />
      <HeroSection />
      <AboutHeroSection />
      <AboutExtraInfo />
      <Footer />
    </div>
  );
};

export default About;
