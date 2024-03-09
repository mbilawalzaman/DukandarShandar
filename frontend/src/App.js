import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import Blog from "./pages/blog/blog";
import Contact from "./pages/contact/contact";
import Cart from "./pages/cart/cart";
import SignUp from "./pages/signup/signup";
import Login from "./pages/login/login";
import Admin from "./admin/admin";
import SingleProduct from "./pages/single/singleProduct";
import AllProduct from "./pages/allprodutcs/allprodutcs";
import MainCheckout from "./pages/mainCheckout/mainCheckout";
import Payment from "./components/checkout/payment/payment";
import Review from "./components/checkout/review/review";
import PlaceOrder from "./components/checkout/placeOrder/placeOrder";
import Orders from "./pages/orders/orders";
import EditProduct from "./admin/editProducts/editProduct";
import EditallProduct from "./admin/editallProduct/editallProduct";
import EditBlogProduct from "./admin/editBlogProduct/editBlogProduct";
import AddProduct from "./admin/addProduct/addProduct";
import TotalOrders from "./admin/totalOrders/totalOrders";
import TotalEarnings from "./admin/totalEarnings/totalEarnings";
import AdminLogin from "./admin/adminLogin/adminLogin";
import ProtectedRoute from "./middleware/middleware";
import ProtectedCheckout from "./middleware/checkoutmiddleware";
import BlogSingleProduct from "./components/blogSingleProduct/blogSingleProduct";


const App = () => {   

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/paymentdetails" element={<Payment />} />
        <Route path="/checkout/revieworder" element={<Review />} />
        <Route path="/checkout/placeorder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/allproduct/:id" element={<AllProduct />} />
        <Route path="/blogproduct/:id" element={<BlogSingleProduct/>} />    
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/admin" element={<ProtectedRoute Component={Admin} />} />
        <Route path="/admin/addproduct" element={<ProtectedRoute Component={AddProduct} />} />
        <Route path="/admin/totalorders" element={<ProtectedRoute Component={TotalOrders} />} />
        <Route path="/admin/totalearnings" element={<ProtectedRoute Component={TotalEarnings} />} />
        <Route path="/editproduct/:id" element={<EditProduct/>} />
        <Route path="/editallproduct/:id" element={<EditallProduct/>} />
        <Route path="/editblogproduct/:id" element={<EditBlogProduct/>} />
        <Route path="/checkout" element={<ProtectedCheckout Component={MainCheckout} />}  > </Route>
      </Routes>
    </div>
  );
};

export default App;
