const express = require("express");
const Product = require("../Model/productModel");
const allProduct = require("../Model/allProductModel");
const router = express.Router();
const blogProduct = require("../Model/addBlogProductModel");
const contacForm = require("../Model/contactFormModel");
const createUser = require("../Model/createUserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Admin = require("../Model/adminLoginModel");
const sessionModel = require("../Model/sessionModel");
const { token } = require("morgan");

// Function to generate a secure key

//Create a Product routes
// console.log(
//   "Secret Key: ",
//   require("crypto").randomBytes(256).toString("base64"),
// );

router.post("/addproduct", async (req, res) => {
  try {
    const { title, description, price, selectedImage } = req.body;

    if (!title || !description || !price || !selectedImage) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const addProductData = new Product({
      title,
      description,
      price,
      selectedImage,
    });
    
    await addProductData.save();
    
    res.status(201).json({ message: "Product added successfully" });

  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
});


//Update Product Top product

router.put("/editproduct/:id", async (req, res) => {
  try {
    const productId = req.params.id.replace(/[^a-f0-9]/gi, "");
    const { title, description, price, selectedImage } = req.body;

    if (!title || !description || !price || !selectedImage) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const updateProduct = await Product.findByIdAndUpdate(
      productId,
      {
        title,
        description,
        price,
        selectedImage,
      },
      { new: true }
    );

    if (!updateProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });

  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
});


//Delete Product by id

router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const productId = req.params.id.replace(/[^a-f0-9]/gi, "");

    if (!productId) {
      return res.status(400).json({ message: "Product Id is required" });
    }

    // find and delete product
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Error Deleting product", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//Create all Product routes

router.post("/addallproduct", async (req, res) => {
  try {
    const { alltitle, alldescription, allprice, selectedAllImage } = req.body;

    if (!alltitle || !alldescription || !allprice || !selectedAllImage) {
      return res.status(409).json({ message: "Please fill all fields" });
    }

    const addAllProductData = new allProduct({
      alltitle,
      alldescription,
      allprice,
      selectedAllImage,
    });
    await addAllProductData.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(409)
      .json({ message: "Error adding product", error: error.message });
  }
});

//Delete Blog Product by id

router.delete("/deleteallproduct/:id", async (req, res) => {
  try {
    const allProductId = req.params.id.replace(/[^a-f0-9]/gi, "");

    if (!allProductId) {
      return res.status(400).json({ message: "Product Id is required" });
    }

    // find and delete product
    const allProducts = await allProduct.findByIdAndDelete(allProductId);

    if (!allProducts) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Error Deleting product", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//Create a Blog Product routes

router.post("/addBlogProduct", async (req, res) => {
  try {
    const {
      blogTitle,
      blogDescription,
      blogPrice,
      blogSelectedImage,
      blogCategory,
    } = req.body;

    if (
      !blogTitle ||
      !blogDescription ||
      !blogPrice ||
      !blogSelectedImage ||
      !blogCategory
    ) {
      return res.status(409).json({ message: "Please fill all fields" });
    }

    const addBlogProductData = new blogProduct({
      blogTitle,
      blogDescription,
      blogPrice,
      blogSelectedImage,
      blogCategory,
    });
    await addBlogProductData.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(409)
      .json({ message: "Error adding product", error: error.message });
  }
});


//Delete Blog Product by id

router.delete("/deleteblogproduct/:id", async (req, res) => {
  try {
    const blogProductId = req.params.id.replace(/[^a-f0-9]/gi, "");

    if (!blogProductId) {
      return res.status(400).json({ message: "Product Id is required" });
    }

    // find and delete product
    const blogProducts = await blogProduct.findByIdAndDelete(blogProductId);

    if (!blogProducts) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Error Deleting product", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// get All Top Product API (HomePage)
router.get("/getTopProducts", async (req, res) => {
  try {
    const getTopProducts = await Product.find({});
    res.status(201).send(getTopProducts);
  } catch (error) {
    console.log({ message: "Unable to get All Products" });
    console.log("Error when getting All Products");
  }
});

// get All Product API (HomePage)
router.get("/getAllproducts", async (req, res) => {
  try {
    const getAllproducts = await allProduct.find({});
    res.status(201).send(getAllproducts);
  } catch (error) {
    res.send(409).json({ message: "Unable to get All Products" });
    console.log("Error when getting All Products");
  }
});

// get All Blog Product API
router.get("/getBlogProducts", async (req, res) => {
  try {
    const getBlogProducts = await blogProduct.find({});
    res.status(201).send(getBlogProducts);
  } catch (error) {
    console.log({ message: "Unable to get All Blog Products" });
    console.log("Error when getting All Blog Products");
  }
});

//get Top product by ID
router.get("/getProductById/:id", async (req, res) => {
  try {
    const productId = req.params.id.replace(/[^a-f0-9]/gi, "");
    const singleProduct = await Product.findById(productId);

    if (!singleProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(singleProduct);
  } catch (error) {
    console.error("Error when getting single Product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//get All product by ID

router.get("/getAllProductById/:id", async (req, res) => {
  try {
    const allProductId = req.params.id.replace(/[^a-f0-9]/gi, "");
    const allSingleProduct = await allProduct.findById(allProductId);
    
    if (!allSingleProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(allSingleProduct);
  } catch (error) {
    console.error("Error when getting single Product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Update All Product

router.put("/editallproduct/:id", async (req, res) => {
  try {
    const allproductId = req.params.id.replace(/[^a-f0-9]/gi, "");
    const { alltitle, alldescription, allprice, selectedAllImage } = req.body;

    if (!alltitle || !alldescription || !allprice || !selectedAllImage) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const updateAllProduct = await allProduct.findByIdAndUpdate(
      allproductId,
      {
        alltitle,
        alldescription,
        allprice,
        selectedAllImage,
      },
      { new: true }
    );

    if (!updateAllProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });

  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
});


//get Blog product by ID

router.get("/getBlogProductById/:id", async (req, res) => {
  try {
    const BlogProductId = req.params.id.replace(/[^a-f0-9]/gi, "");
    const blogSingleProduct = await blogProduct.findById(BlogProductId);
    
    if (!blogSingleProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(blogSingleProduct);
  } catch (error) {
    console.error("Error when getting single Product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});



//Update Blog Product

router.put("/editblogproduct/:id", async (req, res) => {
  try {
    const blogProductId = req.params.id.replace(/[^a-f0-9]/gi, "");
    const { blogTitle, blogDescription, blogPrice, blogSelectedImage } = req.body;

    if (!blogTitle || !blogDescription || !blogPrice || !blogSelectedImage) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const updateBlogProduct = await blogProduct.findByIdAndUpdate(
      blogProductId,
      {
        blogTitle,
        blogDescription,
        blogPrice,
        blogSelectedImage,
      },
      { new: true }
    );

    if (!updateBlogProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully" });

  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
});


//Create Contact form

router.post("/contact", async (req, res) => {
  try {
    const { fullname, email, subject, message } = req.body;

    if (!fullname || !email || !subject || !message) {
      return res.status(409).json({ message: "Please fill all fields" });
    }

    const contactFormData = new contacForm({
      fullname,
      email,
      subject,
      message,
    });
    await contactFormData.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res
      .status(409)
      .json({ message: "Error sending message", error: error.message });
  }
});

// crete new user

router.post("/createUser", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(409).json({ message: "Please fill all fields" });
    }

    const createUserData = new createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });
    
    await createUserData.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating new user:", error);
    res
      .status(409)
      .json({ message: "Error adding new user", error: error.message });
  }
});

// crete login API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await createUser.findOne({ email });

    if (!checkUser) {
      return res.status(409).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, checkUser.password);

    if (passwordMatch) {
      // Check if a session exists for the user
      const existingSession = await sessionModel.findOne({ userId: checkUser._id });

      // If a session exists, delete it
      if (existingSession) {
        await sessionModel.findByIdAndDelete(existingSession._id);
      }

      // Create a new session
      const token = jwt.sign(
        { email: checkUser.email, userId: checkUser._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      const newSession = new sessionModel({ token, userId: checkUser._id });
      await newSession.save();

      // Set the session information in a cookie
      res.cookie("auth", token);
      res.cookie('authToken', token, {
        maxAge: 60 * 60 * 1000, // Cookie expires in 1 hour
        httpOnly: true,
        // You can also set other cookie options like secure: true for HTTPS
      });
      console.log(res);
      console.log('--------------------------------================-');

      res.status(201).json({
        data: { token, sessionId: newSession._id, userId: checkUser._id },
        message: "Login success"
      });
    } else {
      return res.status(409).json({ message: "Password not match" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getsession", async (req, res) => {
  const { userId } = req.query;

  try {
    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    // Check if the session exists
    const session = await sessionModel.findOne({ userId });

    if (session) {
      console.log("Session found:", session);
      const checkUser = await createUser.findById(userId);

      if (!checkUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Retrieve the token from the user document
      const token = checkUser.token;

      return res.status(200).json({ data: { sessionId: session._id, token }, message: "Session found" });
    } else {
      console.log("Session not found");
      return res.status(404).json({ message: "Session not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});







//get session

// router.get("/getsession", async (req, res) => {
//   const { userId, token } = req.query;

//   try {
//     // Validate userId and token
//     if (!userId || !token) {
//       return res.status(400).json({ message: "Missing userId or token" });
//     }

//     // Check if the session exists
//     const session = await sessionModel.findOne({ userId, token });

//     if (session) {
//       console.log("Session found:", session);
//       return res.status(200).json({ data: { sessionId: session._id, token }, message: "Session found" });
//     } else {
//       console.log("Session not found");
//       return res.status(404).json({ message: "Session not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

//get session
router.get("/getsession", async (req, res) => {
  const { userId } = req.query;

  try {
    // Validate userId
    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    // Assume you have some logic to generate or retrieve the token
    const token = generateToken(); // Replace with your logic to get the token

    // Check if the session exists
    const session = await sessionModel.findOne({ userId });

    if (session) {
      console.log("Session found:", session, token);
      return res.status(200).json({ data: { sessionId: session._id, token }, message: "Session found" });
    } else {
      console.log("Session not found");
      return res.status(404).json({ message: "Session not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});






// delete session

router.delete("/deletesession/:sessionId", async (req, res) => {
  const sessionId = req.params.sessionId;

  try {
    // Find the session by ID and delete it
    const deletedSession = await sessionModel.findByIdAndDelete(sessionId);

    if (!deletedSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    return res.status(200).json({ data: deletedSession, message: "Session deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//get user by ID

router.get("/getUserById/:id", async (req, res) => {
  try {
    const userId = req.params.id.replace(/[^a-f0-9]/gi, "");
    const singleUser = await createUser.findById(userId);
    
    if (!singleUser) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(singleUser);
  } catch (error) {
    console.error("Error when getting single Product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


//admin Router

router.get("/adminlogin", async(req, res)=> {
  try {
    const adminLoginCredentials = await Admin.findOne();
    res.status(201).send(adminLoginCredentials);
  } catch (error) {
    console.log({ message: "user not found" });
  }

});

module.exports = router;
