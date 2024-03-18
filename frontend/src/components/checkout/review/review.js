import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckOutNavbar from '../check/checkoutNavbar/checkOutNavbar';
import { Container, Paper } from '@mui/material';
import './review.css';
import { toast } from 'react-toastify';

export default function Review() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const cart = useSelector((state) => state.cart.cartData);
  const nameAndAddress = useSelector((state) => state.checkout.checkOutNameAndAddress);
  const cart_total_price = useSelector((state) => state.cart.cartTotal);

  const placeOrder = async () => {
    try {
      const orderData = {
        customerName: nameAndAddress[0].firstName + ' ' + nameAndAddress[0].lastName,
        products: cart.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
        })),
        totalAmount: cart_total_price,
        paymentMethod: 'YourPaymentMethod',
      };

      console.log('Placing order with data:', orderData);

      const response = await fetch('http://localhost:4000/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const savedOrder = await response.json();
        console.log('Order placed successfully:', savedOrder);
        navigate('/checkout/placeorder');
        toast.success('Order placed successfully!');
      } else {
        console.error('Failed to place order:', response.statusText);
        toast.error('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order. Please try again.');
    }
  };

  useEffect(() => {
    setProducts(cart);
  }, []);
  return (
    <>
    <CheckOutNavbar />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 3, md: 5 },
            p: { xs: 2, md: 3 },
            paddingTop: "1rem",
            border: "none",
            backgroundColor: "#edf1f4",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{ fontFamily: "Poppins", fontWeight: "bold" }}
          >
            Payment Details
          </Typography>
        </Paper>
      </Container>
      <div className="review-container">
        <div className="review-details">
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Order summary
            </Typography>
            <List disablePadding>
              {products.map((product) => (
                <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary={product.name}
                    secondary={product.desc}
                  />
                  <Typography variant="body2">PKR{product.price}.00</Typography>
                </ListItem>
              ))}
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  PKR{cart_total_price}.00
                </Typography>
              </ListItem>
            </List>
            <Grid container spacing={2}>
              {nameAndAddress.map((ele) => {
                return (
                  <>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                      </Typography>
                      <Typography gutterBottom>
                        {ele.firstName + " " + ele.lastName}
                      </Typography>
                      <Typography gutterBottom>{ele.address}</Typography>
                    </Grid>
                  </>
                );
              })}
              <Grid item container direction="column" xs={12} sm={6}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Payment details
                </Typography>
                <Grid container>
                  {products.map((payment) => (
                    <React.Fragment key={payment.title}>
                      <Grid item xs={6}>
                        <Typography
                          gutterBottom
                          sx={{ fontSize: "13px", fontFamily: "Poppins" }}
                        >
                          PKR{payment.price}.00
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          gutterBottom
                          sx={{ fontSize: "13px", fontFamily: "Poppins" }}
                        >
                          {payment.title}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <img
                          src={payment.image}
                          alt=""
                          style={{ height: "30px" }}
                        />
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <button onClick={placeOrder} className="order-btn">
              PLACE ORDER
            </button>
          </React.Fragment>
        </div>
      </div>
    </>
  );
}