  import React, { useEffect, useState } from "react";
  import "./editallProduct.css";
  import { useNavigate, useParams } from "react-router-dom";
  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";


  const EditallProduct = () => {
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
        `http://localhost:4000/getAllProductById/${id}`,
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
        const requestBody = { ...retrieveData };
        
        // Check if selectedImage is not empty before including it
        if (selectedImage !== "") {
          requestBody.selectedAllImage = selectedImage;
        }
    
        const response = await fetch(
          `http://localhost:4000/editallproduct/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          },
        );
    
        console.log("Data Check +===>", retrieveData);
    
        if (response.ok) {
          toast.success("Product updated successfully");
          navigate("/admin");
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
                      name="alltitle"
                      value={retrieveData.alltitle}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      placeholder="Add Description"
                      name="alldescription"
                      value={retrieveData.alldescription}
                      onChange={handleChange}
                    />
                    <input
                      type="number"
                      placeholder="Add Price"
                      id="price"
                      name="allprice"
                      value={retrieveData.allprice}
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
                        name="selectedallImage"
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

  export default EditallProduct;
