import React from "react";

import { Box, Grid, Typography } from "@mui/material";

import { coinbasenft, lens2, trustcardbg } from "../../assets";
import BoxMain from "../../dashboard/BoxMain";
import ProgressHeader from "../../dashboard/ProgressHeader";
import Animation from "../../componenets/Animation";

const carddata = [
  {
    img: coinbasenft,
    title: "Coinbase NFT",
    description: "Collect",
    rating: "4.6",
  },
  {
    img: lens2,
    title: "Lens Protocol",
    description: "Social",
    rating: "3.4",
  },
  {
    img: coinbasenft,
    title: "Dedo",
    description: "Swap",
    rating: "3.4",
  },
  {
    img: coinbasenft,
    title: "Dedo",
    description: "Swap",
    rating: "3.4",
  },
  {
    img: coinbasenft,
    title: "Dedo",
    description: "Swap",
    rating: "3.4",
  },
];

const Card = ({ img, title, description, rating }) => {
  return (
    <Box
      sx={{
        background: `url(${trustcardbg})`,
        backgroundSize: "100% 100%",
        py: "15px",
        px: "30px",
        height: "100%",
      }}
    >
      <img
        src={img}
        style={{
          marginTop: "20px",
        }}
        alt="coin"
      />
      <Typography fontWeight={600} my="10px">
        {title}
      </Typography>
      <Typography component="span" fontSize="14px" mt="10px">
        {description}
      </Typography>
      <Typography component="span" ml={2}>
        {rating}
      </Typography>
    </Box>
  );
};

const DashboardWeb3 = () => {
  return (
    <Animation>
      <ProgressHeader />

      <BoxMain p={3.5} mt={3.7}>
        <Typography variant="h4">New and Trending</Typography>
        <Grid container spacing={2} mt={3}>
          {carddata.map((item, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={i}>
                <Box width="100%" height="100%">
                  <Card {...item} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </BoxMain>
    </Animation>
  );
};

export default DashboardWeb3;
