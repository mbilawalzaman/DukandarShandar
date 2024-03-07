import React, { useEffect, useState } from 'react'
import "./allSingleProduct.css"
import Rating from '@mui/material/Rating';
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch } from 'react-redux'
import { add_To_CART , cart_total_price, qtt , cartTotal} from '../../features/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AllSingleProduct = () => {
  const [value, setValue] = React.useState(4);
  const [allData, setAllData] = useState({})
  const  [quantity , setQuantity] = useState (1)

  const dispatch = useDispatch()
  const navigate = useNavigate()
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

const addtocart = (image , title, price, quantity) => {
  console.log("Actual qty: ", quantity)
  let cData = {image: image, title:title, price :price, quantity: quantity}
  dispatch(add_To_CART(cData))
  dispatch(cart_total_price(cData.price))
  dispatch(qtt(quantity))
  dispatch(cartTotal(cData.price*quantity))
  toast.success("Product added to Cart!")
}


const increment = () => {
  setQuantity(quantity+1)
}

const decrement = () => {
  setQuantity(quantity-1)
  if (quantity === 1) {
    setQuantity(1)
    toast.error("Product Quantity can not be less than One")
  }
}

const buyNow = (image , title, price, quantity) => {
  let directly_buy_now_data = {image: image, title:title, price :price, quantity: quantity}
  console.log("Actual data buy now: ", directly_buy_now_data)
  dispatch(add_To_CART(directly_buy_now_data))
  dispatch(cart_total_price(directly_buy_now_data.price))
  dispatch(qtt(quantity))
  dispatch(cartTotal(directly_buy_now_data.price*quantity))
  navigate("/checkout")
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
            <button id="all-minus_btn"onClick={decrement}>-</button>
            <button id="all-count_btn">{quantity}</button>
            <button id="all-plus_btn" onClick={increment}>+</button>
          </div>
          <div className='all-add-tocart-and-buy-now-btns'>
            <button id="all-buy-now_btn"onClick={()=>buyNow(allData.selectedAllImage, allData.alltitle, allData.allprice, quantity)}>BUY NOW</button>
            <button id="all-add-tocart_btn"onClick={()=>addtocart(allData.selectedAllImage, allData.alltitle, allData.allprice, quantity)}>ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AllSingleProduct