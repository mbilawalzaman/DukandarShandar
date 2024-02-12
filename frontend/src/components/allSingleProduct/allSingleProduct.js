import React, { useEffect, useState } from 'react'
import "./allSingleProduct.css"
import Rating from '@mui/material/Rating';
import { useParams } from 'react-router-dom';



const AllSingleProduct = () => {
  const [value, setValue] = React.useState(4);
  const [allData, setAllData] = useState({})



const params = useParams();


const getAllProductD = async () => {
    const fetchAllD = await fetch(`http://localhost:4000/getAllProductById/${params.id}`, {
    method: "GET",
      headers:{
        "Content-Type": "application/json"
      }
  });
  const allData = await fetchAllD.json();
  setAllData(allData)
}

useEffect(() => {
  getAllProductD();
});


  return (
    <>
    <div className="main-all-product-container">
      <div className="all-product-container">
        <div className="all-image-product">
          <img src={allData.selectedAllImage} alt="" />
        </div>
        <div className="all-text-info-product">
          <p className='all-firstTitle'> {allData.alltitle}</p>
          <p className='all-secondTitle'>{allData.alltitle}</p>
          <Rating name="read-only" id="rating-star" value={value} readOnly />
          <p className='all-price-p'>PKR{allData.allprice}.00<sup className='super-tag'>per piece</sup></p>
          <p className='all-desc-paragraph'>{allData.alldescription} Cute MINI Unicorn School Bag for girls playgroup PICNIC BAG creative character designed backpack | Cute stationary items for girls</p>
          <div className='all-quantity-div'>
            <p>Quantity: </p>
            <button id="all-minus_btn">-</button>
            <button id="all-count_btn">1</button>
            <button id="all-plus_btn">+</button>
          </div>
          <div className='all-add-tocart-and-buy-now-btns'>
            <button id="all-buy-now_btn">BUY NOW</button>
            <button id="all-add-tocart_btn">ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AllSingleProduct