import { React, useEffect, useState } from "react";
import "./blogProducts.css";
import Loader from "../loader/loader";
import { useNavigate } from "react-router-dom";

const BlogProducts = () => {
  let priceFiltersData = [100, 200, 300, 500, 1000];

  const [filterData, setFilterData] = useState([]);
  const [blogProductData, setBlogProductData] = useState([]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  const filteredChange = (event) => {
    let userSelected = +event.target.value;
    let filteredValues = blogProductData.filter(
      (data) => data.blogPrice > userSelected,
    );
    setFilterData(filteredValues);
  };

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
    setFilterData(blogProductData);
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
                    onChange={filteredChange}>
                    {priceFiltersData.map((ele, index) => (
                      <option key={index} value={ele}>
                        Greater than {ele}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="blog-product-container">
                {filterData.map((products) => {
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

export default BlogProducts;
