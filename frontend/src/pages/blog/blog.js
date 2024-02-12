import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import BlogHeader from '../../components/blogHeader/blogHeader'
import BlogProducts from '../../components/blogProducts/blogProducts'

const Blog = () => {
  return (
    <div>
      <Navbar/>
      <BlogHeader/>
      <BlogProducts/>
    </div>
  )
}

export default Blog
