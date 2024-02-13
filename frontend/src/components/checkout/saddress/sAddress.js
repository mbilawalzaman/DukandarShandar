import React, { useEffect, useState  } from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { NameAndAddressfunction, checkOutShippingData } from '../../../features/checkoutSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import "./sAddress.css"


const SAddress = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate("");


  const [inputValues, setInputValues] = useState({
    firstName:"",
    lastName:"",
    address:"",
    city:"",
    state:"",
    zip:Number,
    country:"",
    number:Number
  })

  let name , value
  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setInputValues({...inputValues, [name]:value})

  }



  const moveToNext = () => {
    const {firstName, lastName, address, city, state, zip, country , number} = inputValues

    if(firstName && lastName && address && city && state && zip && country && number){
    toast.success("Go to payment details")
    navigate("/checkout/paymentdetails")
    dispatch(NameAndAddressfunction({firstName : firstName, lastName: lastName, address: address , number: number}))
    }else{
      toast.error("PLease fill all details")
  }
  }

  // useEffect(() =>{
  //   const {firstName, lastName, address} = inputValues
  //   dispatch(checkOutShippingData(firstName, lastName, address))
  // },[])
  return (
    <>
    <div className='sAddress-main-container'>
    <div className='sAddress-div'>
      <Typography variant="h6" gutterBottom sx={{fontFamily:"Poppins", fontWeight: "bold"}}>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            type='string'
            value={inputValues.firstName}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            sx={{fontFamily:"Poppins"}}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            value={inputValues.lastName}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            sx={{fontFamily:"Poppins"}}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            value={inputValues.address}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            sx={{fontFamily:"Poppins"}}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={inputValues.city}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            sx={{fontFamily:"Poppins"}}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            value={inputValues.state}
            fullWidth
            variant="standard"
            sx={{fontFamily:"Poppins"}}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            value={inputValues.zip}
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            sx={{fontFamily:"Poppins"}}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            value={inputValues.country}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            sx={{fontFamily:"Poppins"}}
            onChange={handleChange}
          />
        </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="number"
            name="number"
            label="Number"
            value={inputValues.country}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            sx={{fontFamily:"Poppins"}}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      <button onClick={moveToNext} className='moveToNext'>NEXT</button>
      </div>
      </div>
    </>
  )
}

export default SAddress
