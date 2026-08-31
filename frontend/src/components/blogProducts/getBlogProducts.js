import React, { useState, useEffect } from "react";

const GetBlogProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  const getAllData = async () => {
    const res = await fetch("http://localhost:4000/getallProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const allProducts = await res.json();
    const blogProducts = allProducts.filter(
      (product) => product.category === "blogproducts",
    );
    setAllProducts(blogProducts);
    console.log(blogProducts);
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <h1>Blog Products</h1>
      <ul>
        {allProducts.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <img src={product.selectedImage} alt={product.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetBlogProducts;
