import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  // Grid,
  // IconButton,
  // InputAdornment,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
// import { ManageSearch } from "@mui/icons-material";

import { Link } from "react-router-dom";
import Bitcoin from "../assets/Bitcoin.png";
import Ethereum from "../images/Ethereum.png";
import Solana from "../assets/Solana.png";

// import star from "../images/star.png";
// import fillStar from "../images/fillStar.png";

import BoxMain from "./BoxMain";
import { useGetCoinMarketCapDataMutation } from "../services/transferApis";
import Loading from "../componenets/Loading";
// import { ButtonBorder, ButtonMain, CustomInput } from "../componenets";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background:
      "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
    color: theme.palette.common.black,
    fontWeight: "600",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    borderBottom: "none",
  },
}));

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

const rows = [
  {
    name: {
      img: Bitcoin,
      currency: "Bitcoin",
      symbol: "BTC",
    },
    price: { pairPrice: "6,768 USDT", price: "PKR 6,768,819.09" },
    change: "-1.87%",
    marketCap: "PKR 123.6T",
    watch: true,
    url: "btc",
  },
  {
    name: {
      img: Ethereum,
      currency: "Ethereum",
      symbol: "ETH",
    },
    price: { pairPrice: "6,768 USDT", price: "PKR 6,768,819.09" },
    change: "-1.87%",
    marketCap: "PKR 123.6T",
    watch: true,
    url: "eth",
  },
  {
    name: {
      img: Solana,
      currency: "Solana",
      symbol: "SOL",
    },
    price: { pairPrice: "6,768 USDT", price: "PKR 6,768,819.09" },
    change: "-1.87%",
    marketCap: "PKR 123.6T",
    watch: true,
    url: "sol",
  },
];

// const filterArray = [
//   "All markets",
//   "Watchlist",
//   "New Pairs",
//   "USD",
//   "ERU",
//   "GBP ",
//   "USDT",
//   "BTC",
//   "ETH",
//   "DAI",
// ];

const AdvanceTradeTable = () => {
  const [getCoinMarketCapData, { isLoading }] =
    useGetCoinMarketCapDataMutation();
  // Menu
  const [coinMarketCapData, setcoinMarketCapData] = useState();

  const getData = useCallback(async () => {
    try {
      const { data } = await getCoinMarketCapData().unwrap();
      console.log(data, "data");
      setcoinMarketCapData(data);
    } catch (error) {
      console.log(error);
    }
  }, [getCoinMarketCapData]);
  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <>
      <Loading loading={isLoading} />
      {coinMarketCapData && (
        <BoxMain>
          {/* <Box py="30px">
        <Grid container spacing={5}>
          <Grid item md={7} sm={12} xs={12}>
            <CustomInput
              placeholder="Search..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <ManageSearch sx={{ color: "#fff" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Stack
              direction="row"
              columnGap={2}
              alignItems="center"
              flexWrap="wrap"
            >
              {filterArray.map((name, i) => (
                <Box key={i} mt="10px">
                  {selected === name ? (
                    <ButtonMain>{name}</ButtonMain>
                  ) : (
                    <ButtonBorder onClick={() => setSelected(name)}>
                      {name}
                    </ButtonBorder>
                  )}
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box> */}
          <TableContainer
            sx={{
              "& .MuiPaper-root ": {
                backgroundColor: "transparent",
              },
              mt: "10px",
              background: "transparent",
              borderRadius: "0px",
              maxWidth: { xs: "700px", sm: "100%", md: "100%" },
              maxHeight: "500px",
              width: "100%",
              overflowX: "scroll",
              "&::-webkit-scrollbar": {
                width: "0 !important",
              },
              "&::-webkit-scrollbar:horizontal": {
                height: "4px !important",
              },
              "&::-webkit-scrollbar:verticle": {
                width: "4px !important",
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
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell> </StyledTableCell>
                  <StyledTableCell align="left">Price</StyledTableCell>
                  <StyledTableCell align="left">Volume</StyledTableCell>
                  <StyledTableCell align="left">24H Change</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(({ name, url }, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                      <Stack
                        direction="row"
                        alignItems="center"
                        color="#fff"
                        sx={{ textDecoration: "none" }}
                        component={Link}
                        to={url}
                      >
                        <img src={name.img} alt={name.currency} width="20px" />
                        <Box px="5px">
                          <Typography fontSize="14px" fontWeight="600">
                            {`${name.symbol} - USDT`}
                          </Typography>
                        </Box>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell> </StyledTableCell>
                    <StyledTableCell align="left">
                      <Typography fontSize="14px" fontWeight="600">
                        USDT {coinMarketCapData[i]?.price?.toFixed(3) ?? 0}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      {coinMarketCapData[i]?.volume?.toFixed(3) ?? 0}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {coinMarketCapData[i]?.chnage24h ?? 0}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </BoxMain>
      )}
    </>
  );
};

export default AdvanceTradeTable;
