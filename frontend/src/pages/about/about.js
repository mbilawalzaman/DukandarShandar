import React from 'react'
import AboutHeader from '../../components/aboutheader/aboutHeader'
import HeroSection from "../../components/herosection/heroSection"
import AboutHeroSection from '../../components/aboutHerosection/aboutHeroSection'
import AboutExtraInfo from '../../components/aboutextrainfo/aboutExtraInfo'
import Navbar from '../../components/navbar/Navbar'

const About = () => {
  return (
    <div>
      <Navbar/>
      <AboutHeader/>
      <HeroSection/>
      <AboutHeroSection/>
      <AboutExtraInfo/>
    </div>
  )
}

export default About
