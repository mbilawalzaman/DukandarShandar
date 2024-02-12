import React, { useEffect, useState } from 'react'
import {useDispatch } from 'react-redux'
import "./singleP.css"
import Rating from '@mui/material/Rating';
import { useNavigate, useParams } from 'react-router-dom';
import { add_To_CART , cart_total_price} from '../../features/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const SingleP = () => {
  const [value, setValue] = React.useState(4);
  const [singleData, setSingleData] = useState({})
  const  [quantity , setQuantity] = useState (1)
  
  const dispatch = useDispatch()

const navigate = useNavigate()

const params = useParams();


const getProductD = async () => {
    const fetchD = await fetch(`http://localhost:4000/getProductById/${params.id}`, {
    method: "GET",
      headers:{
        "Content-Type": "application/json"
      }
  });
  const sData = await fetchD.json();
  setSingleData(sData)
}

const addtocart = (image , title, price) => {
  let cData = {image: image, title:title, price :price}
  dispatch(add_To_CART(cData))
  dispatch(cart_total_price(cData.price))
  toast.success("Product added to Cart!")
  navigate("/cart")
}

const increment = () => {
  setQuantity(quantity+1)
}

const decrement = () => {
  setQuantity(quantity-1)
  if (quantity == 1) {
    setQuantity(1)
    toast.error("Product Quantity can not be less than One")
  }
}


useEffect(() => {
  getProductD();
});


  return (
    <div className="main-single-product-container">
      <div className="single-product-container">
        <div className="single-image-product">
          <img src={singleData.selectedImage} alt="" />
        </div>
        <div className="single-text-info-product">
          <p className='firstTitle'> {singleData.title}</p>
          <p className='secondTitle'>{singleData.title}</p>
          <Rating name="read-only" id="rating-star" value={value} readOnly />
          <p className='price-p'>PKR{singleData.price}.00<sup className='super-tag'>per piece</sup></p>
          <p className='desc-paragraph'>{singleData.description} Cute MINI Unicorn School Bag for girls playgroup PICNIC BAG creative character designed backpack | Cute stationary items for girls</p>
          <div className='quantity-div'>
            <p>Quantity: </p>
            <button id="minus_btn"onClick={decrement}>-</button>
            <button id="count_btn">{quantity}</button>
            <button id="plus_btn" onClick={increment}>+</button>
          </div>
          <div className='add-tocart-and-buy-now-btns'>
            <button id="buy-now_btn" >BUY NOW</button>
            <button id="add-tocart_btn"onClick={()=>addtocart(singleData.selectedImage, singleData.title, singleData.price)}>ADD TO CART</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SingleP