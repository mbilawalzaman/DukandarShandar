import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.jpg";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from '@mui/icons-material/Clear';
import Cookies from "js-cookie";

const Navbar = () => {
  const cart = useSelector((state) => state.cart.cartData);

  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  const logoutUser = () => {
    window.localStorage.clear();
    Cookies.remove('authToken-b');
    window.location.href = "/login";
  };

  const Navbar = () => {
    document.querySelector(".mobile-navbar-box-container").style.marginRight="0rem"
    document.querySelector(".mobile-navbar-box").style.display="block"
  }

  const closeMobileNavBar =() => {
    document.querySelector(".mobile-navbar-box").style.display="none"
  }

  return (
    <>
      <div className="navbarContainer">
        <div className="navbar">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/products">Products</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="icons">
            <sup>{cart.length}</sup>
            <Link to="/cart">
              <ShoppingBagOutlinedIcon sx={{ fontSize: "28px" }} />
            </Link>
          </div>
          {isLoggedIn === "true" ? (
            <Link to="#">
              <button onClick={logoutUser} className="logoutBtn">
                Log Out
              </button>
            </Link>
          ) : (
            <div className="authBtns">
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="mobilenavbar-container">
        <div className="mobilenavbar">
          <div className="imageAndHamburger">
            <img src={logo} alt="" />
            <MenuIcon sx={{ cursor: "pointer", marginRight: "22px", fontSize:"30px"}} onClick={Navbar}/>
          </div>
        </div>
      </div>
      <div className="mobile-navbar-box-container">
        <div className="mobile-navbar-box">
        <ClearIcon sx={{position:"absolute", right:"3%", top:"3%", cursor:"pointer"}}onClick={closeMobileNavBar}/>
          <div className="mobile-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/products">Products</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact</Link>
          </div>
           <div className="mobile-icons">
            {/* <sup>{cart.length}</sup> */}
            <Link to="/cart">
              <ShoppingBagOutlinedIcon sx={{ fontSize: "28px" }} />
            </Link>
          </div>
          {isLoggedIn === "true" ? (
            <Link to="#">
              <button onClick={logoutUser} className="mobile-logoutBtn">
                Log Out
              </button>
            </Link>
          ) : (
            <div className="mobile-authBtns">
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
