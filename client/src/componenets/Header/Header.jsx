import React from "react";
import { NavLink, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  useMediaQuery,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import logo from "../../assets/logo.png";
import ButtonMain from "../ButtonMain";
import { setIsLoggedIn, setUserDbData } from "../../slices";

const sideArray = [
  { name: "Explore ", to: "/" },
  { name: "Dashboard ", to: "/dashboard/" },
  // { name: "Learn", to: "/learn" },
  // { name: "Individuals", to: "/individuals" },
  // { name: "Businesses", to: "/business" },
  // { name: "Developers ", to: "/developers" },
  // { name: "Company", to: "/company" },
];

const textGraident = {
  background:
    "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
};
const navStyle = {
  textDecoration: "none",
  fontFamily: "Roboto sans-serif",
  fontWeight: 500,
  fontSize: "16px",
  transition: "0.4s",
  color: "#fff",
};
const Header = () => {
  const matches = useMediaQuery("(max-width:1000px)");
  const dispatch = useDispatch();
  const { userDbData } = useSelector((store) => store.global);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = React.useCallback((event) => {
    setAnchorElNav(event.currentTarget);
  }, []);

  const handleCloseNavMenu = React.useCallback(() => {
    setAnchorElNav(null);
  }, []);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(setUserDbData(null));
    dispatch(setIsLoggedIn(false));
  };
  return (
    <>
      <Box pt="7px" pb={{ xs: "10px", md: "20px" }} backgroundColor="#292929">
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center" backgroundColor="#292929">
            <Link to="/">
              <Box>
                <img width="100%" src={logo} alt="logo" />
              </Box>
            </Link>

            {matches ? (
              <Box
                display={matches ? "flex" : "none"}
                flexGrow={1}
                justifyContent="flex-end"
              >
                {anchorElNav === null ? (
                  <IconButton
                    size="large"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleOpenNavMenu}
                  >
                    <MenuIcon sx={{ color: "white", fontSize: "30px" }} />
                  </IconButton>
                ) : (
                  <IconButton
                    size="large"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleCloseNavMenu}
                  >
                    <CloseIcon sx={{ color: "white", fontSize: "30px" }} />
                  </IconButton>
                )}

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={anchorElNav}
                  onClose={handleCloseNavMenu}
                  sx={{
                    ml: "15px",
                    "& .MuiPaper-root": {
                      backgroundColor: "#2A3539",
                      color: "white",
                      width: "80%",
                    },
                  }}
                >
                  {sideArray.map(({ name, to }, i) => (
                    <MenuItem key={i} onClick={handleCloseNavMenu}>
                      <NavLink
                        className="cool-link"
                        key={to + name}
                        to={to}
                        style={({ isActive }) => ({
                          ...navStyle,
                          ...(isActive ? textGraident : undefined),
                          "& .hover": {
                            borderBottom: "2px soild white",
                          },
                        })}
                      >
                        {name}
                      </NavLink>
                    </MenuItem>
                  ))}
                  {!userDbData ? (
                    <>
                      {" "}
                      <MenuItem>
                        <ButtonMain
                          className="hvr-bounce-to-right-sign"
                          component={Link}
                          to="/sign-in"
                          sx={{
                            py: "8px",
                            px: "25px",
                            color: "white",
                            background:
                              "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",
                            borderRadius: "15px",
                            border: "2px solid transparent",
                          }}
                        >
                          Sign in
                        </ButtonMain>
                      </MenuItem>
                      {/* <MenuItem>
                        <ButtonMain
                          className="hvr-bounce-to-right"
                          sx={{
                            py: "10px",
                            px: "15px",
                          }}
                        >
                          GET STARTED
                        </ButtonMain>
                      </MenuItem> */}
                    </>
                  ) : (
                    <>
                      <MenuItem>
                        <ButtonMain
                          className="hvr-bounce-to-right-sign"
                          sx={{
                            py: "8px",
                            px: "25px",
                            color: "white",
                            background:
                              "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",
                            borderRadius: "15px",
                            border: "2px solid transparent",
                          }}
                        >
                          {userDbData?.firstName}
                        </ButtonMain>
                      </MenuItem>
                      <MenuItem>
                        <ButtonMain
                          className="hvr-bounce-to-right"
                          sx={{
                            py: "10px",
                            px: "15px",
                          }}
                          onClick={handleLogOut}
                        >
                          LogOut
                        </ButtonMain>
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </Box>
            ) : (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                flexGrow={1}
                columnGap="7px"
                alignItems="center"
              >
                {sideArray.map(({ name, to }, i) => {
                  return (
                    <Box mr={{ md: 2.5, lg: 4 }} key={i}>
                      <NavLink
                        to={to}
                        className="cool-link"
                        style={({ isActive }) => ({
                          ...navStyle,
                          ...(isActive ? textGraident : undefined),
                        })}
                      >
                        {name}
                      </NavLink>
                    </Box>
                  );
                })}
                {!userDbData ? (
                  <>
                    {" "}
                    <ButtonMain
                      className="hvr-bounce-to-right-sign"
                      component={Link}
                      to="/sign-in"
                      sx={{
                        py: "8px",
                        px: "25px",
                        color: "white",
                        background:
                          "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",
                        borderRadius: "15px",
                        border: "2px solid transparent",
                      }}
                    >
                      Sign in
                    </ButtonMain>
                    {/* <ButtonMain
                      className="hvr-bounce-to-right"
                      sx={{
                        py: "10px",
                        px: "15px",
                      }}
                    >
                      GET STARTED
                    </ButtonMain> */}
                  </>
                ) : (
                  <>
                    <ButtonMain
                      className="hvr-bounce-to-right-sign"
                      sx={{
                        py: "8px",
                        px: "25px",
                        color: "white",
                        background:
                          "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",
                        borderRadius: "15px",
                        border: "2px solid transparent",
                      }}
                    >
                      {userDbData?.firstName}
                    </ButtonMain>
                    <ButtonMain
                      className="hvr-bounce-to-right"
                      sx={{
                        py: "10px",
                        px: "15px",
                      }}
                      onClick={handleLogOut}
                    >
                      LogOut
                    </ButtonMain>
                  </>
                )}
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Header;
