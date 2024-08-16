import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonMain } from "../componenets";
import Toastify from "../connectivityAssets/Toastify";

import BoxMain from "./BoxMain";

const TokenPriceVault = () => {
  const { userDbData } = useSelector((store) => store.global);
  const { token } = useParams();
  const navigate = useNavigate();
  let vault = token === "bitcoin" ? "BTC" : token === "solana" ? "SOL" : "ETH";
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  const checkSecondryMail = () => {
    if (userDbData?.secondaryEmail) {
      navigate(`/dashboard/vault-name-setup/${vault}`);
    } else {
      // Craete Wallet request gose here
      // navigate("/dashboard/add-secondry-email");
      navigate(`/dashboard/vault-name-setup/${vault}`);
    }
  };
  return (
    <BoxMain sx={{ mt: 3 }}>
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Box align="center">
        <Typography px={{ xs: 2, md: 10 }} my={3}>
          A vault is a great place to store your crypto for the long term.
          Features include time-delayed withdrawals, multiple approvers, and
          offline storage.
        </Typography>

        <ButtonMain sx={{ px: 4, py: 2 }} onClick={checkSecondryMail}>
          create vault
        </ButtonMain>

        <Typography color="#E1AE3C" my={3}>
          Learn more about vaults
        </Typography>
      </Box>
    </BoxMain>
  );
};

export default TokenPriceVault;
