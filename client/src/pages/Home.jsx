import React from "react";
import { Box } from "@mui/material";

import Info from "../componenets/Info";
import TrustedCrypto from "../componenets/TrustedCrypto";
import GetStarted from "../componenets/GetStarted";
import SecondEarnUpTo from "../componenets/Header/SecondEarnUpTo";
import Portfolio from "../componenets/Portfolio";
import CurrencyTable from "../componenets/CurrenctTable";
import EarnUpTo from "../componenets/EarnUpTo";
import CryptocurrencyPortfolio from "../componenets/CryptocurrencyPortfolio";

const Home = () => {
  return (
    <Box>
      <Portfolio />
      <CurrencyTable />
      <EarnUpTo />
      <TrustedCrypto />
      <CryptocurrencyPortfolio />
      <Info />
      <GetStarted />
      <SecondEarnUpTo />
    </Box>
  );
};

export default Home;
