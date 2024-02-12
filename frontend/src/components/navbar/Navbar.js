import React from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.jpg"
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const cart = useSelector((state) => state.cart.cartData)

  return (
    <>
      <div className='navbarContainer'>
        <div className="navbar">
        <div className='logo'>
                <img src={logo} alt=''/>
        </div>
        <div className='links'>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/blog'>Blog</Link>
            <Link to='/shop'>Shop</Link>
            <Link to='/contact'>Contact</Link>
        </div>
        <div className='icons'>
        <sup>{cart.length}</sup>
          <Link to='/cart'><ShoppingBagOutlinedIcon sx={{fontSize:"28px"}}/></Link>
        </div>

        <div className='authBtns'>
            <Link to="/signup"><button>Sign Up</button></Link>
            <Link to='/login'><button>Login</button></Link>
        </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
