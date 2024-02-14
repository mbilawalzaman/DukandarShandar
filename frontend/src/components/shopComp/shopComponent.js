import { React, useEffect, useState } from "react";
import "./shopComponent.css";
import Loader from "../loader/loader";
import { useNavigate } from "react-router-dom";

const ShopComponent = () => {

 
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const [blogProductData, setBlogProductData] = useState([])



  const getBlogData = async () => {
    const res = await fetch("http://localhost:4000/getBlogProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const blogProductD = await res.json();
    setBlogProductData(blogProductD);
    if (blogProductD) {
      setloading(false);
    }
  };

  const getBlogProductsById = async (id) => {
    console.log(id);
    navigate(`/blogProduct/${id}`);
  };

  useEffect(() => {
    getBlogData();
  }, []);

  useEffect(() => {

  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="blog-product-maincontainer">
            <div className="blog-container">
              <div className="blog-filter-container">
                <h2>Search Filters</h2>
                <div className="productfilter-container">
                  <label htmlFor="productfilter">Products Filter</label>
                  <br />
                  <br />
                  <select name="productfilter" id="products">
                    <option value="clock">Clock</option>
                    <option value="pen">Pen</option>
                    <option value="diary">Diary</option>
                    <option value="bags">Bags</option>
                  </select>
                </div>
                <div className="pricefilter-container">
                  <label htmlFor="pricefilter">Price Filter:</label>
                  <br />
                  <select
                    name="pricefilter"
                    id="price"
                    >
                    
                  </select>
                </div>
              </div>
              <div className="blog-product-container">
                {blogProductData.map((products) => {
                  return (
                    <div key={blogProductData.blogProductId}>
                      <div
                        className="blog-product-boxes"
                        onClick={() =>
                          getBlogProductsById(blogProductData.blogProductId)
                        }>
                        <img src={blogProductData.blogSelectedImage} alt="" />
                        <div className="blog-title">
                          <p>
                            <b>Title: </b> {blogProductData.blogTitle}
                          </p>
                        </div>
                        <div className="blog-des">
                          <p>
                            <b>Description: </b> {blogProductData.blogDescription}
                          </p>
                        </div>
                        <div className="blog-p">
                          <p>
                            <b>Price: </b> {blogProductData.blogPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopComponent;
