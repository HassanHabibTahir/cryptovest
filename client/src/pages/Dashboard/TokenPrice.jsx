/* eslint-disable indent */
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import { useSelector } from "react-redux";

import { ArrowBack } from "@mui/icons-material";
import { Solana, bitcoin, Ethereum } from "../../assets";
// import Ethereum from "../images/Ethereum.png";

import BoxMain from "../../dashboard/BoxMain";
import { ButtonBorder, ButtonMain } from "../../componenets";
import TabsButton from "../../dashboard/TabsButton";
// eslint-disable-next-line import/no-cycle
import {
  Addcoin,
  TokenPriceOverview,
  TokenPricePrimaryBalance,
  TokenPriceVault,
} from "../../dashboard";

// eslint-disable-next-line consistent-return
const Componenet = () => {
  const { userDbData } = useSelector((store) => store.global);
  const { token } = useParams();

  if (token === "bitcoin") {
    return userDbData?.btcVault ? (
      <Addcoin vaultType="btcVault" />
    ) : (
      <TokenPriceVault />
    );
  }

  if (token === "solana") {
    return userDbData?.solVault ? (
      <Addcoin vaultType="solVault" />
    ) : (
      <TokenPriceVault />
    );
  }

  if (token === "ethereum") {
    return userDbData?.ethVault ? (
      <Addcoin vaultType="ethVault" />
    ) : (
      <TokenPriceVault />
    );
  }
};

const TokenPrice = () => {
  // const { data, refetch, isUninitialized } = useDepositEthQuery({
  //   // skip: true,
  // });
  const [isWatching, setIsWatching] = useState(true);

  const { token } = useParams();
  console.log(token, "typw");

  const btnName = [
    {
      name: "Overview",
      Component: TokenPriceOverview,
    },
    {
      name: "Primary balance",
      Component: TokenPricePrimaryBalance,
    },
    {
      name: "Vault",
      Component: Componenet,
    },
  ];
  return (
    <BoxMain>
      <Stack
        mb={2}
        direction="row"
        alignContent="center"
        justifyContent="space-between"
      >
        <Stack direction="row" columnGap={{ md: 2, xs: 1 }} alignItems="center">
          <IconButton component={Link} to="/dashboard/home">
            <ArrowBack sx={{ color: "#fff", fontSize: "25px" }} />
          </IconButton>

          <img
            width="40px"
            src={
              token === "bitcoin"
                ? bitcoin
                : token === "solana"
                ? Solana
                : Ethereum
            }
            alt={token}
          />
          <Typography variant="h3" sx={{ textTransform: "capitalize" }}>
            {token}
          </Typography>
          <Typography variant="h4">
            {token === "bitcoin" ? "BTC" : token === "solana" ? "SOL" : "ETH"}
          </Typography>
        </Stack>
        <Box>
          {isWatching ? (
            <ButtonMain onClick={() => setIsWatching(false)}>
              <StarIcon
                sx={{
                  px: "5px",
                  color: "black",
                  fontSize: "30px",
                  mb: "3px",
                  height: "40px",
                }}
              />
              Watchlist
            </ButtonMain>
          ) : (
            <ButtonBorder onClick={() => setIsWatching(true)}>
              <StarBorderIcon
                sx={{
                  px: "5px",
                  color: "white",
                  fontSize: "30px",
                  mb: "3px",
                  height: "40px",
                }}
              />
              Add to Watchlist
            </ButtonBorder>
          )}
        </Box>
      </Stack>
      <Box>
        <TabsButton btnName={btnName} />
      </Box>
    </BoxMain>
  );
};

export default TokenPrice;
