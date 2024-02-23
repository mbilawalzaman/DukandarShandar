import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import Blog from "./pages/blog/blog";
import Shop from "./pages/shop/shop";
import Contact from "./pages/contact/contact";
import Cart from "./pages/cart/cart";
import SignUp from "./pages/signup/signup";
import Login from "./pages/login/login";
import Admin from "./admin/admin";
import SingleProduct from "./pages/single/singleProduct";
import AllBlogProducts from "./pages/allblogprodutcs/allBlogProducts";
import AllProduct from "./pages/allprodutcs/allprodutcs";
import MainCheckout from "./pages/mainCheckout/mainCheckout";
import Payment from "./components/checkout/payment/payment";
import Review from "./components/checkout/review/review";
import PlaceOrder from "./components/checkout/placeOrder/placeOrder";
import Orders from "./pages/orders/orders";
import ShopSingleProduct from "./components/shopSingleProduct/shopSingleProduct";
import EditProduct from "./admin/editProducts/editProduct";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Blog />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<MainCheckout />} />
        <Route path="/checkout/paymentdetails" element={<Payment />} />
        <Route path="/checkout/revieworder" element={<Review />} />
        <Route path="/checkout/placeorder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/allproduct/:id" element={<AllProduct />} />
        <Route path="/blogproduct/:id" element={<AllBlogProducts />} />
        <Route path="/shopproduct/:id" element={<ShopSingleProduct />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/editproduct/:id" element={<EditProduct/>} />
      </Routes>
    </div>
  );
};

export default App;
