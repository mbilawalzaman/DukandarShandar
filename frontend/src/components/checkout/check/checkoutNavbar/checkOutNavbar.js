import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import DSLogo from "../../../../assets/logo.jpg"


const CheckOutNavbar = () => {
  return (
    <div>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar sx={{ backgroundColor: "#edf1f4" }}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className="mainCheckoutNav"
          >
            <img src={DSLogo} alt="" className="checkout-logo" />
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CheckOutNavbar;
