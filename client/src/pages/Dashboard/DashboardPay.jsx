import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { ArrowForward, Send } from "@mui/icons-material";
import DashboardPayTabs from "../../dashboard/DashboardPayTabs";
import BoxMain from "../../dashboard/BoxMain";
import { cryptogift } from "../../assets";
import ProgressHeader from "../../dashboard/ProgressHeader";
import Animation from "../../componenets/Animation";

const DashboardPay = () => {
  return (
    <Animation>
      <ProgressHeader />
      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={7}>
          <BoxMain sx={{ p: "0px !important" }}>
            <DashboardPayTabs />
          </BoxMain>
        </Grid>
        <Grid item xs={12} md={5}>
          <BoxMain
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography fontFamily="Audiowide">CRYPTO GIFTS</Typography>
              <Typography variant="subtitle">
                Give crypto to your friends and family
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mt={2}>
                <Typography variant="subtitle" fontWeight="600">
                  Get Started
                </Typography>
                <ArrowForward fontSize="small" />
              </Box>
            </Box>
            <img src={cryptogift} alt="crypto-gift" />
          </BoxMain>
          <BoxMain
            sx={{
              mt: 3,
              p: 2,
            }}
          >
            <Box>
              <Typography fontFamily="Audiowide">Recent Sends</Typography>
              <Typography variant="subtitle">
                Easily send to a recent destination
              </Typography>
              <Box align="center" width="100%">
                <Send fontSize="large" sx={{ color: "#E1AE3C", my: 2 }} />
                <Typography fontSize="12px">
                  After you send crypto, the destination will appear here
                </Typography>
              </Box>
            </Box>
          </BoxMain>
        </Grid>
      </Grid>
    </Animation>
  );
};

export default DashboardPay;
