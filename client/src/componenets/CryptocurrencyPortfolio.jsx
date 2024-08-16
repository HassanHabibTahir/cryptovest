import React from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PersonPinCircleSharpIcon from "@mui/icons-material/PersonPinCircleSharp";
import PhoneAndroidSharpIcon from "@mui/icons-material/PhoneAndroidSharp";

import portfolio from "../images/portfolio.png";
import HeadingTwo from "./HeadingTwo";

let data = [
  {
    icon: <InsertChartIcon />,
    heading: "Manage your portfolio",
    text: "Buy and sell popular digital currencies, keep track of them in the one place.",
  },
  {
    icon: <EventAvailableIcon />,
    heading: "Recurring buys",
    text: "Invest in cryptocurrency slowly over time by scheduling buys daily, weekly, or monthly.",
  },
  {
    icon: <PersonPinCircleSharpIcon />,
    heading: "Vault protection",
    text: "For added security, store your funds in a vault with time delayed withdrawals.",
  },
  {
    icon: <PhoneAndroidSharpIcon />,
    heading: "Mobile apps",
    text: "Stay on top of the markets with the Coinbase app for Android or iOS.",
  },
];
const CryptocurrencyPortfolio = () => {
  return (
    <Container maxWidth="lg" sx={{ px: 3 }}>
      <Box my={10}>
        <div data-aos="fade-right" data-aos-duration="1000">
          <HeadingTwo text="Create your cryptocurrency portfolio today" />
        </div>
        <div data-aos="fade-left" data-aos-duration="1000">
          <Typography
            align="center"
            sx={{ fontSize: "20px", fontWeight: "400", fontFamily: "Roboto" }}
          >
            Coinbase has a variety of features that make it the best place to
            start trading.
          </Typography>
        </div>
        <Grid container alignItems="center" spacing={5} mt={1}>
          <Grid item xs={12} md={5}>
            {data.map(({ icon, heading, text }, index) => (
              <Box
                display="flex"
                alignItems="center"
                key={index}
                my={{ xs: 3, lg: 5 }}
              >
                <Box
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  // className="swing"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minWidth: { xs: "70px", lg: "89px" },
                    minHeight: { xs: "70px", lg: "89px" },
                    borderRadius: "50%",
                    background:
                      "linear-gradient(270deg, #805310 0%, #A37A1E 0.01%, #D3A84C 13.96%, #FFEC95 30.84%, #E6BE69 50%, #FFD87B 68.51%, #B58F3E 86.36%, #936E13 100%)",
                  }}
                >
                  <Box
                    sx={{
                      color: "#000000",
                      "& .css-i4bv87-MuiSvgIcon-root": {
                        fontSize: { xs: "30px", lg: "40px" },
                      },
                    }}
                  >
                    {icon}
                  </Box>
                </Box>
                <Box ml={2}>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontFamily: "Audiowide",
                      fontSize: { xs: "18px", lg: "24px" },
                    }}
                  >
                    {heading}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "400",
                      fontSize: { xs: "14px", lg: "18px" },

                      fontFamily: "Roboto",
                      lineHeight: "27px",
                    }}
                  >
                    {text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12} md={7}>
            <div data-aos="zoom-in-left" data-aos-duration="1500">
              <img src={portfolio} alt="not found" srcSet="" width="100%" />
            </div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CryptocurrencyPortfolio;
