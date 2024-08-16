/* eslint-disable indent */
import { useEffect, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import TabsButton from "./TabsButton";
import CustomLimitBox from "./CustomLimitBox";
import CustomMarketBox from "./MarketOrderBook";
import { setNetwork } from "../slices";

const Limit = () => {
  const { userDbData, tokenPrice } = useSelector((store) => store.global);
  const { pair } = useParams();

  let { usdtBalance, nativeBalance } = useMemo(() => {
    // eslint-disable-next-line no-shadow
    let usdtBalance = 0;
    // eslint-disable-next-line no-shadow
    let nativeBalance = 0;

    if (pair === "eth") {
      usdtBalance = userDbData?.usdtBalance;
      nativeBalance = userDbData?.ethVault?.balance;
    } else if (pair === "sol") {
      usdtBalance = userDbData?.usdtBalance;
      nativeBalance = userDbData?.solVault?.balance;
    } else if (pair === "btc") {
      usdtBalance = userDbData?.usdtBalance;
      nativeBalance = userDbData?.btcVault?.balance;
    }

    return { usdtBalance, nativeBalance };
  }, [pair, userDbData]);

  return (
    <Box my={3}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <CustomLimitBox
            isBuyOrder
            currentTokenPrice={tokenPrice.toString()}
            walletBalance={usdtBalance ?? 0}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomLimitBox
            isBuyOrder={false}
            currentTokenPrice={tokenPrice.toString()}
            walletBalance={nativeBalance ?? 0}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
const Market = () => {
  const { userDbData, tokenPrice } = useSelector((store) => store.global);
  const { pair } = useParams();

  let { usdtBalance, nativeBalance } = useMemo(() => {
    // eslint-disable-next-line no-shadow
    let usdtBalance = 0;
    // eslint-disable-next-line no-shadow
    let nativeBalance = 0;

    if (pair === "eth") {
      usdtBalance = userDbData?.usdtBalance;
      nativeBalance = userDbData?.ethVault?.balance;
    } else if (pair === "sol") {
      usdtBalance = userDbData?.usdtBalance;
      nativeBalance = userDbData?.solVault?.balance;
    } else if (pair === "btc") {
      usdtBalance = userDbData?.usdtBalance;
      nativeBalance = userDbData?.btcVault?.balance;
    }

    return { usdtBalance, nativeBalance };
  }, [pair, userDbData]);

  return (
    <Box my={3}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <CustomMarketBox
            isBuyOrder
            walletBalance={usdtBalance ?? 0}
            currentTokenPrice={tokenPrice}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomMarketBox
            isBuyOrder={false}
            walletBalance={nativeBalance ?? 0}
            currentTokenPrice={tokenPrice}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const btnName = [
  {
    name: "Limit",
    Component: Limit,
  },
  {
    name: "Market",
    Component: Market,
  },
];

const BuySellOrderBook = () => {
  const { pair } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (pair) {
      dispatch(setNetwork(pair));
    }
  });
  return <TabsButton btnName={btnName} />;
};

export default BuySellOrderBook;
