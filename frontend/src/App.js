import React from 'react'
import "./App.css"
import { Routes , Route} from 'react-router-dom';
import Home from './pages/home/home';
import About from './pages/about/about';
import Blog from './pages/blog/blog';
import Shop from './pages/shop/shop';
import Contact from './pages/contact/contact';
import Cart from './pages/cart/cart';
import SignUp from './pages/signup/signup';
import Login from './pages/login/login';
import Footer from './components/footer/footer';
import Admin from './admin/admin';
import SingleProduct from './pages/single/singleProduct';
import AllBlogProducts from './pages/allblogprodutcs/allBlogProducts';
import AllProduct from './pages/allprodutcs/allprodutcs';
import MainCheckout from './pages/mainCheckout/mainCheckout';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' elemant={<MainCheckout/>}/>
        <Route path='/singleproduct/:id' element={<SingleProduct/>}/>
        <Route path='/allproduct/:id' element={<AllProduct/>}/>
        <Route path='/blogproduct/:id' element={<AllBlogProducts/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
      <Footer/>

    </div>
  )
}

export default App
