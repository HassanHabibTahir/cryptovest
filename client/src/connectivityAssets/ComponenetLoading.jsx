import { Box, CircularProgress, circularProgressClasses } from "@mui/material";
import React from "react";

const ComponenetLoading = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justyfyContent: "center",
        flexGrow: 1,
        background: "#222222",
      }}
    >
      <CircularProgress
        sx={{
          color: "#D09B03",
          animationDuration: "550ms",

          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
      />
    </Box>
  );
};

export default ComponenetLoading;
