import { ErrorOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { ButtonMain } from "../componenets";

import TabsButton from "./TabsButton";

const IDVerification = () => {
  return (
    <Box align="center" p={{ xs: "20px", md: "30px" }}>
      <ErrorOutline sx={{ fontSize: "100px", mt: 4 }} />
      <Typography variant="h4" my={1}>
        Identity Verification Required
      </Typography>
      <Typography>
        You`re almost ready to trade. Please verify your personal information
      </Typography>
      <ButtonMain sx={{ py: 2, width: "100%", mt: 4 }}>
        Verify your id
      </ButtonMain>
    </Box>
  );
};

const btnName = [
  {
    name: "Buy",
    Component: IDVerification,
  },
  {
    name: "Sell",
    Component: IDVerification,
  },
  {
    name: "Convert",
    Component: IDVerification,
  },
];

const BuyAndSell = () => {
  return <TabsButton btnName={btnName} />;
};

export default BuyAndSell;
