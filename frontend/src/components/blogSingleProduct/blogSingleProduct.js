import React, { useEffect, useState } from 'react'
import {useDispatch } from 'react-redux'
import "./blogSingleProduct.css"
import Rating from '@mui/material/Rating';
import { useNavigate, useParams } from 'react-router-dom';
import { add_To_CART , cart_total_price, qtt , cartTotal} from '../../features/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BlogSingleProduct = () => {
  const [value, setValue] = React.useState(4);
  const  [quantity , setQuantity] = useState (1)
  const [blogData, setBlogData] = useState({})

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams();


const getBlogProductD = async () => {
    const fetchBlogD = await fetch(`http://localhost:4000/getBlogProductById/${params.id}`, {
    method: "GET",
      headers:{
        "Content-Type": "application/json"
      }
  });
  const blogData = await fetchBlogD.json();
  setBlogData(blogData)
}

const addtocart = (image , title, price, quantity) => {
  console.log("Actual qty: ", quantity)
  let cData = {image: image, title:title, price :price, quantity: quantity}
  dispatch(add_To_CART(cData))
  dispatch(cart_total_price(cData.price))
  dispatch(qtt(quantity))
  dispatch(cartTotal(cData.price*quantity))
  toast.success("Product added to Cart!")
  navigate("/cart")
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
}



useEffect(() => {
  getBlogProductD();
});


  return (
    <>
    <div className="main-blog-product-container">
      <div className="all-blog-product-container">
        <div className="blog-image-product">
          <img src={blogData.blogSelectedImage} alt="" />
        </div>
        <div className="blog-text-info-product">
          <p className='blog-firstTitle'> {blogData.blogTitle}</p>
          <p className='blog-secondTitle'>{blogData.blogTitle}</p>
          <Rating name="blog-read-only" id="blog-rating-star" value={value} readOnly />
          <p className='blog-price-p'>PKR{blogData.blogPrice}.00<sup className='blog-super-tag'>per piece</sup></p>
          <p className='blog-desc-paragraph'>{blogData.blogDescription} Cute MINI Unicorn School Bag for girls playgroup PICNIC BAG creative character designed backpack | Cute stationary items for girls</p>
          <div className='blog-quantity-div'>
            <p>Quantity: </p> 
            <button id="blog-minus_btn" onClick={decrement}>-</button>
            <button id="blog-count_btn">{quantity}</button>
            <button id="blog-plus_btn"onClick={increment}>+</button>
          </div>
          <div className='blog-add-tocart-and-buy-now-btns'>
            <button id="blog-buy-now_btn"onClick={()=>buyNow(blogData.blogSelectedImage, blogData.blogTitle, blogData.blogPrice, quantity)}>BUY NOW</button>
            <button id="blog-add-tocart_btn" onClick={()=>addtocart(blogData.blogSelectedImage, blogData.blogTitle, blogData.blogPrice, quantity)}>ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default BlogSingleProduct