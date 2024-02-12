import {React, useEffect, useState} from 'react'
import "./topProducts.css"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Loader from '../loader/loader';
import { useNavigate } from 'react-router-dom';

const TopProducts = () => {

  const [productData, setProductData] = useState([])
  const [loading, setloading] = useState(true)
  const nagivate = useNavigate();

  const getData = async () => {
    const res = await fetch("http://localhost:4000/getTopProducts", {
      method: "GET",
      headers:{
        "Content-Type": "application/json"
      }
    });
    const productD = await res.json();
    setProductData(productD);
    if (productD) {
      setloading(false);
      
    }
  }

  const getTopProductById = async (id) =>{
    console.log(id)
    nagivate(`/singleproduct/${id}`)
  }
  
  useEffect(() => {
    getData();
  },[])
  return (
    <>
    {loading ? <Loader/> :
    <div>
      <div className='mainHeadingDiv'>
        <div className='headingD'>
            <h1>TOP SEARCHES</h1>
        </div>
    </div>
    <div className='topproducts-container'>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container 
      spacing={{ xs: 2, md: 3 }} 
      columns={{ xs: 4, sm: 8, md: 14 }}
      className="mainGrid"
      >
        {productData.map((products, index) => (
          <Grid xs={2} sm={2} md={4} key={index} className="albox">
            <div className='overlay'>
                <div className='overlay-info' onClick={() => {getTopProductById(products._id)}}>
                    <p> Tile: {products.title}</p>
                    <p> Price: {products.price}</p>
                    <p> Des: {products.description}</p>
                </div>

            </div>
            <img src={products.selectedImage} alt=" "/>
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
    </div>
    }

    </>
  )
}

export default TopProducts
