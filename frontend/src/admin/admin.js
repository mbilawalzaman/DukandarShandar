import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import TableViewIcon from "@mui/icons-material/TableView";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaidIcon from "@mui/icons-material/Paid";
import dashLogo from "../assets/logo.jpg";
import AddProduct from "./addProduct/addProduct";
import DashboardIcon from "@mui/icons-material/Dashboard";
import("./admin.css");

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Admin() {
  const [open, setOpen] = React.useState(true);
  const [toggle, setToggle] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
    setToggle(!toggle);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          sx={{ backgroundColor: "#e8ecef" }}
        >
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
                color: "black",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, fontFamily: "Poppins", color: "black" }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon sx={{ color: "black" }} />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <div className="dashboardLogoContainer">
              <div className="dashboardLogo">
                <img src={dashLogo} alt="Dashlogo" />
              </div>
            </div>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <div className="listMainContainer">
            <div className="listContainer">
              <div className="firstLink">
                {toggle ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <DashboardIcon
                      sx={{ fontSize: "28px", cursor: "pointer" }}
                    />
                    <p>Dashboard</p>
                  </div>
                ) : (
                  <DashboardIcon sx={{ fontSize: "28px", cursor: "pointer" }} />
                )}
              </div>
              <div className="secondLink">
                {toggle ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <AddShoppingCartIcon
                      sx={{ fontSize: "28px", cursor: "pointer" }}
                    />
                    <p>Add Product</p>
                  </div>
                ) : (
                  <AddShoppingCartIcon
                    sx={{ fontSize: "28px", cursor: "pointer" }}
                  />
                )}
              </div>
              <div className="thirdLink">
                {toggle ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TableViewIcon
                      sx={{ fontSize: "28px", cursor: "pointer" }}
                    />
                    <p>View Product</p>
                  </div>
                ) : (
                  <TableViewIcon sx={{ fontSize: "28px", cursor: "pointer" }} />
                )}
              </div>
              <div className="fourthLink">
                {toggle ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <AutoFixHighIcon
                      sx={{ fontSize: "28px", cursor: "pointer" }}
                    />
                    <p>Edit Product</p>
                  </div>
                ) : (
                  <AutoFixHighIcon
                    sx={{ fontSize: "28px", cursor: "pointer" }}
                  />
                )}
              </div>
              <div className="fifthtLink">
                {toggle ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <DeleteIcon sx={{ fontSize: "28px", cursor: "pointer" }} />
                    <p>Delete Product</p>
                  </div>
                ) : (
                  <DeleteIcon sx={{ fontSize: "28px", cursor: "pointer" }} />
                )}
              </div>
              <div className="sixthLink">
                {toggle ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ShoppingCartIcon
                      sx={{ fontSize: "28px", cursor: "pointer" }}
                    />
                    <p>Total Orders</p>
                  </div>
                ) : (
                  <ShoppingCartIcon
                    sx={{ fontSize: "28px", cursor: "pointer" }}
                  />
                )}
              </div>
              <div className="seventhLink">
                {toggle ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PaidIcon sx={{ fontSize: "28px", cursor: "pointer" }} />
                    <p>Total Earnings</p>
                  </div>
                ) : (
                  <PaidIcon sx={{ fontSize: "28px", cursor: "pointer" }} />
                )}
              </div>
            </div>
          </div>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <AddProduct />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}></Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
