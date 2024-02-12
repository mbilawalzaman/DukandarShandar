import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import "./cartSection.css";
import { useSelector } from 'react-redux';

const CartSection = () => {
  const cart = useSelector((state) => state.cart.cartData)
  
  return (
    <div className='main-cart-section-container'>
      <div className='cart-section'>
        <div className='cartHeader'>
            <p>PRODUCTS</p>
            <p>PRICE</p>
            <p>QUANTITY</p>
            <p>DELETE</p>
        </div>
      </div>
      {
          cart.map((ele) => 
          {
            return (
              <>
              <div className='cart-data-details-con'>
                <div className='cart-data-details'>
        <div className='cart-data-first-div'>
        <img src={ele.image} alt="" />
        <p>{ele.title}</p>
        </div>
        <div className='cart-data-second-div'>
        <p>PKR{ele.price}.00</p>
        </div>
        <div className='cart-data-third-div'>
        <button id="cart-minus_btn">-</button>
            <button id="cart-count_btn">0</button>
            <button id="cart-plus_btn">+</button>
        </div>
        <div className='cart-data-fourth-div'>
        <button><DeleteIcon/></button>
        </div>   
        </div>
        </div>
              </>
            )
          }
          )
        }
      
        
     
    </div>
  )
}

export default CartSection
