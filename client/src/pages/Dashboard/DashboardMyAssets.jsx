import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { ArrowRight, PieChart } from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ButtonMain from "../../componenets/ButtonMain";
import { currencybg } from "../../assets";
import Animation from "../../componenets/Animation";

const DasboardMyAssets = () => {
  const { userDbData } = useSelector((store) => store.global);

  return (
    <Animation>
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={7}>
            <Box
              px={{ xs: 2, sm: 5 }}
              py={8}
              sx={{
                backgroundImage: `url(${currencybg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              <Typography variant="h3" fontFamily="Roboto">
                Total balance
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>PKR 0.00</Typography>
              <Typography variant="h3" fontFamily="Roboto" mt={3}>
                USDT balance
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>
                {`$ ${userDbData?.usdtBalance}`}
              </Typography>
              <Box align="center" mt={7} mb={5}>
                <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
                  Get started with crypto
                </Typography>
                <Typography pb={1} sx={{ fontSize: "13px", fontWeight: "300" }}>
                  Your crypto assets will appear here.
                </Typography>
                <ButtonMain
                  component={Link}
                  to="/dashboard/trade"
                  className="hvr-bounce-to-right"
                  sx={{ px: 2 }}
                >
                  Explore assets
                </ButtonMain>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={5}>
            <Box
              sx={{
                clipPath:
                  "polygon(5% 0, 96% 0, 100% 2%, 100% 96%, 96% 100%, 5% 100%, 0 96%, 0 2%)",
              }}
            >
              <Box
                p={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background:
                    "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
                }}
              >
                <Typography
                  color="#000"
                  sx={{ fontFamily: "Audiowide", fontWeight: "400" }}
                >
                  Recurring buys
                </Typography>
                <Typography
                  color="#000"
                  sx={{ fontSize: "13px", fontWeight: "400" }}
                >
                  Add new
                </Typography>
              </Box>
              <Box
                px={{ xs: 1, sm: 5 }}
                py={6}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "2px solid transparent",

                  background:
                    "linear-gradient( #4C473D,#84692B) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Animation>
  );
};

export default DasboardMyAssets;
