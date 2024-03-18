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
const Order = require("../Model/orderModel");

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
    const user = await createUser.findOne({ email });

    if (!user) {
      return res.status(409).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const userRole = user.role;

      const existingSession = await sessionModel.findOne({ userId: user._id });

      if (existingSession) {
        await sessionModel.findByIdAndDelete(existingSession._id);
      }

      const token = jwt.sign(
        { email: user.email, userId: user._id, role: userRole },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      const newSession = new sessionModel({ token, userId: user._id });
      await newSession.save();

      res.cookie('authToken-b', token, {
        maxAge: 60 * 60 * 1000,
      });

      res.status(201).json({
        data: {
          token,
          sessionId: newSession._id, // Assuming MongoDB generates the _id
          userId: user._id,
          role: userRole,
        },
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



router.get("/getsessionbyid", async (req, res) => {
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

      // You can directly use the token from the session object
      const token = session.token;

      // Log data before returning
      console.log("Data:", { sessionId: session._id, token: token });

      return res.status(200).json({ data: { sessionId: session._id, token: token }, message: "Session found" });
    } else {
      console.log("Session not found");
      return res.status(404).json({ message: "Session not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});




// Get session by passing email and password
router.post("/getsession", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await createUser.findOne({ email });

    if (!user) {
      return res.status(409).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const session = await sessionModel.findOne({ userId: user._id });

      if (session) {
        return res.status(200).json({
          data: {
            sessionId: session._id,
            token: session.token,
            userId: user._id,
            role: user.role,
          },
          message: "Session found"
        });
      } else {
        return res.status(404).json({ message: "Session not found" });
      }
    } else {
      return res.status(409).json({ message: "Password not match" });
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

router.post("/createOrder", async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      customerName: req.body.customerName,
      products: req.body.products,
      totalAmount: req.body.totalAmount,
      paymentMethod: req.body.paymentMethod,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getAllOrdersByUserId/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
