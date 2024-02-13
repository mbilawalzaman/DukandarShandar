import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
    <button onClick={backToSaddress}>BACK</button>
    <button onClick={gotToPlaceOrder}>NEXT</button>
    </>
  )
}

export default Payment
