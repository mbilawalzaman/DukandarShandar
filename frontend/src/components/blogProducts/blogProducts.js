import React, { useEffect, useState } from "react";
import "./blogProducts.css";
import Loader from "../loader/loader";
import { useNavigate } from "react-router-dom";

const BlogProducts = () => {
  const [blogProductData, setBlogProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const navigate = useNavigate();

  const getBlogData = async () => {
    try {
      const res = await fetch("http://localhost:4000/getallProducts");
      const blogProductD = await res.json();
      setBlogProductData(blogProductD);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch blog products:", error);
      setLoading(false);
    }
  };

  const getBlogProductById = (id) => {
    navigate(`/blogproduct/${id}`);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  useEffect(() => {
    getBlogData();
  }, []);

  // Filter products based on search input, price, and category
  const filteredProducts = blogProductData.filter((product) => {
    const title = product.title || ""; // Guard against undefined title

    return (
      title.toLowerCase().includes(searchInput.toLowerCase()) &&
      (priceFilter === "" || product.price <= parseFloat(priceFilter))
      // Remove the category filter condition
    );
  });

  return (
    <div className="tablet-Mobile-screen-container">
      <div className="tablet-Mobile-screen">
        <div className="filter-container">
          <input
            type="text"
            placeholder="Search by title"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <input
            type="number"
            placeholder="Max price"
            value={priceFilter}
            onChange={handlePriceFilterChange}
          />
        </div>
      </div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className="blog-product-maincontainer">
            <div className="blog-container">
              <div className="blog-product-container">
                <div className="filter-container">
                  <input
                    type="text"
                    placeholder="Search by title"
                    value={searchInput}
                    onChange={handleSearchInputChange}
                  />
                  <br />
                  <input
                    type="number"
                    placeholder="Max price"
                    value={priceFilter}
                    onChange={handlePriceFilterChange}
                  />
                </div>
                {filteredProducts.map((product) => (
                  <div
                    key={product.blogProductId}
                    className="blog-product-boxes"
                    onClick={() => getBlogProductById(product._id)}>
                    <img src={product.selectedImage} alt={product.title} />
                    <div className="blog-title">
                      <p>
                        <b>Title: </b> {product.title}
                      </p>
                    </div>
                    <div className="blog-des">
                      <p>
                        <b>Description: </b> {product.description}
                      </p>
                    </div>
                    <div className="blog-p">
                      <p>
                        <b>Price: </b> {product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogProducts;
