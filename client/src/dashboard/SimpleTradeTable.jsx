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

import { Link } from "react-router-dom";
// import ManageSearchIcon from "@mui/icons-material/ManageSearch";
// eslint-disable-next-line import/no-cycle, import/no-useless-path-segments
// import {
//   BoxMain,
//   // , RecentTransction, Tabs
// } from "../dashboard";

// import star from "../images/star.png";
// import Bitcoin from "../assets/Bitcoin.png";
// import fillStar from "../images/fillStar.png";
// import Solana from "../images/Solana.png";
// import Ethereum from "../images/Ethereum.png";

import { Solana, bitcoin, Ethereum } from "../assets";

// import { ButtonMain } from "../componenets";
import BoxMain from "./BoxMain";
import { useGetCoinMarketCapDataMutation } from "../services/transferApis";
import Loading from "../componenets/Loading";

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

// const FirstFunc = () => {
//   return (
//     <Box>
//       <Typography variant="h3" mt="20px" fontFamily="Roboto">
//         Verification Id not verified
//       </Typography>
//     </Box>
//   );
// };
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

// const timeArray = ["1D", "1H", "1W", "1M", "1Y"];
// const filterArray = [
//   "All Assets",
//   "Watch List",
//   "Tradable Assets",
//   "Top Gainer",
//   "Top Losers",
// ];

const rows = [
  {
    name: {
      img: bitcoin,
      currency: "Bitcoin",
      symbol: "BTC",
    },
    price: "PKR 6,768,819.09",
    change: "-1.87%",
    marketCap: "PKR 123.6T",
    watch: true,
  },
  {
    name: {
      img: Ethereum,
      currency: "Ethereum",
      symbol: "ETH",
    },
    price: "PKR 6,768,819.09",
    change: "-1.87%",
    marketCap: "PKR 123.6T",
    watch: true,
  },
  {
    name: {
      img: Solana,
      currency: "Solana",
      symbol: "SOL",
    },
    price: "PKR 6,768,819.09",
    change: "-1.87%",
    marketCap: "PKR 123.6T",
    watch: true,
  },
];
// const btnName = [
//   {
//     name: "Buy",
//     Component: FirstFunc,
//   },
//   {
//     name: "Sell",
//     Component: FirstFunc,
//   },
//   {
//     name: "Deposit",
//     Component: FirstFunc,
//   },
// ];

const tableRow = ["Name", "Price", "Change24h", "Market Cap"];
const SimpleTradeTable = () => {
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
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [select2, setSelect2] = useState("All Assets");
  // const [anchorEl2, setAnchorEl2] = React.useState(null);
  return (
    <Box>
      <Loading loading={isLoading} />
      {coinMarketCapData && (
        <BoxMain sx={{ mt: "10px" }}>
          {/* <Grid container spacing={{ md: 5, xs: 2 }}>
          <Grid item md={4} sm={4} xs={12}>
            <CustomInput
              placeholder="Search..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <ManageSearchIcon sx={{ color: "#fff" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item md={1} sm={2} xs={4}>
            <CustomSelect
              select={select}
              setSelect={setSelect}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              array={timeArray}
            />
          </Grid>
          <Grid item md={3} sm={6} xs={8}>
            <CustomSelect
              select={select2}
              setSelect={setSelect2}
              anchorEl={anchorEl2}
              setAnchorEl={setAnchorEl2}
              array={filterArray}
            />
          </Grid>
        </Grid> */}

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
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  {tableRow.map((data, ind) => (
                    <StyledTableCell align="left" key={ind}>
                      {data}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(({ name }, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                      <Link
                        to={`price/${name.currency.toLowerCase()}`}
                        style={{ textDecoration: "none", color: "#fff" }}
                      >
                        <Stack direction="row" alignItems="center">
                          <img
                            src={name.img}
                            alt={name.currency}
                            width="25px"
                          />
                          <Box px="5px">
                            <Typography fontSize="14px" fontWeight="600">
                              {name.currency}
                            </Typography>
                            <Typography fontSize="10px">
                              {name.symbol}
                            </Typography>
                          </Box>
                        </Stack>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      USDT {coinMarketCapData[i]?.price?.toFixed(3) ?? 0}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {coinMarketCapData[i]?.chnage24h ?? 0}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {coinMarketCapData[i]?.marketCap?.toFixed(3) ?? 0}
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">
                    <ButtonMain className="hvr-bounce-to-right">
                      {" "}
                      Buy
                    </ButtonMain>
                  </StyledTableCell> */}
                    {/* <StyledTableCell align="center">
                    {watch ? (
                      <img src={fillStar} alt="watch" />
                    ) : (
                      <img src={star} alt="watch" />
                    )}
                  </StyledTableCell> */}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </BoxMain>
      )}

      {/* <Grid container spacing={5} mt="10px">
        <Grid item xs={12} sm={7} md={8}>
          <BoxMain sx={{ height: "100%" }}>
            <Tabs btnName={btnName} />
          </BoxMain>
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <RecentTransction />
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default SimpleTradeTable;
