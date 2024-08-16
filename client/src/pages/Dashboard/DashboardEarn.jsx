import React from "react";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import { Percent, Lock, ArrowForward } from "@mui/icons-material";

import { HeadingThree, ButtonMain } from "../../componenets";
import BoxMain from "../../dashboard/BoxMain";

import { bulb, coin, bitcoin } from "../../assets";
import Animation from "../../componenets/Animation";

const table = [
  {
    image: bitcoin,
    name: "Cosmos",
    text: "Earns 6.12% APY",
    button: "Buy",
  },
  {
    image: bitcoin,
    name: "Cosmos",
    text: "Earns 6.12% APY",
    button: "Buy",
  },
  {
    image: bitcoin,
    name: "Cosmos",
    text: "Earns 6.12% APY",
    button: "Buy",
  },
  {
    image: bitcoin,
    name: "Cosmos",
    text: "Earns 6.12% APY",
    button: "Buy",
  },
  {
    image: bitcoin,
    name: "Cosmos",
    text: "Earns 6.12% APY",
    button: "Buy",
  },
  {
    image: bitcoin,
    name: "Cosmos",
    text: "Earns 6.12% APY",
    button: "Buy",
  },
];

const DashboardEarn = () => {
  return (
    <Animation>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <BoxMain sx={{ p: 4, height: "100%" }}>
            <Box align="center">
              <HeadingThree text=" Ready to Earn?" />
              <Divider
                sx={{
                  width: { xs: "160px", md: "200px" },
                  background:
                    "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
                  height: "2px",
                  mt: 1,
                }}
              />
            </Box>
            <Grid
              container
              columnSpacing={{ xs: 10, lg: 15 }}
              px={{ xs: 0, lg: 8 }}
              mt={4}
            >
              <Grid item xs={12} md={6}>
                <Box align="center">
                  <IconButton
                    sx={{
                      background:
                        "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
                    }}
                  >
                    <Percent sx={{ color: "#000" }} />
                  </IconButton>
                  <Typography fontSize="18px" py={1}>
                    Earn upto 6.12% APY
                  </Typography>
                  <Typography fontSize="14px">
                    Earn on ETH, USDC, SOL, ADA, ATOM and more
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box align="center" mt={{ xs: 3, md: 0 }}>
                  <IconButton
                    sx={{
                      background:
                        "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
                    }}
                  >
                    <Lock sx={{ color: "#000" }} />
                  </IconButton>
                  <Typography fontSize="18px" py={1}>
                    Earn Securely
                  </Typography>
                  <Typography fontSize="14px">
                    We take measures to mitigate risks and allow you to opt-out
                    anytime
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </BoxMain>
        </Grid>
        <Grid item xs={12} md={4}>
          <BoxMain sx={{ height: "100%", padding: "0px !important" }}>
            <Box
              p={2}
              sx={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                background:
                  "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
              }}
            >
              <Typography
                align="center"
                color="#000"
                sx={{ fontFamily: "Audiowide", fontWeight: "400" }}
              >
                need Help?
              </Typography>
            </Box>
            <Box
              py={3}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img src={bulb} alt="bulb" width="100px" />
              <Box display="flex" alignItems="center" gap={2} mt={1.5}>
                <Typography>Read our FAQ</Typography>
                <ArrowForward fontSize="small" />
              </Box>
            </Box>
          </BoxMain>
        </Grid>
        <Grid item xs={12}>
          <BoxMain sx={{ px: { xs: 1, md: 4 }, py: 4 }}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems={{ xs: "center", md: "start" }}
            >
              <HeadingThree text="Your Earnings" />
              <Divider
                sx={{
                  width: { xs: "160px", md: "190px" },
                  background:
                    "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
                  height: "2px",
                  mt: 1,
                }}
              />
            </Box>
            <Box
              mt={3}
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                display="flex"
                gap={3}
                alignItems="center"
                mb={{ xs: 3, sm: 0 }}
              >
                <img src={coin} alt="coin" />
                <Box>
                  <Typography fontSize="18px">Learn About Yeild</Typography>
                  <Typography fontSize="14px">
                    See How We Calculate Yield
                  </Typography>
                </Box>
              </Box>
              <ButtonMain
                className="hvr-bounce-to-right"
                sx={{ px: 3, py: 1.5 }}
              >
                <Box display="flex" alignItems="center">
                  <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                    LEARN
                  </Typography>
                  <ArrowForward fontSize="small" />
                </Box>
              </ButtonMain>
            </Box>
          </BoxMain>
        </Grid>
        <Grid item xs={12}>
          <BoxMain sx={{ p: { xs: 1, md: 4 } }}>
            <BoxMain sx={{ p: 2 }}>
              <Typography fontSize="18px">Buy New Earning Assets</Typography>
              <Typography fontSize="14px">
                Earn by holding eligible assets, or enroll with a couple of
                clicks. Start with as little as $ 1.
              </Typography>
            </BoxMain>

            <Box my={2}>
              {table.map(({ image, name, text, button }, ind) => (
                <Box
                  py={1}
                  key={ind}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderTop={ind !== 0 && "2px solid #D09B03"}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <img src={image} alt="bitcoin" width="40px" height="40px" />
                    <Box>
                      <Typography fontSize="18px">{name}</Typography>
                      <Typography sx={{ color: "#22F49C" }}>{text}</Typography>
                    </Box>
                  </Box>
                  <ButtonMain
                    className="hvr-bounce-to-right"
                    sx={{
                      textTransform: "none",
                      px: { xs: 2, md: 6 },
                      py: { xs: 0, md: 1.2 },
                    }}
                  >
                    {button}
                  </ButtonMain>
                </Box>
              ))}
            </Box>
          </BoxMain>
        </Grid>
      </Grid>
    </Animation>
  );
};

export default DashboardEarn;
