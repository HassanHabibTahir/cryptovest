import React from "react";
import { Typography } from "@mui/material";
import { ButtonMain } from "../componenets";

import BoxMain from "./BoxMain";

const RecentTransction = () => {
  return (
    <BoxMain sx={{ textAlign: "center" }}>
      <ButtonMain
        disableTouchRipple
        sx={{
          width: "100%",
          fontSize: { xs: "15px", md: "17px" },
          py: { xs: "13px", md: "18px" },
          cursor: "default",
        }}
      >
        Recent Transactions
      </ButtonMain>
      <Typography sx={{ textAlign: "center", mt: "20px" }}>
        You don’t have any recent transactions. Ready to make a purchase?
      </Typography>
      <ButtonMain
        className="hvr-bounce-to-right"
        sx={{ mt: "20px", px: "40px" }}
      >
        Trade
      </ButtonMain>
    </BoxMain>
  );
};

export default RecentTransction;
