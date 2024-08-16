import React from "react";

import { Box, Container, Grid, IconButton, Typography } from "@mui/material";

import { Shield, SaveAs, Factory, ArrowForward } from "@mui/icons-material";

import HeadingTwo from "./HeadingTwo";

import cardbg from "../assets/trustCardBg.png";

const cardArray = [
  {
    icon: (
      <Shield className="hithere" sx={{ color: "black", fontSize: "35px" }} />
    ),
    heading: "Secure storage",
    text: " We store the vast majority of the digital assets in secure offline storage.",
    next: " Learn how Coinbase keeps your funds safe and secure ",
  },
  {
    icon: (
      <SaveAs className="hithere" sx={{ color: "black", fontSize: "35px" }} />
    ),
    heading: "Protected by insurance",
    text: " Coinbase maintains crypto insurance and  all USD cash balances are covered by  FDIC insurance, up to a maximum of $250,000.",
    next: " Learn how your crypto is covered by ourinsurance policy ",
  },
  {
    icon: (
      <Factory className="hithere" sx={{ color: "black", fontSize: "35px" }} />
    ),
    heading: "Industry best practices",
    text: " Coinbase supports a variety of the most popular digital currencies.",
    next: " Learn how we implement industry best  practices for security account ",
  },
];

const Card = ({ Icon, heading, text, next }) => {
  return (
    <Box
      sx={{
        background: `url(${cardbg})`,
        backgroundSize: "100% 100%",
        py: "35px",
        px: "20px",
        textAlign: "center",
        height: "370px",
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "111px",
            height: "111px",
            background:
              "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
            borderRadius: "50%",
            transformOrigin: "0 0",
            transition: "1s",
            "&:hover": {
              background: "white",
            },
          }}
        >
          <IconButton>{Icon}</IconButton>
        </Box>
      </Box>
      <Typography mt="30px" variant="h4" textAlign="center">
        {heading}
      </Typography>
      <Typography mt="15px" variant="gery" textAlign="center">
        {text}
      </Typography>
      <br />
      <Typography
        mt="17px"
        variant="geryBold"
        textAlign="center"
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "#fff",
          },
        }}
      >
        {next}
        <ArrowForward sx={{ fontSize: "16px", mb: "-4px" }} />
      </Typography>
    </Box>
  );
};

const TrustedCrypto = () => {
  return (
    <Box py="50px">
      <Container maxWidth="lg">
        <div data-aos="fade-right" data-aos-duration="1000">
          <HeadingTwo text="The most trusted cryptocurrency platform" />
        </div>
        <div data-aos="fade-left" data-aos-duration="1000">
          <Typography
            textAlign="center"
            sx={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: "20px",
              color: "#FFFFFF",
            }}
            mt="3px"
          >
            Here are a few reasons why you should choose Coinbase
          </Typography>
        </div>
        <Grid container spacing={8} mt="50px">
          {cardArray.map(({ icon, heading, text, next }, i) => (
            <Grid item md={4} sm={6} xs={12} key={i}>
              <div
                data-aos={
                  i === 0
                    ? "fade-right"
                    : i === 1
                    ? "fade-up"
                    : i === 2
                    ? "fade-left"
                    : null
                }
                data-aos-duration="3000"
              >
                <Card Icon={icon} heading={heading} text={text} next={next} />
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TrustedCrypto;
