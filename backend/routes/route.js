const express = require("express");
const Product = require("../Model/productModel");
const allProduct = require("../Model/allProductModel");
const router = express.Router();
const blogProduct = require("../Model/addBlogProductModel");

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
//get Top product by ID
router.get("/getProductById/:id", async (req, res) => {
  try {
    const productId = req.params.id.replace(/[^a-f0-9]/gi, "");
    const singleProduct = await Product.findById(productId);

    if (!singleProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

// Calculate the rating
const rating = singleProduct.rating / singleProduct.numOfRate;

// Round the rating up to the nearest multiple of 0.5
const roundedRating = Math.ceil(rating * 2) / 2;

// Update the product's rating
singleProduct.rating = roundedRating;

console.log("Rating:", roundedRating);

    res.status(200).send(singleProduct);
  } catch (error) {
    console.error("Error when getting single Product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

  //get All product by ID

  router.get("/getAllProductById/:id", async (req, res) =>{
    try {
          const AllProduct = await allProduct.findById(req.params.id);
          res.status(201).send(AllProduct);
    } catch (error) {
      res.send(409).json({ message: "Unable to get single Products" });
      console.log("Error when getting single Products");
    }
  });

   //get Blog product by ID

  router.get("/getBlogProductById/:id", async (req, res) =>{
    try {
          const BlogProduct = await blogProduct.findById(req.params.id);
          res.status(201).send(BlogProduct);
    } catch (error) {
      res.send(409).json({ message: "Unable to get single Products" });
      console.log("Error when getting single Products");
    }
  });

// Update Product Rating by ID
router.put("/updateRatingByProductId/:id", async (req, res) => {
  try {
    const productId = req.params.id.replace(/[^a-f0-9]/gi, "");
    let { rating } = req.body;

    // Validate if rating is provided
    if (!rating || isNaN(rating) || rating < 0 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating value" });
    }

    // Round the rating up to the nearest multiple of 0.5
    rating = Math.ceil(rating * 2) / 2;

    // If the rating is greater than 5, set it to 5
    // rating = Math.min(rating, 5);

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }


    // Update the product rating
    const total= product.rating+rating;
    product.rating = total;

    const num=1;

    const numOfRate=product.numOfRate+num;
    product.numOfRate=numOfRate;

    // Save the updated product to the database
    await product.save();

    res.status(200).json({ message: "Product rating updated successfully" });
  } catch (error) {
    console.error("Error updating product rating:", error);
    res.status(500).json({
      message: "Error updating product rating",
      error: error.message,
    });
  }
});


module.exports = router;
