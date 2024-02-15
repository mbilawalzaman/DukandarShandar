import { React, useEffect, useState } from "react";
import "./shopComponent.css";
import Loader from "../loader/loader";
import { useNavigate } from "react-router-dom";

const ShopComponent = () => {

  const [blogProductData, setBlogProductData] = useState([]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();



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
  }, [blogProductData]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="blog-product-maincontainer">
            <div className="blog-container">
              <div className="blog-filter-container">
                <h2>Products Filters</h2>
               
              </div>
              <div className="blog-product-container">
                {blogProductData.map((products) => {
                  return (
                    <div key={products.blogProductId}>
                      <div
                        className="blog-product-boxes"
                        onClick={() =>
                          getBlogProductsById(products.blogProductId)
                        }>
                        <img src={products.blogSelectedImage} alt="" />
                        <div className="blog-title">
                          <p>
                            <b>Title: </b> {products.blogTitle}
                          </p>
                        </div>
                        <div className="blog-des">
                          <p>
                            <b>Description: </b> {products.blogDescription}
                          </p>
                        </div>
                        <div className="blog-p">
                          <p>
                            <b>Price: </b> {products.blogPrice}
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
