import React from 'react'
import "./heroSection.css"
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const HeroSection = () => {
  return (
    <div>
      <div className="mainherosection-container">
        <div className="herosection">
          <div className="box-1">
            <div className="iconAndHeading">
              <AccessTimeIcon
                sx={{
                  marginLeft: "-38px",
                  fontSize: "30px",
                  color: "#ffbe4a",
                  cursor: "pointer",
                }}
              />
              <h2>Welcome to Dukandar Shandar</h2>
            </div>
            <p>
              Explore a world of creativity and inspiration at our stationary
              and craft ecommerce shop.
            </p>
            <p>
              Whether you're a seasoned crafter or just starting, we have
              everything you need for your next project.
            </p>
          </div>

          <div className="box-2">
            <div className="iconAndHeading">
              <AccessTimeIcon
                sx={{
                  marginLeft: "-38px",
                  fontSize: "30px",
                  color: "#ffbe4a",
                  cursor: "pointer",
                }}
              />
              <h2>Quality Craft Supplies</h2>
            </div>
            <p>
              Discover premium craft supplies that elevate your projects. From
              high-quality paper to unique embellishments.
            </p>
            <p>
              Explore our collection and let your imagination run wild.
            </p>
          </div>

          <div className="box-3">
            <div className="iconAndHeading">
              <AccessTimeIcon
                sx={{
                  marginLeft: "-38px",
                  fontSize: "30px",
                  color: "#ffbe4a",
                  cursor: "pointer",
                }}
              />
              <h2>Express Your Style</h2>
            </div>
            <p>
              At Dukandar Shandar, we celebrate individuality. Find products
              that match your unique style and express your creativity.
            </p>
            <p>
              Personalize your space with our carefully curated selection of
              stationery and craft items.
            </p>
          </div>

          <div className="box-4">
            <div className="iconAndHeading">
              <AccessTimeIcon
                sx={{
                  marginLeft: "-38px",
                  fontSize: "30px",
                  color: "#ffbe4a",
                  cursor: "pointer",
                }}
              />
              <h2>Shop with Confidence</h2>
            </div>
            <p>
              Enjoy a seamless shopping experience with Dukandar Shandar. Our
              commitment to customer satisfaction ensures that you can shop with
              confidence, knowing that your needs are our top priority.
            </p>
            <p>
              Discover the joy of creating and shopping for quality products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection
