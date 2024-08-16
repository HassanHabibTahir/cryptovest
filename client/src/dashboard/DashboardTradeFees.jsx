import * as React from "react";
import {
  Paper,
  tableCellClasses,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import BoxMain from "./BoxMain";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    textAlign: "left",
    background:
      "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
    color: theme.palette.common.black,
    fontWeight: "600",
  },
  [`&.${tableCellClasses.body}`]: {
    textAlign: "left",
    fontSize: 16,
    borderBottom: "none",
  },
}));

const TableCellData = [
  "Available balance",
  "Balance on orders",
  "Trailing 30 day volume",
  "Trailing 30 day fees",
  "Current taker fees",
  "Current maker fees",
];
const rows = [
  {
    availableBalance: "0 PKR",
    balanceOnOrders: "0 PKR",
    dayVolume: "$0.00",
    dayFees: "$0.00",
    takerFees: "0.60%",
    makerFees: "0.40%",
  },
];
const PricingTier = ["Pricing tier", "Taker fee", "Maker fee"];
const PricingTierRows = [
  {
    pricingTier: "<$10k",
    takerFee: "0.60%",
    makerFee: "0.40%",
  },
  {
    pricingTier: "$10k - $50k",
    takerFee: "0.40%",
    makerFee: "0.25%",
  },
  {
    pricingTier: "$50k - $100k",
    takerFee: "0.25%",
    makerFee: "0.15%",
  },
  {
    pricingTier: "$100k - $1m",
    takerFee: "0.20%",
    makerFee: "0.10%",
  },
  {
    pricingTier: "$1m - $15m",
    takerFee: "0.18%",
    makerFee: "0.08%",
  },
  {
    pricingTier: "$15m - $75m",
    takerFee: "0.16%",
    makerFee: "0.06%",
  },
  {
    pricingTier: "$75m - $250m",
    takerFee: "0.12%",
    makerFee: "0.03%",
  },
  {
    pricingTier: "$250m - $400m",
    takerFee: "0.08%",
    makerFee: "0.00%",
  },
  {
    pricingTier: "$400m+",
    takerFee: "0.05%",
    makerFee: "0.00%",
  },
];
const StablePairs = ["Stable Pairs", "Taker fee", "Maker fee"];
const StablePairsRows = [
  {
    stablePairs: "BUSD - USD",
    takerFee: "",
    makerFee: "",
  },
  {
    stablePairs: "CBETH - ETH",
    takerFee: "",
    makerFee: "",
  },
  {
    stablePairs: "DAI - USD",
    takerFee: "",
    makerFee: "",
  },
  {
    stablePairs: "GUSD - USD",
    takerFee: "",
    makerFee: "",
  },
  {
    stablePairs: "GYEN - USD ",
    takerFee: "",
    makerFee: "",
  },
  {
    stablePairs: "PAX - USD ",
    takerFee: "",
    makerFee: "",
  },
  {
    stablePairs: "PAX - USDT ",
    takerFee: "0.001%",
    makerFee: "0.00% ",
  },
  {
    stablePairs: "USDC - EUR ",
    takerFee: "",
    makerFee: "",
  },
  {
    stablePairs: "USDC - GBP  ",
    takerFee: "",
    makerFee: "",
  },
  {
    stablePairs: "USDT - EUR ",
    takerFee: "",
    makerFee: "",
  },
  {
    stablePairs: "USDT - GBP ",
    takerFee: "",
    makerFee: "",
  },
  {
    stablePairs: "USDT - USD ",
    takerFee: "",
    makerFee: "",
  },
  {
    stablePairs: "USDT - USDC ",
    takerFee: "",
    makerFee: "",
  },
  {
    stablePairs: "WBTC - BTC  ",
    takerFee: "",
    makerFee: "",
  },
];
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    background: "rgba(34, 34, 34, 0.42)",
    borderRadius: "44px",
    color: theme.palette.common.black,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    backgroundColor: "transparent",
  },
  borderBottom: "none",
}));

export default function DashboardTradeFees() {
  return (
    <Box mt={2}>
      <BoxMain>
        <Typography variant="h4" mb={1}>
          Summary
        </Typography>
        <TableContainer
          sx={{
            "& .MuiPaper-root ": {
              backgroundColor: "transparent",
            },
            mt: "10px",
            background: "transparent",
            borderRadius: "0px",

            // minWidth: 750,
            overflowX: "scroll",
            "&::-webkit-scrollbar": {
              width: "0 !important",
            },
            "&::-webkit-scrollbar:horizontal": {
              height: "4px !important",
            },
            // "&::-webkit-scrollbar-track": {
            //   background: "#0a261f",
            // },
            "&::-webkit-scrollbar-thumb": {
              background: "#F8EBB0",
            },
          }}
          elevation={0}
          component={Paper}
        >
          <Table aria-label="customized table" sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                {TableCellData.map((heading, ind) => (
                  <StyledTableCell key={ind}>{heading}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(
                (
                  {
                    availableBalance,
                    balanceOnOrders,
                    dayVolume,
                    dayFees,
                    takerFees,
                    makerFees,
                  },
                  i
                ) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell>{availableBalance}</StyledTableCell>
                    <StyledTableCell>{balanceOnOrders}</StyledTableCell>
                    <StyledTableCell>{dayVolume}</StyledTableCell>
                    <StyledTableCell>{dayFees}</StyledTableCell>
                    <StyledTableCell>{takerFees}</StyledTableCell>
                    <StyledTableCell>{makerFees}</StyledTableCell>
                  </StyledTableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </BoxMain>

      <BoxMain sx={{ mt: 5 }}>
        <Typography variant="h4" mb={1}>
          About Advanced Trade fees
        </Typography>
        <Typography>
          Your pricing tier is calculated based on your trailing 30-day volume
          on Advanced Trade and Coinbase Pro at the time your order is placed,
          and your fees are set based on that pricing tier. Your pricing tier is
          recalculated hourly and only includes past filled orders, not the
          order you’re currently placing or any open orders. Your pricing tier
          may take up to an hour to update.
        </Typography>
        <br />
        <Typography>
          Taker fees: When you place an order at the market price that gets
          filled immediately, you are considered a taker and will pay a taker
          fee based on your pricing tier and market, according to the table
          below.
        </Typography>
        <br />
        <Typography>
          Maker fees: When you place an order which is not immediately matched
          by an existing order, that order is placed on the order book. If
          another customer places an order that matches yours, you are
          considered the maker and will pay a maker fee based on your pricing
          tier and market, according to the table below.
        </Typography>
        <TableContainer
          sx={{
            "& .MuiPaper-root ": {
              backgroundColor: "transparent",
            },
            mt: "10px",
            background: "transparent",
            borderRadius: "0px",

            // minWidth: 750,
            overflowX: "scroll",
            "&::-webkit-scrollbar": {
              width: "0 !important",
            },
            "&::-webkit-scrollbar:horizontal": {
              height: "4px !important",
            },
            // "&::-webkit-scrollbar-track": {
            //   background: "#0a261f",
            // },
            "&::-webkit-scrollbar-thumb": {
              background: "#F8EBB0",
            },
          }}
          elevation={0}
          component={Paper}
        >
          <Table aria-label="customized table" sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                {PricingTier.map((heading, ind) => (
                  <StyledTableCell key={ind}>{heading}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {PricingTierRows.map(({ pricingTier, takerFee, makerFee }, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell>{pricingTier}</StyledTableCell>
                  <StyledTableCell>{takerFee}</StyledTableCell>
                  <StyledTableCell>{makerFee}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer
          sx={{
            "& .MuiPaper-root ": {
              backgroundColor: "transparent",
            },
            mt: "10px",
            background: "transparent",
            borderRadius: "0px",

            // minWidth: 750,
            overflowX: "scroll",
            "&::-webkit-scrollbar": {
              width: "0 !important",
            },
            "&::-webkit-scrollbar:horizontal": {
              height: "4px !important",
            },
            // "&::-webkit-scrollbar-track": {
            //   background: "#0a261f",
            // },
            "&::-webkit-scrollbar-thumb": {
              background: "#F8EBB0",
            },
          }}
          elevation={0}
          component={Paper}
        >
          <Table aria-label="customized table" sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                {StablePairs.map((heading, ind) => (
                  <StyledTableCell key={ind}>{heading}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {StablePairsRows.map(({ stablePairs, takerFee, makerFee }, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell>{stablePairs}</StyledTableCell>
                  <StyledTableCell>{takerFee}</StyledTableCell>
                  <StyledTableCell>{makerFee}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography>
          Partial match: Some orders may be partially matched initially, and may
          be posted to the order book partially as a maker order and partially
          as a taker order. A maker fee applies to the portion posted as a maker
          order and a taker fee applies to the portion posted as a taker order.
        </Typography>
        <br />
        <Typography>
          When you place an order that gets partially matched immediately, you
          pay a taker fee for that portion. The remainder of the order is placed
          on the order book and, when matched, is considered a maker order. Note
          that for some order types, you can opt to “Post only” if you only want
          to post as a maker order.
        </Typography>
        <br />
        <Typography fontSize="14px">
          Coinbase reserves the right to adjust pricing. Pricing will always be
          displayed on the order preview page of each trade.
        </Typography>
      </BoxMain>
    </Box>
  );
}
