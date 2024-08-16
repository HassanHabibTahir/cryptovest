import * as React from "react";
import {
  AppBar,
  Drawer,
  Box,
  Toolbar,
  List,
  Typography,
  Hidden,
  IconButton,
  useMediaQuery,
  // FormControl,
  // Select,
  // MenuItem,
} from "@mui/material";
import {
  AccessTime,
  // CurrencyExchange,
  // Language,
  // Payments,
  // MoreVert,
  BarChart,
  Notifications,
  // BusinessCenter,
  Menu,
  Dashboard,
  AccountCircle,
  // PlaylistAddCheck,
} from "@mui/icons-material";
import {
  Link,
  NavLink,
  // , useLocation
} from "react-router-dom";

// import ButtonMain from "../componenets/ButtonMain";
import ButtonBorder from "../componenets/ButtonBorder";
import HeaderBtnMenu from "./HeaderBtnMenu";
import ProfileMenu from "./ProfileMenu";
import logo from "../assets/logo.png";
// import BuyAndSellModal from "./modals/BuyAndSellModal";
import SendAndReceiveModal from "./modals/SendAndReceiveModal";

const drawerWidth = 240;
const sidebar = [
  {
    name: "Home",
    Icon: Dashboard,
    url: "/dashboard/home",
  },
  {
    name: "My assets",
    Icon: AccessTime,
    url: "/dashboard/my-assets",
  },
  {
    name: "Trade",
    Icon: BarChart,
    url: "/dashboard/trade",
  },
  // {
  //   name: "Earn",
  //   Icon: CurrencyExchange,
  //   url: "/dashboard/earn",
  // },
  // {
  //   name: "Web3",
  //   Icon: Language,
  //   url: "/dashboard/web3",
  // },
  // {
  //   name: "Pay",
  //   Icon: Payments,
  //   url: "/dashboard/pay",
  // },
  {
    name: "Profile",
    Icon: AccountCircle,
    url: "/dashboard/profile",
  },
  // {
  //   name: "Statements",
  //   Icon: PlaylistAddCheck,
  //   url: "/dashboard/statements",
  // },
  // {
  //   name: "More",
  //   Icon: MoreVert,
  //   url: "/dashboard/more",
  // },
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
const footer = ["Home", "Careers", "Legal & Privacy"];

function ResponsiveDrawer(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const [language, setLanguage] = React.useState("English");
  const [openBuy, setOpenBuy] = React.useState(false);
  const [openSend, setOpenSend] = React.useState(false);

  const toggelBuyModel = () => {
    setOpenBuy(!openBuy);
  };
  const toggelSendModel = () => {
    setOpenSend(!openSend);
  };

  // const handleChange = (event) => {
  //   setLanguage(event.target.value);
  // };
  const matches = useMediaQuery("(max-width:900px)");
  // const { pathname } = useLocation();

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
              ...(isActive ? styledactivelink : null),
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
      {/* <ButtonMain sx={{ mb: 3, mx: 2, py: 1.5 }}>
        <Box display="flex" alignItems="center">
          <BusinessCenter fontSize="large" sx={{ color: "#000" }} />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            ml={2}
          >
            <Typography fontWeight="600" fontSize="14px">
              GET PKR 2,768.4
            </Typography>
            <Typography fontSize="11px" textTransform="none">
              Invite Friends
            </Typography>
          </Box>
        </Box>
      </ButtonMain> */}
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* <BuyAndSellModal
          open={openBuy}
          setOpen={setOpenBuy}
          toggelModel={toggelBuyModel}
        /> */}
        <SendAndReceiveModal
          open={openSend}
          setOpen={setOpenSend}
          toggelModel={toggelSendModel}
        />
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
                  <Menu sx={{ color: "#fff" }} />
                </IconButton>
                {/* <Typography noWrap component="div" color="#fff">
                  {pathname === "/dashboard/trade/managment"
                    ? "Trade management"
                    : pathname.slice(11).replace(/^\w/, (c) => c.toUpperCase())}
                </Typography> */}
              </Box>
              <Box>
                <Box display="flex" gap={{ xs: "5px", sm: "10px", md: "15px" }}>
                  <Hidden mdDown>
                    {/* <ButtonMain
                      className="hvr-bounce-to-right"
                      sx={{ px: 2 }}
                      onClick={toggelBuyModel}
                    >
                      Buy & sell
                    </ButtonMain> */}
                    <ButtonBorder
                      className="hvr-bounce-to-right-sign"
                      sx={{ px: 2 }}
                      onClick={toggelSendModel}
                    >
                      Send & receive
                    </ButtonBorder>
                  </Hidden>
                  <IconButton
                    sx={{
                      color: "#000",
                      padding: "10px",
                      background:
                        " linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
                    }}
                  >
                    <Notifications />
                  </IconButton>
                  <Hidden mdUp>
                    <HeaderBtnMenu
                      toggelBuyModel={toggelBuyModel}
                      toggelSendModel={toggelSendModel}
                    />
                  </Hidden>
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
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              width: "100%",
            }}
          >
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                px: { xs: 1, sm: 2, md: 3 },
                pt: 12,
                pb: 5,

                width: {
                  xs: "100%",
                },
                height: "100%",
                zindex: "1 !important",
              }}
            >
              {props.children}
            </Box>
            {/* footer */}
            <Box
              sx={{
                p: 2,
                width: "100%",
                borderTop: "1px solid #E1AE3C",
                marginTop: "auto",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" alignItems="center">
                <Box
                  display="flex"
                  columnGap={{ xs: "10px", lg: "20px" }}
                  alignItems="center"
                >
                  {footer.map((data, i) => (
                    <Link
                      key={i}
                      to="/"
                      style={{
                        textDecoration: "none",
                        color: "#E1AE3C",
                        fontSize: "14px",
                      }}
                    >
                      {data}
                    </Link>
                  ))}
                </Box>
                <Typography ml={{ xs: 2, sm: 1, lg: 3 }} fontSize="14px">
                  © 2023 Cryptovest
                </Typography>
              </Box>
              {/* <Box
                display="flex"
                columnGap={{ xs: "10px", lg: "20px" }}
                alignItems="center"
                mt={{ xs: 2, sm: 0 }}
              >
                <FormControl
                  size="small"
                  sx={{
                    color: "#000",
                    background: "#fff",
                    width: { xs: "200px", sm: "150px", md: "200px" },
                    borderRadius: "15px",
                  }}
                >
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    color="primary"
                    small="true"
                    value={language}
                    onChange={handleChange}
                    sx={{
                      color: "#000",
                      borderRadius: "15px",
                    }}
                  >
                    <MenuItem
                      value="English"
                      sx={{
                        color: "black",
                      }}
                    >
                      English
                    </MenuItem>
                    <MenuItem
                      value="Urdu"
                      sx={{
                        color: "black",
                      }}
                    >
                      Urdu
                    </MenuItem>
                  </Select>
                </FormControl>
                <ButtonMain
                  className="hvr-bounce-to-right"
                  s
                  sx={{ fontSize: "12px" }}
                >
                  need help?
                </ButtonMain>
              </Box> */}
            </Box>
          </Box>
        </React.Suspense>
      </Box>
    </>
  );
}

export default ResponsiveDrawer;
