import { CheckCircleRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

const Tickicon = ({ text, mt }) => {
  return (
    <Box
      display="flex"
      gap={{ xs: "10px", md: "20px" }}
      mt={mt}
      alignItems="center"
    >
      <CheckCircleRounded
        sx={{
          color: "#D09B03",
        }}
      />
      <Typography px="2">{text}</Typography>
    </Box>
  );
};

export default Tickicon;
