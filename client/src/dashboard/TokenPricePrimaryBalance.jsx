import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ArrowRight, PieChart } from "@mui/icons-material";
import BoxMain from "./BoxMain";
import { priceBTC } from "../assets";
import { ButtonMain } from "../componenets";
import DashboardPayTabs from "./DashboardPayTabs";

const TokenPricePrimaryBalance = () => {
  return (
    <Grid container columnSpacing={3} mt={3}>
      <Grid item xs={12} lg={7}>
        <BoxMain>
          <Box align="center">
            <img
              src={priceBTC}
              alt="bitcoin"
              width="130px"
              height="130px"
              style={{ opacity: "0.5", marginTop: "20px" }}
            />
            <Typography my={2} variant="h4">
              No transactions
            </Typography>
            <Typography px={{ xs: 2, md: 11 }}>
              Looks like there isn&#39;t any BTC in your account yet. Coinbase
              is the easiest place to get started.
            </Typography>
            <ButtonMain sx={{ px: 4, py: 2, mt: 5 }}> buy bitcoin</ButtonMain>
          </Box>
        </BoxMain>
      </Grid>
      <Grid item xs={12} lg={5}>
        <BoxMain sx={{ p: "0px !important" }} mt={{ xs: 3, lg: 0 }}>
          <DashboardPayTabs />
        </BoxMain>
        <BoxMain sx={{ p: "0px !important" }} mt={3}>
          <Box
            p={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "2px solid #E1AE3C",
            }}
          >
            <Typography sx={{ fontFamily: "Audiowide", fontWeight: "400" }}>
              Recurring buys
            </Typography>
            <Typography
              sx={{ fontSize: "13px", fontWeight: "400", color: "#E1AE3C" }}
            >
              Add new
            </Typography>
          </Box>
          <Box
            px={2}
            py={4}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box display="flex" alignItems="center">
              <PieChart />
              <Box ml={2}>
                <Typography fontWeight="600">
                  Learn about recurring buys
                </Typography>
                <Typography fontSize="12px">
                  Invest daily, Weekly, or Monthly
                </Typography>
              </Box>
            </Box>
            <ArrowRight fontSize="large" />
          </Box>
        </BoxMain>
      </Grid>
    </Grid>
  );
};

export default TokenPricePrimaryBalance;
