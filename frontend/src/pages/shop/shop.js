import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import ShopComponent from '../../components/shopComp/shopComponent'
import ShopHeader from '../../components/shopHeader/shopHeader'

const Shop = () => {
  return (
    <div>
      <Navbar/>
      <ShopHeader/>
      <ShopComponent/>
    </div>
  )
}

export default Shop
