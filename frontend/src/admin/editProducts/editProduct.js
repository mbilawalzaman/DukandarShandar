import React, { useEffect } from 'react'
import "./editProduct.css" 
import { useParams } from 'react-router-dom'

const EditProduct = () => {

  const {id} = useParams()

 const  getData = async () =>  {
    const getSingleProduct = await fetch(`http://localhost:4000/getProductById/${id}`)
    const response = await getSingleProduct.json();
    console.log("Res ==>",response)

  } 

  
  useEffect(() =>  {
    getData();
  },[])
  return (
    <div>
      <h1>Edit Products</h1>
    </div>
  )
}

export default EditProduct