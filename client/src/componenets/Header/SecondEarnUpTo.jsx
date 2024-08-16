import React from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import earnbg2 from "../../images/earnbg2.png";
import ButtonMain from "../ButtonMain";

const SecondEarnUpTo = () => {
  return (
    <Container maxWidth="lg" sx={{ px: 3, mb: 5 }}>
      <Grid container alignItems="center" my={5} spacing={5}>
        <Grid item xs={12} md={6} lg={7}>
          <Box pr={{ xs: 0, lg: 17 }}>
            <div data-aos="zoom-in-left" data-aos-duration="2000">
              <Typography variant="h1">
                Earn up to $28 worth of crypto
              </Typography>
            </div>
            <div data-aos="fade-right" data-aos-duration="2000">
              <Typography
                py={3}
                sx={{ fontSize: "16px", fontFamily: "Roboto " }}
              >
                Discover how specific cryptocurrencies work — and get a bit of
                each crypto to try out for yourself. Start earning
              </Typography>
            </div>
            <div data-aos="zoom-in-right" data-aos-duration="2000">
              <ButtonMain
                className="hvr-bounce-to-right"
                sx={{ px: 4, py: 1.8, fontWeight: "bold" }}
              >
                Start Earning
              </ButtonMain>
            </div>
          </Box>
        </Grid>
        <Grid item md={6} lg={5} xs={12}>
          <Box>
            <img
              className="img_moving "
              src={earnbg2}
              alt="not found"
              srcSet=""
              width="100%"
            />
          </Box>
        </Grid>
      </Grid>
      <div data-aos="fade-up" data-aos-duration="2000">
        <Typography
          align="center"
          px={{ xs: 0, md: 10, lg: 18 }}
          sx={{ fontSize: "20px", fontWeight: "500", fontFamily: "Roboto" }}
        >
          *Upon purchase of USDC, you will be automatically opted in to rewards.
          If you’d like to opt out or learn more about rewards, you can click
          here. The rewards rate is subject to change and can vary by region.
          Customers will be able to see the latest applicable rates directly
          within their accounts.
        </Typography>
      </div>
    </Container>
  );
};

export default SecondEarnUpTo;
