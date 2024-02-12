import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import CartHeader from '../../components/cartHeader/cartHeader'
import CartSection from '../../components/cartSection/cartSection'

const Cart = () => {
  return (
    <div>
      <Navbar/>
      <CartHeader/>
      <CartSection/>
    </div>
  )
}

export default Cart
