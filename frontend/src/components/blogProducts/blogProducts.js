import { React, useEffect, useState } from "react";
import "./blogProducts.css";
import Loader from "../loader/loader";
import { useNavigate } from "react-router-dom";

const BlogProducts = () => {
  let priceFiltersData = [100, 200, 300, 500, 1000];

  const [filterData, setFilterData] = useState([]);
  const [blogProductData, setBlogProductData] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState("");
  const [searchInputValue, setSearchInputValue] = useState(""); // New search input

  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  const filterdCategoryData = blogProductData.filter((items) => {
    return items.blogCategory.toLowerCase().includes(categoryFilters.toLowerCase());
  });

  const filteredChange = (event) => {
    let userSelected = +event.target.value;
    let filteredValues = blogProductData.filter((data) => data.blogPrice > userSelected);
    setFilterData(filteredValues);
  };

  const filteredSearch = () => {
    // Additional filter for search input
    let searchFilteredValues;
  
    if (searchInputValue.trim() === "") {
      // If the search input is empty, show all products
      searchFilteredValues = blogProductData;
    } else {
      // Filter based on the search input value
      searchFilteredValues = filterData.filter((data) =>
        data.blogTitle.toLowerCase().includes(searchInputValue.toLowerCase())
      );
    }
  
    setFilterData(searchFilteredValues);
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

  const getBlogProductById = async (id) => {
    console.log(id);
    navigate(`/blogproduct/${id}`);
  };

  useEffect(() => {
    getBlogData();
  }, []);

  useEffect(() => {
    // Update filterData when categoryFilters changes
    const filteredCategoryData = blogProductData.filter((items) => {
      return items.blogCategory.toLowerCase().includes(categoryFilters.toLowerCase());
    });
    setFilterData(filteredCategoryData);
  }, [categoryFilters, blogProductData]);

  useEffect(() => {
    // Trigger search filter when searchInputValue changes
    filteredSearch();
  }, [searchInputValue]);

  return (
    <>
      <div className="tablet-Mobie-screen-container">
        <div className="tablet-Mobie-screen">
          <div className="productfilter-mobile-container">
            <label htmlFor="mobile-productfilter">Products Filter</label>
            <br />
            <select
              name="productfilter"
              id="products"
              value={categoryFilters}
              onChange={(e) => {
                setCategoryFilters(e.target.value);
              }}
            >
              <option value="">All Categories</option>
              {filterdCategoryData.map((element, index) => (
                <option key={index} value={element.blogCategory}>
                  {element.blogCategory}
                </option>
              ))}
            </select>
          </div>
          <div className="mobile-pricefilter-container">
            <label htmlFor="pricefilter">Price Filter</label>
            <br />
            <select name="pricefilter" id="price" onChange={filteredChange}>
              {priceFiltersData.map((ele, index) => (
                <option key={index} value={ele}>
                  Greater than {ele}
                </option>
              ))}
            </select>
          </div>
          {/* New search input */}
          <div>
            <h2>SEARCH FILTER</h2>
            <div className="main-search-box">
              <div className="search-filter-container">
                <input
                  type="text"
                  placeholder="Search"
                  id="search"
                  autoComplete="off"
                  onChange={(e) => {
                    setSearchInputValue(e.target.value);
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
            <div className="blog-product-maincontainer">
              <div className="blog-container">
                <div className="blog-filter-container">
                  <h2>Products Filters</h2>
                  <div className="productfilter-container">
                    <label htmlFor="productfilter">Category Filter</label>
                    <br />
                    <select
                      name="productfilter"
                      id="products"
                      value={categoryFilters}
                      onChange={(e) => {
                        setCategoryFilters(e.target.value);
                      }}
                    >
                      <option value="">All Categories</option>
                      {filterdCategoryData.map((element, index) => (
                        <option key={index} value={element.blogCategory}>
                          {element.blogCategory}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="pricefilter-container">
                    <label htmlFor="pricefilter">Price Filter:</label>
                    <br />
                    <select name="pricefilter" id="price" onChange={filteredChange}>
                      {priceFiltersData.map((ele, index) => (
                        <option key={index} value={ele}>
                          Greater than {ele}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="pricefilter-container">
                  <label htmlFor="pricefilter">Search Filter:</label>
                    <div className="main-search-box">
                      <div className="search-filter-container">
                        <input
                          type="text"
                          placeholder="Search"
                          id="search"
                          autoComplete="off"
                          onChange={(e) => {
                            setSearchInputValue(e.target.value);
                          }}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="blog-product-container">
                  {filterData.map((products) => {
                    return (
                      <div key={products.blogProductId}>
                        <div
                          className="blog-product-boxes"
                          onClick={() => getBlogProductById(products._id)}
                        >
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
      </div>
    </>
  );
};

export default BlogProducts;
