import React from 'react'
import "./aboutHeroSection.css"

const AboutHeroSection = () => {
  return (
    <div className='about-hero-sec-container'>
      <div className='about-hero-sec'>
        <div className='about-hero-img'>
            <img src='https://static-01.daraz.pk/p/c14261730e3d0b1804a834d26de230eb.jpg_750x750.jpg_.webp' alt='hero-section'/>
        </div>
        <div className='about-hero-txt'>
            <h1> ABOUT US CONTENT</h1>
            <p>Welcome to Dukandar Shandar - your one-stop destination for all things stationery and craft! At Dukandar Shandar, we take pride in offering a curated selection of high-quality stationery and craft supplies that spark creativity and innovation. With a commitment to excellence, we strive to bring you the finest products that cater to your artistic needs. Explore our diverse range and elevate your crafting experience with Dukandar Shandar - where creativity meets convenience!</p>
        <button>VIEW MORE</button>
        </div>
      </div>
    </div>
  )
}

export default AboutHeroSection
