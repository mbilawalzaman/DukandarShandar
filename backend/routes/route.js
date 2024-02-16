const express = require("express");
const Product = require("../Model/productModel");
const allProduct = require("../Model/allProductModel");
const router = express.Router();
const blogProduct = require("../Model/addBlogProductModel");
const contacForm = require("../Model/contactFormModel");
const createUser = require("../Model/createUserModel");

//Create a Product routes

router.post("/addproduct", async (req, res) => {
  try {
    const { title, description, price, selectedImage } = req.body;

    if (!title || !description || !price || !selectedImage) {
      return res.status(409).json({ message: "Please fill all fields" });
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
    res
      .status(409)
      .json({ message: "Error adding product", error: error.message });
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

//Create a Blog Product routes

router.post("/addBlogProduct", async (req, res) => {
  try {
    const { blogTitle, blogDescription, blogPrice, blogSelectedImage } =
      req.body;

    if (!blogTitle || !blogDescription || !blogPrice || !blogSelectedImage) {
      return res.status(409).json({ message: "Please fill all fields" });
    }

    const addBlogProductData = new blogProduct({
      blogTitle,
      blogDescription,
      blogPrice,
      blogSelectedImage,
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

// get All Top Product API (HomePage)
router.get("/getTopProducts", async (req, res) => {
  try {
    const getTopProducts = await Product.find({});
    res.status(201).send(getTopProducts);
  } catch (error) {
    res.send(409).json({ message: "Unable to get All Products" });
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
    res.send(409).json({ message: "Unable to get All Blog Products" });
    console.log("Error when getting All Blog Products");
  }
});

//get Top product by ID
router.get("/getProductById/:id", async (req, res) => {
  try {
    const singleProduct = await Product.findById(req.params.id);
    res.status(201).send(singleProduct);
  } catch (error) {
    res.send(409).json({ message: "Unable to get single Products" });
    console.log("Error when getting single Products");
  }
});

//get All product by ID

router.get("/getAllProductById/:id", async (req, res) => {
  try {
    const AllProduct = await allProduct.findById(req.params.id);
    res.status(201).send(AllProduct);
  } catch (error) {
    res.send(409).json({ message: "Unable to get single Products" });
    console.log("Error when getting single Products");
  }
});

//get Blog product by ID

router.get("/getBlogProductById/:id", async (req, res) => {
  try {
    const BlogProduct = await blogProduct.findById(req.params.id);
    res.status(201).send(BlogProduct);
  } catch (error) {
    res.send(409).json({ message: "Unable to get single Products" });
    console.log("Error when getting single Products");
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
    const { firstName, lastName, email, pasword } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(409).json({ message: "Please fill all fields" });
    }

    const addProductData = new Product({
      firstName,
      lastName,
      email,
      password,
    });
    await addProductData.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating new user:", error);
    res
      .status(409)
      .json({ message: "Error adding new user", error: error.message });
  }
});

module.exports = router;
