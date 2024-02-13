import React, { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import "./cartSection.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeCartItem } from '../../features/cartSlice';

const CartSection = () => {
  const cart = useSelector((state) => state.cart.cartData)
  const cart_price = useSelector((state) => state.cart.cartTotalPrice)
  const cart_total_price = useSelector((state) => state.cart.cartTotal)
  const cart_quantity = useSelector((state) => state.cart.quantity)

  const navigate = useNavigate();
  const continueShopping =() => { navigate("/")}
  const dispatch = useDispatch();

  const totalAmount = () => {
   let my__tp = cart_price.length > 0 ? cart_price.reduce((accum , curVal) => {
      return accum + curVal
    }) : ""
  }

  const deleteCartItem = (index) => {
    dispatch(removeCartItem(index))
  }

  const navigateTocheckout = () => {
    navigate("/checkout")
  }
  
  useEffect (()=> {
    totalAmount()
  })

  return (
    <>
    {
      cart.length > 0 ?
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
          cart.map((ele, index) => 
          {
            return (
              <>
              <div className='cart-data-details-con'>
                <div className='cart-data-details'>
        <div className='cart-data-first-div'>
        <img src={ele.image} alt="" />
        <p className='image-inside-title'>{ele.title}</p>
        </div>
        <div className='cart-data-second-div'>
        <p>PKR{ele.price}.00</p>
        </div>
        <div className='cart-data-third-div'>
        <button id="cart-minus_btn">-</button>
            <button id="cart-count_btn">{cart_quantity}</button>
            <button id="cart-plus_btn">+</button>
        </div>
        <div className='cart-data-fourth-div'>
        <DeleteIcon sx={{color:"#df4223"}}
        onClick={() => deleteCartItem(index)}/>
        </div>
        </div>
        </div>
              </>
            )
          }
          )
        }  
        <div className='cart-price-container'>
          <div className='cartPrice'> <p>Total Price: <span className='cart-price-total'>PKR{cart_total_price}.00</span></p> 
          <button onClick={navigateTocheckout}> CheckOut </button>
          </div>
        </div>
         
    </div> : <div className='empty-cart'> <h1> Your Cart in Empty </h1>
    <div className='continue-shoping'><button onClick={continueShopping}> Continue Shoping </button></div>
    </div>
    }
    </>
  )
}

export default CartSection
