import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Help, KeyboardArrowDown, ArrowBack } from "@mui/icons-material";
import { useDispatch } from "react-redux";

import { bitcoin, Solana, Ethereum } from "../../assets/index";
import { ButtonBorder, ButtonMain } from "../../componenets";
import DepositeModal from "../../dashboard/modals/DepositeModal";
import BuySellOrderBook from "../../dashboard/BuySellOrderBook";
// import DashChart from "./DashChart";
import { DashboardSecondChart, DashboardTable } from "../../dashboard";
import { socket } from "../../utils";
import { setTokenPrice } from "../../slices";
// import { useGetCurrentPriceMutation } from "../../services/coinMarketCapApi";

let currency = ["btc", "eth", "sol"];

const PriceNav = () => {
  const { pair } = useParams();
  const [menu, setMenu] = useState("btc");
  const [openDeposite, setOpenDeposite] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggelModelDeposite = () => {
    setOpenDeposite(!openDeposite);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setMenu(pair);
  }, [pair]);
  return (
    <Box>
      <DepositeModal
        open={openDeposite}
        setOpen={setOpenDeposite}
        toggelModel={toggelModelDeposite}
      />

      <Stack
        direction="row"
        alignItems=" center"
        columnGap={{ md: 4, xs: 2 }}
        rowGap={{ md: 4, xs: 2 }}
        sx={{ py: "20px" }}
        flexWrap="wrap"
      >
        <Link to="/dashboard/trade">
          <IconButton
            sx={{
              "&:hover": {
                "& .css-xygsw0-MuiSvgIcon-root": {
                  color: "#000",
                },
                background:
                  "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
                transition: "0.5s",
              },
            }}
          >
            <ArrowBack sx={{ color: "#fff", fontSize: "25px" }} />
          </IconButton>
        </Link>
        <Stack direction="row">
          <img
            width="30px"
            src={menu === "btc" ? bitcoin : menu === "eth" ? Ethereum : Solana}
            alt="currency icon"
          />
        </Stack>
        <ButtonBorder
          sx={{ px: "20px" }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {menu.toUpperCase()}
          <KeyboardArrowDown
            sx={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </ButtonBorder>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{
            "& .MuiPaper-root": {
              background: "#2A2A29",
            },
          }}
        >
          {currency.map((item, ind) => (
            <MenuItem
              component={Link}
              to={`/dashboard/trade/${item}`}
              key={ind}
              onClick={() => {
                setMenu(item);
                handleClose();
              }}
              sx={{
                minWidth: "95px",
                "&:hover": {
                  borderRadius: "10px",
                  color: "#000",
                  background:
                    "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
                },
              }}
            >
              {item.toUpperCase()}
            </MenuItem>
          ))}
        </Menu>

        <ButtonMain onClick={toggelModelDeposite} sx={{ px: "20px" }}>
          Deposite
        </ButtonMain>
      </Stack>
    </Box>
  );
};
const DashboardOrderbook = () => {
  const dispatch = useDispatch();
  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);
  const [currentPriceArray, setCurrentPriceArray] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const { pair } = useParams();

  // const [getCurrentPrice] = useGetCurrentPriceMutation();

  // const getCurrentPriceData = useCallback(async () => {
  //   try {
  //     const response = await getCurrentPrice().unwrap();
  //     console.log(response, "CurrentPrice====>>>>");
  //     setCurrentPrice(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [getCurrentPrice]);

  // useEffect(() => {
  //   getCurrentPriceData();
  // }, [getCurrentPriceData]);

  useEffect(() => {
    socket.emit("find_orders", pair);

    socket.on("get_orders", (orders) => {
      setBuyOrders(orders.buyOrders);
      setSellOrders(orders.sellOrders);
      setCurrentPriceArray(orders.currentPrice);
    });
  }, [pair]);

  useEffect(() => {
    if (currentPriceArray.length > 0) {
      const price = Number(
        currentPriceArray?.filter(
          (data) => data?.symbol === pair.toUpperCase()
        )[0]?.price
      )?.toFixed(2);

      setCurrentPrice(price);
      dispatch(setTokenPrice(price));
    }
  }, [currentPriceArray, dispatch, pair]);

  return (
    <Box>
      <PriceNav />
      <Box>
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            {/* <DashChart /> */}
            <DashboardSecondChart />
          </Grid>
          <Grid item md={3} xs={12}>
            <Box xp={1}>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center" columnGap={1}>
                  <Typography fontWeight="500">Order Book</Typography>
                  <Help fontSize="12px" sx={{ color: "#BEBEC7" }} />
                </Box>
                <Button
                  sx={{ fontFamily: "Roboto", fontSize: "13px" }}
                  endIcon={<KeyboardArrowDown />}
                >
                  0.01
                </Button>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                textTransform="uppercase"
                borderBottom=" 1px solid #E1AE3C"
                color="#BEBEC7"
              >
                <Typography fontSize="11px">price(usdt)</Typography>
                <Typography fontSize="11px">amount(eth)</Typography>
                <Typography fontSize="11px">amount(usdt)</Typography>
              </Box>
              {sellOrders?.slice(0, 10)?.map((value, ind) => (
                <Box
                  key={ind}
                  display="flex"
                  justifyContent="space-between"
                  textTransform="uppercase"
                >
                  <Box width="70px">
                    <Typography fontSize="12px" color="#ff7f7f">
                      {value.price}
                    </Typography>
                  </Box>
                  <Box width="70px">
                    <Typography textAlign="center" fontSize="12px">
                      {value.baseAmount}
                    </Typography>
                  </Box>
                  <Box width="70px" textAlign="right">
                    <Typography fontSize="12px">
                      {" "}
                      {parseFloat(value.baseAmount * value.price).toFixed(3)}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <Typography
                my={1}
                fontSize="20px"
                // color="green"
                fontWeight="bold"
                // textAlign="center"
              >
                {currentPrice}
              </Typography>
              {buyOrders?.slice(0, 10)?.map((value, ind) => (
                <Box
                  key={ind}
                  display="flex"
                  justifyContent="space-between"
                  textTransform="uppercase"
                >
                  <Box width="70px">
                    <Typography fontSize="12px" color="green">
                      {value.price}
                    </Typography>
                  </Box>
                  <Box width="70px">
                    <Typography fontSize="12px" textAlign="center">
                      {value.baseAmount}
                    </Typography>
                  </Box>
                  <Box width="70px" textAlign="right">
                    <Typography fontSize="12px">
                      {" "}
                      {parseFloat(value.baseAmount / value.price).toFixed(3)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
          {/* <Grid item md={12} xs={12}>
            <DashboardSecondChart />
          </Grid> */}
          <Grid item md={12} xs={12} sx={{ mt: 5 }}>
            <BuySellOrderBook currentPrice={currentPrice} />
          </Grid>
          <Grid item xs={12}>
            <DashboardTable />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardOrderbook;
