import React, { useEffect } from "react";
import "./editProducts.css";
import { useParams } from "react-router-dom";

const EditProducts = () => {
  const { id } = useParams();

  const getData = async () => {
    const getSingleProduct = await fetch(
      `http://localhost:4000/getProductById/${id}`,
    );
    const response = await getSingleProduct.json();
  };

  useEffect(() => {
    getData();
  }, []);

  return <h1> Edit Products</h1>;
};

export default EditProducts;
