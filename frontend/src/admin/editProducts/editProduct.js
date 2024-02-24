import React, { useEffect, useState } from "react";
import "./editProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EditProduct = () => {
  // const [addProductData, setAddProductData] = useState({
  //   title: "",
  //   description: "",
  //   price: "",
  // });
  const [selectedImage, setselectedImage] = useState("");
  const [retrieveData, setRetrieveData] = useState([]);
  const navigate = useNavigate("");

  const { id } = useParams();

  const getData = async () => {
    const getSingleProduct = await fetch(
      `http://localhost:4000/getProductById/${id}`,
    );
    const response = await getSingleProduct.json();
    setRetrieveData(response);
  };

  let name, value;
  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setRetrieveData({ ...retrieveData, [name]: value });
  };

  const handleBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setselectedImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error:", error);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/editproduct/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(retrieveData),
        },
      );
      if (response.ok) {
        toast.success("Product updated successfully");
        navigate("/admin")
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.log("Failed to update product", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="addProductContainer">
        <div className="addProduct">
          <div className="add">
            <p>Edit Product</p>
            <div className="formContainer">
              <form onSubmit={handleSubmit}>
                <div className="inputArea">
                  <input
                    type="text"
                    placeholder="Add Title"
                    name="title"
                    value={retrieveData.title}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Add Description"
                    name="description"
                    value={retrieveData.description}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    placeholder="Add Price"
                    id="price"
                    name="price"
                    value={retrieveData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="upload-box">
                  <div className="upload-container">
                    <label htmlFor="image-upload" className="upload-label">
                      <p>Drag and drop an image or click here to upload</p>
                    </label>
                    <input
                      accept="image/*"
                      type="file"
                      id="image-upload"
                      name="selectedImage"
                      // value={retrieveData.selectedImage}
                      onChange={handleBase64}
                    />
                  </div>
                </div>
                <div className="addBtnContainer">
                  <div className="addBtn" style={{ marginLeft: "1.2rem" }}>
                    <button>Update Product</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
