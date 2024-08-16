import React from "react";

import { Box, Button, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import StripeCheckout from "react-stripe-checkout";

const PaymentMethod = ({ toggelModel }) => {
  // function onToken(token) {
  //   console.log(token);
  // }

  // eslint-disable-next-line operator-linebreak
  const publickey =
    "pk_test_51M7e66F81zpvQub2Jc6FHUwE9kNOdet1wzrlWftKkcYEZ1841W9w5AyP6OfsPBVOkivEEyBKj9Pb5nhSXLSduECt00UrAO28F9";

  return (
    <Box p={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Link Your Card</Typography>

        <Button sx={{}} onClick={toggelModel}>
          <CloseIcon sx={{ color: "white", fontSize: "35px" }} />
        </Button>
      </Box>
      <Divider color="#24262A" />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          my: 2,
        }}
      >
        {/* <StripeCard /> */}
        <StripeCheckout
          amount={100}
          currency="PKR"
          // token={onToken}
          stripeKey={publickey}
        >
          <Button>Pay Now</Button>
        </StripeCheckout>
      </Box>
      <Divider color="#24262A" />
      <Typography textAlign="center" variant="body1" my={2}>
        Learn about our buy/sell fees here
      </Typography>
    </Box>
  );
};

export default PaymentMethod;
