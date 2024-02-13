import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CheckOutNavbar from '../check/checkoutNavbar/checkOutNavbar';
import { Container, Paper } from '@mui/material';
import "./payment.css"

const Payment = () => {
  const navigate = useNavigate();

  const [paymentInputValues, setPaymentInputValues] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    CVV: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentInputValues({ ...paymentInputValues, [name]: value });
  };

  const gotToPlaceOrder = () => {
    const { nameOnCard, cardNumber, expiryDate, CVV } = paymentInputValues;

    if (cardNumber.toString().length !== 16) {
      toast.error("Please enter valid card details of 16 digits");
    } else if (nameOnCard && cardNumber && expiryDate && CVV) {
      // Check if expiryDate is a valid Date
      const expirationDate = new Date(expiryDate);
      if (isNaN(expirationDate.getTime()) || expirationDate < new Date()) {
        toast.error("Please enter a valid future expiry date");
      } else {
        toast.success("Go to review order");
        navigate("/checkout/revieworder");
      }
    } else {
      toast.error("Please fill all details!");
    }
  };
  
  const backToSaddress = () => {
    navigate("/checkout")
  }
  


  return (
    <>
    <CheckOutNavbar/>

    <Container component="main" maxWidth="sm" sx={{ mb: 4}}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 5 }, p: { xs: 2, md: 3 }, paddingTop: "1rem", border: "none", backgroundColor: "#edf1f4", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
          <Typography component="h1" variant="h4" align="center" sx={{fontFamily:"Poppins", fontWeight: "bold"}}>
            Payment Details
          </Typography>
        </Paper>
      </Container>
      <div className='payment-container'>
        <div className='payment-details'>
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            type='string'
            label="Name on card"
            name='nameOnCard'
            value={paymentInputValues.nameOnCard}
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            type='number'
            id="cardNumber"
            label="Card number"
            name='cardNumber'
            value={paymentInputValues.cardNumber}
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            type='date'
            name='expiryDate'
            value={paymentInputValues.expiryDate}
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            onChange={handleChange}
            sx={{paddingTop:"1rem"}}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            type='number'
            label="CVV"
            name='CVV'
            value={paymentInputValues.CVV}
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
    <button onClick={backToSaddress} className='back-btn'>BACK</button>
    <button onClick={gotToPlaceOrder} className='next-btn'>NEXT</button>
    </div>
    </div>
    </>
  )
}

export default Payment
