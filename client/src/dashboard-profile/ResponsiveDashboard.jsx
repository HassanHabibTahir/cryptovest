import * as React from "react";
import {
  AppBar,
  Drawer,
  Box,
  Toolbar,
  List,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import {
  AccessTime,
  Notifications,
  Menu,
  Dashboard,
} from "@mui/icons-material";
import { Link, NavLink, useLocation } from "react-router-dom";

import ProfileMenu from "./ProfileMenu";
import logo from "../assets/logo.png";

const drawerWidth = 240;
const sidebar = [
  {
    name: "Profile",
    Icon: Dashboard,
    url: "/ProfileDashboard/profile",
  },
  {
    name: "Statements",
    Icon: AccessTime,
    url: "/ProfileDashboard/statements",
  },
];
const styledactivelink = {
  borderRadius: "20px",
  color: "#000",

  background:
    "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
};
const navStyle = {
  display: "flex",
  paddingLeft: "30px",
  paddingTop: "10px",
  paddingBottom: "10px",
  marginTop: "10px",
  color: "inherit",
  textDecoration: "none",
};

function ResponsiveDrawer(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const matches = useMediaQuery("(max-width:900px)");
  const { pathname } = useLocation();

  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const drawer = (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <List
        sx={{
          mx: 2,
        }}
      >
        <Box align="center" my={3}>
          <Link to="/">
            <img src={logo} alt="logo" srcSet="" width="80px" />
          </Link>
        </Box>
        {sidebar.map(({ name, Icon, url }, index) => (
          <NavLink
            key={index}
            to={url}
            style={({ isActive }) => ({
              ...navStyle,
              ...(isActive ? styledactivelink : undefined),
            })}
            onClick={matches ? () => handleDrawerClose() : () => null}
          >
            <Icon />
            <Typography ml="20px" fontSize="18px">
              {name}
            </Typography>
          </NavLink>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            background: "#292929",
            py: 1,
          }}
        >
          <Toolbar>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box display="flex" alignItems="center">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerOpen}
                  sx={{ mr: 2, display: { md: "none" } }}
                >
                  <Menu />
                </IconButton>
                <Typography noWrap component="div">
                  {pathname === "/dashboard/trade/managment"
                    ? "Trade management"
                    : pathname.slice(11).replace(/^\w/, (c) => c.toUpperCase())}
                </Typography>
              </Box>
              <Box>
                <Box display="flex" gap={{ xs: "5px", sm: "10px", md: "15px" }}>
                  <IconButton
                    sx={{
                      padding: "10px",
                      background:
                        " linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
                    }}
                  >
                    <Notifications />
                  </IconButton>
                  <Box
                    sx={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderImage:
                        "linear-gradient(to top, #D09B03, #FEF9C8,  #D38D00 , #FFF8C4 ) 1",
                    }}
                  />
                  <ProfileMenu />
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                background:
                  "linear-gradient(180deg, rgba(34, 34, 34, 1) -12.28%, rgba(205, 165, 72, 1) 97.96%)",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                background:
                  "linear-gradient(180deg, rgba(34, 34, 34, 0) -12.28%, rgba(205, 165, 72, 0.67) 97.96%)",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              px: { xs: 1, sm: 2, md: 3 },
              py: 12,

              width: {
                xs: "100%",
              },
              height: "100%",
              zindex: "1 !important",
            }}
          >
            {props.children}
          </Box>
        </React.Suspense>
      </Box>
    </>
  );
}

export default ResponsiveDrawer;
