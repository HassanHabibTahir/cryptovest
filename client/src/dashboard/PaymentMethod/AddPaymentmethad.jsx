import React from "react";

import { Box, Button, Divider, Typography } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CloseIcon from "@mui/icons-material/Close";
import StripeCheckout from "react-stripe-checkout";

const AddPaymentmethad = ({ toggelModel }) => {
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
        <Typography variant="h4">Add a payment method</Typography>

        <Button onClick={toggelModel}>
          <CloseIcon sx={{ color: "white", fontSize: "35px" }} />
        </Button>
      </Box>
      <Divider color="#24262A" />
      <StripeCheckout
        amount={100}
        currency="PKR"
        // token={onToken}
        stripeKey={publickey}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            my: 2,
            cursor: "pointer",
          }}
        >
          <CreditCardIcon sx={{ color: "#336BE3" }} />
          <Box>
            <Typography variant="h4" mb={1}>
              Credit/Debit Card
              <br />
              <span style={{ fontSize: "14px" }}>Buy and cash out</span>
            </Typography>
            <Typography color="#323B46" variant="body1">
              Use andy debit or credit card (Visa or Mastercard) to buy Crypto.
              Use a Visa debit card to cash out
            </Typography>
          </Box>
        </Box>
      </StripeCheckout>
      <Divider color="#24262A" />
      <Typography textAlign="center" variant="body1" my={2}>
        Learn about our buy/sell fees here
      </Typography>
    </Box>
  );
};

export default AddPaymentmethad;
