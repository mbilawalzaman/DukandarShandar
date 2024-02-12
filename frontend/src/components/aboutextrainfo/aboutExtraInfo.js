import  { React, useState } from 'react';
import "./aboutExtraInfo.css"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const AboutExtraInfo = () => {

    const [counterText, setCounterText] = useState(0)

    let txt = [
        {text: "Dive into the extraordinary world of Dukandar Shandar, your premier destination for stationery and craft essentials. Unleash your creativity with our handpicked collection, crafted to inspire and elevate your artistic endeavors."},
        {text: "At Dukandar Shandar, we bring you a seamless shopping experience, offering an extensive range of stationery and craft supplies. Our commitment to quality ensures that every purchase fuels your creative pursuits."},
        {text: "Explore Dukandar Shandar, where the world of stationery and craft unfolds in endless possibilities. Our carefully curated selection is a testament to our dedication to inspiring creativity."}
    ]

    const less =() =>{
        setCounterText(counterText-1)
        if (counterText === 0) {
            setCounterText(2)
            
        }
    }

    const greater =() =>{
        setCounterText(counterText+1)
        if (counterText > 1) {
            setCounterText(0)    
        }
    }


  return (
    <div className='extra-info-container'>
        <div className='double-icons'>
        <DoubleArrowIcon sx={{fontSize:"30px"}}/>
        <DoubleArrowIcon sx={{fontSize:"30px"}}/>
        </div>
        <div className='extra-info'>
            <ArrowBackIosIcon sx={{fontSize:"34px", cursor: "pointer"}} onClick={less}/>
            <p>{txt[counterText].text}</p>
            <ArrowForwardIosIcon sx={{fontSize:"34px", cursor: "pointer"}}onClick={greater}/>
        </div>
    </div>
  )
}

export default AboutExtraInfo
