import { React, useEffect, useState } from "react";
import "./shopComponent.css";
import Loader from "../loader/loader";
import { useNavigate } from "react-router-dom";

const ShopComponent = () => {
  const [blogProductData, setBlogProductData] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
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
  const getBlogProductById = async (id) => {
    console.log(id);
    navigate(`/shopproduct/${id}`);
  };

  //filter Products
  const filteredData = blogProductData.filter((items) => {
    return items.blogTitle
      .toLowerCase()
      .includes(searchInputValue.toLowerCase());
  });

  useEffect(() => {
    getBlogData();
  }, []);

  useEffect(() => {}, [blogProductData]);

  return (
    <>
      <div className="mobile-tablet-search-box-container">
        <div className="mobile-tablet-search-box">
          <div className="search-box">
            <h2>SEARCH FILTER</h2>
            <div className="main-search-box">
              <div className="search-filter-container">
                <input
                  type="text"
                  placeholder="Search"
                  id="search"
                  autoComplete="off"
                  onChange={(e) => {
                    setSearchInputValue(e.target.value); //searchInputValue;
                  }}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="shop-product-maincontainer">
              <div className="shop-container">
                <div className="shop-filter-container">
                  <h2>SEARCH FILTER</h2>
                  <div className="main-search-box">
                    <div className="search-filter-container">
                      <input
                        type="text"
                        placeholder="Search"
                        id="search"
                        autoComplete="off"
                        onChange={(e) => {
                          setSearchInputValue(e.target.value); //searchInputValue;
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="shop-product-container">
                  {filteredData.map((products) => {
                    return (
                      <div key={products.blogProductId}>
                        <div
                          className="shop-product-boxes"
                          onClick={() => {
                            getBlogProductById(products._id);
                          }}
                        >
                          <img src={products.blogSelectedImage} alt="" />
                          <div className="shop-title">
                            <p>
                              <b>Title: </b> {products.blogTitle}
                            </p>
                          </div>
                          <div className="shop-des">
                            <p>
                              <b>Description: </b> {products.blogDescription}
                            </p>
                          </div>
                          <div className="shop-p">
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
      </div>
    </>
  );
};

export default ShopComponent;
