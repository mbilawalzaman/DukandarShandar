import React, { useState } from "react";
import "./slider.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Slider = () => {
  const [count, setCount] = useState(0);

  let images = [
    {
      img: "https://static-01.daraz.pk/p/0477513e793fe75833415887a2bfaca6.jpg_750x750.jpg_.webp",
    },
    {
      img: "https://static-01.daraz.pk/p/c614df7f796f8a576a81998029cb3599.jpg_750x750.jpg_.webp",
    },
    {
      img: "https://static-01.daraz.pk/p/9f9c161c44d57375d0d22013a6b180cb.jpg_750x750.jpg_.webp",
    },
  ];
  const previous = () => {
    setCount(count - 1);
    if (count === 0) {
      setCount(2);
    }
  };

  const next = () => {
    setCount(count + 1);
    if (count > 1) {
      setCount(0);
    }
  };

  return (
    <>
      <div className="slider-container">
        <div className="slider">
          <div className="info-box">
            <p>
              YOUR PRODUCTS <br /> ARE GREAT{" "}
            </p>
            <button> View Products</button>
          </div>
          <div className="slider-box">
            <img src={images[count].img} alt="slider Images" />
          </div>
          <ArrowBackIosIcon
            sx={{
              position: "absolute",
              top: "36%",
              left: "1%",
              fontSize: "75px",
              cursor: "pointer",
              color: "#c6d8de",
            }}
            onClick={previous}
          />
          <ArrowForwardIosIcon
            sx={{
              position: "absolute",
              top: "36%",
              right: "1%",
              fontSize: "75px",
              cursor: "pointer",
              color: "#c6d8de",
            }}
            onClick={next}
          />
        </div>
      </div>
    </>
  );
};

export default Slider;
