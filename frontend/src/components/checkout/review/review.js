import  React ,{useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./review.css"
import CheckOutNavbar from '../check/checkoutNavbar/checkOutNavbar';
import { Container, Paper } from '@mui/material';




const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];


export default function Review() {
  
const navigate = useNavigate()
const [products, setProduts] = useState([])
const cart = useSelector((state) => state.cart.cartData)
const shippingOwner = useSelector((state)=>state.checkout.checkOutShippingData)

const placeOrder = () => {
  navigate("/checkout/placeorder")
}

useEffect (()=>{
  setProduts(cart)
},[])
  return (
    <>
        <Container component="main" maxWidth="sm" sx={{ mb: 4}}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 5 }, p: { xs: 2, md: 3 }, paddingTop: "1rem", border: "none", backgroundColor: "#edf1f4", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
          <Typography component="h1" variant="h4" align="center" sx={{fontFamily:"Poppins", fontWeight: "bold"}}>
            Payment Details
          </Typography>
        </Paper>
      </Container>
    <div className='review-container'>
      <div className='review-details'>
    <CheckOutNavbar/>
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {products.map((payment) => (
              <React.Fragment key={payment.title}>
                <Grid item xs={6}>
                  <Typography gutterBottom sx={{fontSize:"13px", fontFamily: "Poppins"}}>PKR{payment.price}.00</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom sx={{fontSize:"13px", fontFamily: "Poppins"}}>{payment.title}</Typography>
                </Grid>
                <Grid item xs={6}>
                 <img src={payment.image} alt="" style={{height:"30px"}}/>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <button onClick={placeOrder}>PLACE ORDER</button>
    </React.Fragment>

    </div>
    </div>
    </>

  );
}