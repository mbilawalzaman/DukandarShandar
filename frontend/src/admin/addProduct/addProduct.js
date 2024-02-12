import { React, useState } from "react";
// import imageToBase64 from 'image-to-base64/browser';
import("./addProduct.css");

const AddProduct = () => {
  const [addProductData, setAddProductData] = useState({
    title: "",
    description: "",
    price: "",
  });
  
  const [addAllProductData, setAllAddProductData] = useState({
    alltitle: "",
    alldescription: "",
    allprice: "",
  });

  const [addBlogProductData, setAddBlogProductData] = useState({
    blogTitle: "",
    blogDescription: "",
    blogPrice: "",
  });

  const [selectedImage, setselectedImage] = useState("");
  const [selectedAllImage, setSelectedAllImage] = useState("");
  const [blogSelectedImage, setBlogSelectedImage] = useState("");

  let name, value;
  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setAddProductData({ ...addProductData, [name]: value });
  };

  const handleAllChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setAllAddProductData({ ...addAllProductData, [name]: value });
  };

  const handleBlogChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setAddBlogProductData({ ...addBlogProductData, [name]: value });
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

  const handleAllBase64 = (e) => {
    var allreader = new FileReader();
    allreader.readAsDataURL(e.target.files[0]);
    allreader.onload = () => {
      setSelectedAllImage(allreader.result);
    };
    allreader.onerror = (error) => {
      console.log("Error:", error);
    };
  };

  const handleBlogBase64 = (e) => {
    var blogReader = new FileReader();
    blogReader.readAsDataURL(e.target.files[0]);
    blogReader.onload = () => {
      setBlogSelectedImage(blogReader.result);
    };
    blogReader.onerror = (error) => {
      console.log("Error:", error);
    };
  };

  const addProduct = async (event) => {
    event.preventDefault();
    const { title, description, price } = addProductData;

    try {
      const res = await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price,
          selectedImage,
        }),
      });

      const responseData = await res.text(); // Read the response only once as text

      if (res.ok) {
        alert("Data Successfully Added");
        setAddProductData({
          title: "",
          description: "",
          price: "",
          selectedImage: "",
        });
        console.log(responseData); // Log the response data
      } else {
        alert("Failed to add data. Please check console for details.");
        console.error(responseData); // Log the error response data
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };
  const addallProduct = async (event) => {
    event.preventDefault();
    const { alltitle, alldescription, allprice } = addAllProductData;

    try {
      const response = await fetch("http://localhost:4000/addallproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alltitle,
          alldescription,
          allprice,
          selectedAllImage,
        }),
      });

      const responseallData = await response.text(); // Read the response only once as text

      if (response.ok) {
        alert("Data Successfully Added");
        setAllAddProductData({
          alltitle: "",
          alldescription: "",
          allprice: "",
          selectedAllImage: "",
        });
        console.log(responseallData); // Log the response data
      } else {
        alert("Failed to add data. Please check console for details.");
        console.error("Error",responseallData); // Log the error response data
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  const addBlogProduct = async (event) => {
    event.preventDefault();
    const { blogTitle, blogDescription, blogPrice } = addBlogProductData;

    try {
      const blogRes = await fetch("http://localhost:4000/addBlogProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogTitle,
          blogDescription,
          blogPrice,
          blogSelectedImage,
        }),
      });

      const responseBlogData = await blogRes.text(); 

      if (blogRes.ok) {
        alert("Data Successfully Added");
        setAddBlogProductData({
          blogTitle: "",
          blogDescription: "",
          blogPrice: "",
          blogSelectedImage: (""),
        });
        console.log("Data==>",responseBlogData);
      } else {
        alert("Failed to add data. Please check console for details.");
        console.error("Error",responseBlogData); 
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };


  

  return (
    <div>
      <div className="addProductContainer">
        <div className="addProduct">
          <div className="add">
            <p>Add Product</p>
            <div className="formContainer">
              <form>
                <div className="inputArea">
                  <input
                    type="text"
                    placeholder="Add Title"
                    name="title"
                    value={addProductData.title}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Add Description"
                    name="description"
                    value={addProductData.description}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    placeholder="Add Price"
                    id="price"
                    name="price"
                    value={addProductData.price}
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
                      onChange={handleBase64}
                    />
                  </div>
                </div>
                <div className="addBtnContainer">
                  <div className="addBtn">
                    <button onClick={addProduct}>Add Product</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="addAllProductContainer">
        <div className="addAllProduct">
          <div className="addAll">
            <p>Add All Product</p>
            <div className="formContainer">
              <form>
                <div className="allInputArea">
                  <input
                    type="text"
                    placeholder="Add All Title"
                    name="alltitle"
                    value={addAllProductData.alltitle}
                    onChange={handleAllChange}
                  />
                  <input
                    type="text"
                    placeholder="Add All Description"
                    name="alldescription"
                    value={addAllProductData.alldescription}
                    onChange={handleAllChange}
                  />
                  <input
                    type="number"
                    placeholder="Add All Price"
                    id="allprice"
                    name="allprice"
                    value={addAllProductData.allprice}
                    onChange={handleAllChange}
                  />
                </div>
                <div className="all-upload-box">
                  <div className="all-upload-container">
                    <label
                      htmlFor="allimage-upload"
                      className="all-upload-label">
                      <p>Drag and drop an image or click here to upload</p>
                    </label>
                    <input
                      accept="image/*"
                      type="file"
                      id="allimage-upload"
                      name="selectedAllImage"
                      onChange={handleAllBase64}
                    />
                  </div>
                </div>
                <div className="addAllBtnContainer">
                  <div className="addAllBtn">
                    <button onClick={addallProduct}>Add All Product</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="addBlogProductContainer">
        <div className="addBlogProduct">
          <div className="addBlog">
            <p>Add Blog Product</p>
            <div className="formContainer">
              <form>
                <div className="blogInputArea">
                  <input
                    type="text"
                    placeholder="Add blog Product Title"
                    name="blogTitle"
                    value={addBlogProductData.blogTitle}
                    onChange={handleBlogChange}
                  />
                  <input
                    type="text"
                    placeholder="Add blog Product Description"
                    name="blogDescription"
                    value={addBlogProductData.blogDescription}
                    onChange={handleBlogChange}
                  />
                  <input
                    type="number"
                    placeholder="Add blog Product Price"
                    id="blogPrice"
                    name="blogPrice"
                    value={addBlogProductData.blogPrice}
                    onChange={handleBlogChange}
                  />
                </div>
                <div className="blog-upload-box">
                  <div className="blog-upload-container">
                    <label
                      htmlFor="blogimage-upload"
                      className="blog-upload-label">
                      <p>Drag and drop an image or click here to upload</p>
                    </label>
                    <input
                      accept="image/*"
                      type="file"
                      id="blogimage-upload"
                      name="blogSelectedImage"
                      onChange={handleBlogBase64}
                    />
                  </div>
                </div>
                <div className="addBlogBtnContainer">
                  <div className="addBlogBtn">
                    <button onClick={addBlogProduct}>Add Blog Product</button>
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

export default AddProduct;
