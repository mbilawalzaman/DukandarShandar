import React from "react";
import "./allOrders.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AllOrders = () => {
  const cart = useSelector((state) => state.cart.cartData);
  const orderid = useSelector((state) => state.checkout.order_Id);
  const cart_quantity = useSelector((state) => state.cart.quantity);
  const navigate = useNavigate("");

  const back_home = () => {
    navigate("/");
  };

  return (
    <div className='orders-main-div'>
      <button onClick={back_home} className="all-orders_btn"> BACK </button>
   <div className='order-main-box'>
    <div className='order-box'>
      <div className='order-header-main'>
        <div className='order-header'>
        <div className="orderId"><p> Order Id</p> </div>
        <div className="orderStatus"> <p> Status </p> </div>
        <div className="orderQty"> <p> Quantity </p></div>
        <div className="orderAmount"> <p> Amount </p></div>
        </div>
      </div>
      <div className='all-orders-main'>
      {cart.length > 0 ? cart.map((ele)=>{
            return(
              <>
              <div className="all-Order-Main">
               <div className="all-orderId"><p> {orderid} </p> </div>
               <div className="all-orderStatus"> <p> Processing </p> </div>
               <div className="all-orderQty"> <p> {cart_quantity} </p></div>
               <div className="all-orderAmount"> <p> PKR{ele.price}.00 </p></div>
               </div>
              </>
            )
          }): <h1 style={{fontFamily:"Poppins", textAlign:"center", marginTop:"8rem"}}> No Orders Yet </h1>
          }

      </div>
    </div>
   </div>
    </div>
  )
}

export default AllOrders;
