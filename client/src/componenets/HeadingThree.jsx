import { Typography } from "@mui/material";
import React from "react";

const HeadingThree = ({ text }) => {
  return (
    <Typography
      variant="h3"
      sx={{
        background:
          "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textFillColor: "transparent",
      }}
    >
      {text}
    </Typography>
  );
};

export default HeadingThree;
