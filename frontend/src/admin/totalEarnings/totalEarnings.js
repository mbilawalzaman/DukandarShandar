import AdminAppBar from '../adminAppbar/adminAppbar'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import("./totalEarnings.css")


const TotalEarnings = () => {
  const theme = useTheme();
  return (
    <>
      <AdminAppBar />
      <div className='Total-earnings-cards-main-container'>
    <div className='Total-earnings-cards-container'>
      <Card sx={{ display: "flex", padding: "2rem 4rem"}}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              Total Orders
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div">
              22
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <Card sx={{ display: "flex", padding: "2rem 4rem"}}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
            Total Earnings
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div">
              Earnings: PKR 2200.00 
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </div>
    </div>
    </>
  );
}

export default TotalEarnings