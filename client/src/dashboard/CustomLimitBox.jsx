import React, { useCallback, useState } from "react";
import { AddCircleRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ButtonMain, CustomField } from "../componenets";
import Toastify from "../connectivityAssets/Toastify";
import CustomizedSteppers from "./CustomStepper";
import { socket } from "../utils";
import { setUserDbData, setUserOrders } from "../slices";

const CustomLimitBox = ({ isBuyOrder, currentTokenPrice, walletBalance }) => {
  const { userDbData, network } = useSelector((store) => store.global);
  const dispatch = useDispatch();
  const { pair } = useParams();

  const [stepper, setStepper] = useState(0);
  const [baseAmount, setBaseAmount] = useState("");
  const [price, setPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  const emptyFields = () => {
    setPrice("");
    setBaseAmount("");
    setTotalAmount("");
  };
  const showToast = useCallback((msg, type) => {
    return setAlertState({
      open: true,
      message: msg,
      severity: type,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value.match(/^[0-9]*[.]?[0-9]*$/)) {
      if (name === "base") {
        setBaseAmount(value);
        if (isBuyOrder && price > 0) {
          setTotalAmount(value / price);
        } else {
          setTotalAmount(value * price);
        }
        setStepper(0);
      } else if (name === "amount") {
        setPrice(value);
        if (isBuyOrder && baseAmount > 0) {
          setTotalAmount(baseAmount / value);
        } else {
          setTotalAmount(value * baseAmount);
        }
      }
    }
  };

  const handleBuy = useCallback(async () => {
    try {
      if (!pair || !["eth", "sol", "btc"].includes(pair)) {
        showToast("network is not correct", "error");
        return;
      }
      if (Number(baseAmount) <= 0) {
        showToast("Enter valid amount", "error");
        return;
      }
      if (Number(baseAmount) > walletBalance) {
        showToast("Insufficent Balance", "error");
        return;
      }

      if (Number(price) <= 0) {
        showToast("Enter price", "error");
        return;
      }

      socket.emit("place_order", {
        // eslint-disable-next-line no-underscore-dangle
        user: userDbData?._id,
        baseToken: "USDT",
        quoteToken: pair?.toUpperCase(),
        isBuyOrder,
        isLimitOrder: true,
        baseAmount,
        price,
        network: network ?? pair,
        remaining: isBuyOrder ? totalAmount : baseAmount,
        currentPrice: null,
      });

      socket.on("updated_user", (user) => {
        dispatch(setUserDbData(user));
      });
      socket.on("get_user_orders", (orders) => {
        dispatch(setUserOrders(orders));
      });

      emptyFields();
      showToast("Order Placed");
    } catch (e) {
      showToast(e?.data?.message, "error");
    }
  }, [
    baseAmount,
    dispatch,
    isBuyOrder,
    pair,
    price,
    showToast,
    totalAmount,
    userDbData,
    walletBalance,
  ]);

  return (
    <>
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Stack spacing={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography color="text.secondary" fontSize="13px">
            Avbl
          </Typography>
          <Typography fontSize="13px">
            {parseFloat(walletBalance).toFixed(4)}
            {isBuyOrder ? " USDT" : pair?.toUpperCase()}
          </Typography>
          <AddCircleRounded fontSize="small" sx={{ color: "#E1AE3C" }} />
        </Box>
        <CustomField
          onChange={handleChange}
          name="base"
          value={baseAmount}
          placeholder="Amount"
          amount={currentTokenPrice}
          currency="usdt"
        />

        <CustomField
          placeholder="Price"
          name="amount"
          onChange={handleChange}
          value={price}
        />

        <Box sx={{ width: "100%" }}>
          <CustomizedSteppers
            setBaseAmount={setBaseAmount}
            name={isBuyOrder ? "buy" : "sell"}
            baseBalance={walletBalance}
            price={price}
            setTotalAmount={setTotalAmount}
            setStepper={setStepper}
            stepper={stepper}
          />
        </Box>

        <CustomField
          placeholder="0.00"
          readOnly
          value={
            totalAmount === 0 || Number.isNaN(totalAmount) ? "" : totalAmount
          }
          currency={isBuyOrder ? pair : "usdt"}
        />
        <ButtonMain onClick={handleBuy} sx={{ py: 2, width: "100%", mt: 4 }}>
          {isBuyOrder ? "Buy " : "Sell "}
          {pair}
        </ButtonMain>
      </Stack>
    </>
  );
};

export default CustomLimitBox;
