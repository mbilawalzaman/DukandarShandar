import {React, useState,useEffect } from 'react'
import "./renderAllProducts.css"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Loader from '../loader/loader';
import { useNavigate } from 'react-router-dom';

const RederAllProdutcs = () => {
  const [allproductData, setAllProductData] = useState([])
  const [loading, setloading] = useState(true)
  const navigate = useNavigate();


  const getAllData = async () => {
    const res = await fetch("http://localhost:4000/getAllproducts", {
      method: "GET",
      headers:{
        "Content-Type": "application/json"
      }
    });
    const allproductD = await res.json();
    setAllProductData(allproductD);
    if (allproductD) {
      setloading(false);
      
    }
  } 

  const getAllProductsById = async (id) =>{
    console.log(id)
    navigate(`/allproduct/${id}`)
  }
  
  useEffect(() => {
    getAllData();
  },[])

  return (
    <>
    {loading ? <Loader/> : <div>
    <div className='mainHeadingDiv'>
        <div className='headingD'>
            <h1>ALL PRODUCTS</h1>
        </div>
    </div>
    <div className='topproducts-container'>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container 
      spacing={{ xs: 2, md: 3 }} 
      columns={{ xs: 4, sm: 8, md: 14 }}
      className="mainGrid"
      >
        {allproductData.map((products, index) => (
          <Grid xs={2} sm={2} md={4} key={index} className="albox">
            <div className='overlay'>
                <div className='overlay-info' onClick={() => {getAllProductsById(products._id)}}>
                    <p> Title: {products.alltitle}</p>
                    <p> Price: {products.allprice}</p>
                    <p>Des: {products.alldescription}</p>
                </div>

            </div>
            <img src={products.selectedAllImage} alt=" "/>
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
    </div>}
    
    </>
  )
}

export default RederAllProdutcs