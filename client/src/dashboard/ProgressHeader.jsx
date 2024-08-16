import React from "react";

import { Box, Typography } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";

import Tickicon from "./Tickicon";
import BoxMain from "./BoxMain";
import BorderLinearProgress from "./BorderLinearProgress";

const ProgressHeader = () => {
  return (
    <>
      <BoxMain
        columnGap={5}
        p={{ xs: 2, md: 3.5 }}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          rowGap: "20px",
          alignContent: "center",
          fontFamily: "Roboto",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tickicon text="You’re almost there, finish account setup" />
        <Box width={{ xs: "70%", md: "20%" }}>
          <BorderLinearProgress variant="determinate" value={50} />
        </Box>
        <Typography textAlign="center" mr={8}>
          2/4
        </Typography>
        <Box display="flex" alignItems="center" color="#D09B03">
          <Typography>Add a payment method</Typography>
          <KeyboardArrowRight />
        </Box>
      </BoxMain>
    </>
  );
};

export default ProgressHeader;
