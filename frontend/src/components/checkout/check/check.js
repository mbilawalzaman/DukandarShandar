import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import "./check.css"
import CheckOutNavbar from './checkoutNavbar/checkOutNavbar';


const steps = ['Shipping address', 'Payment details', 'Review your order'];

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <SAddress />;
//     case 1:
//       return <Payment />;
//     case 2:
//       return <Review />;
//     default:
//       throw new Error('Unknown step');
//   }
// }

export default function Check() {
  // const [activeStep, setActiveStep] = React.useState(0);

  // const  handleNext = () => {
  //   setActiveStep(activeStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep(activeStep - 1);
  // };

  return (
    <React.Fragment>
      <CssBaseline />
      <CheckOutNavbar/>
      <Container component="main" maxWidth="sm" sx={{ mb: 4}}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 5 }, p: { xs: 2, md: 3 }, paddingTop: "1rem", border: "none", backgroundColor: "#edf1f4", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
          <Typography component="h1" variant="h4" align="center" sx={{fontFamily:"Poppins", fontWeight: "bold"}}>
            Checkout
          </Typography>
          {/* <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel sx={{fontFamily:"Poppins", fontWeight: "bold"}}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )} */}
        </Paper>
      </Container>
    </React.Fragment>
  );
}

