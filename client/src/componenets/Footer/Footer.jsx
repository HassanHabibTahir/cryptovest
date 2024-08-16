// import React, { useState } from "react";
import {
  Grid,
  List,
  ListItem,
  Typography,
  Box,
  // FormControl,
  // Select,
  // MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";

let fotterData = {
  Company: {
    "About Us": "/",
    Careers: "/",
    Affiliates: "/",
    Blog: "/",
    Press: "/",
    Security: "/",
    Investors: "/",
    Vendors: "/",
    "Legal & privacy": "/",
    "Cookie policy": "/",
    "Cookie Preferences": "/",
    "Digital Asset Disclosures": "/",
  },
  Individuals: {
    "Buy & Sell": "/",
    "Earn free crypto": "/",
    Wallet: "/",
    NFT: "/",
    Card: "/",
    Derivatives: "/",
    "Coinbase one": "/",
  },
  Support: {
    "Help Center": "/",
    "Contact Us": "/",
    "Create Account": "/",
    "ID Verification": "/",
    "Account Information": "/",
    "Payment Details": "/",
    "Account Access": "/",
    "Supported Crypto": "/",
    "Supported Countries": "/",
    Status: "/",
  },
  Learn: {
    "Ethereum Merge": "/",
    "Browse crypto prices": "/",
    "Crypto basics": "/",
    "Tips & tutorials": "/",
    "Market updates": "/",
    "What is Bitcoin?": "/",
    "What is crypto?": "/",
    "What is a blockchain?": "/",
    "How to set up a crypto wallet": "/",
    "How to send crypto": "/",
    Taxes: "/",
  },
  Businesses: {
    Institutional: "/",
    Prime: "/",
    "Asset Hub": "/",
    Commerce: "/",
  },
  Developers: {
    Cloud: "/",
    "Wallet SDK": "/",
    "Coinbase Pay SDK": "/",
    Node: "/",
    Commerce: "/",
    "Exchange & Pro": "/",
    "Sign in with Coinbase": "/",
    Rosetta: "/",
    Participate: "/",
    "Prime API": "/",
  },
};

const Footer = () => {
  // const [age, setAge] = useState("English");
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  return (
    <>
      <Box
        sx={{
          background:
            "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
          pt: "50px ",
          px: { xs: "20px", md: "80px" },
        }}
      >
        <Grid container spacing={3}>
          {Object.keys(fotterData).map((key, index) => {
            return (
              <Grid item xs={6} sm={6} md={2} key={index}>
                <Typography
                  sx={{
                    color: "#000",
                    fontFamily: "'Audiowide', cursive",
                    fontSize: "20px",
                    fontWeight: 400,
                    mb: "10px",
                  }}
                >
                  {key}
                </Typography>
                <List>
                  {Object.keys(fotterData[key]).map((key2, index2) => {
                    return (
                      <ListItem key={index2} sx={{ mb: "-10px", ml: "-12px" }}>
                        <Link
                          to={fotterData[key][key2]}
                          style={{
                            textDecoration: "none",
                            color: "#000",
                            fontSize: "16px",
                            fontFamily: "'Roboto', sans-serif",
                            fontWeight: 400,
                          }}
                        >
                          {key2}
                        </Link>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            );
          })}
        </Grid>
        <Box
          display="flex"
          pt="40px"
          pb="20px"
          gap="40px"
          alignItems="center"
          flexWrap="wrap"
        >
          <Box>
            <img src={logo} alt="logo" />
          </Box>
          {/* <FormControl
            sx={{
              color: "#000",
              background: "#fff",
              width: { xs: "100%", md: "20%" },
              borderRadius: "15px",
            }}
          >
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={age}
              onChange={handleChange}
              color="primary"
              small="true"
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
            </Select>
          </FormControl> */}
          <Typography color="#222222">
            © 2023 CryptoVest Blog•Twitter•Facebook
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
