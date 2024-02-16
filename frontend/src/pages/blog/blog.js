import React from "react";
import Navbar from "../../components/navbar/Navbar";
import BlogHeader from "../../components/blogHeader/blogHeader";
import BlogProducts from "../../components/blogProducts/blogProducts";
import Footer from "../../components/footer/footer";

const Blog = () => {
  return (
    <div>
      <Navbar />
      <BlogHeader />
      <BlogProducts />
      <Footer />
    </div>
  );
};

export default Blog;
