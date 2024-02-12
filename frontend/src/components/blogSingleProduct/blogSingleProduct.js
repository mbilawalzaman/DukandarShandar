import React, { useEffect, useState } from 'react'
import "./blogSingleProduct.css"
import Rating from '@mui/material/Rating';
import { useParams } from 'react-router-dom';



const BlogSingleProduct = () => {
  const [value, setValue] = React.useState(4);
  const [blogData, setBlogData] = useState({})



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
            <button id="blog-minus_btn">-</button>
            <button id="blog-count_btn">1</button>
            <button id="blog-plus_btn">+</button>
          </div>
          <div className='blog-add-tocart-and-buy-now-btns'>
            <button id="blog-buy-now_btn">BUY NOW</button>
            <button id="blog-add-tocart_btn">ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default BlogSingleProduct