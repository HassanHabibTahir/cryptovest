import { useState, useCallback } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { ButtonMain, CustomField } from "../componenets";
import CustomStepper from "./CustomStepper";
import Toastify from "../connectivityAssets/Toastify";
import { socket } from "../utils";
import { setUserDbData, setUserOrders } from "../slices";
import Loading from "../componenets/Loading";

const Market = ({ isBuyOrder, walletBalance, currentTokenPrice }) => {
  const { userDbData, network } = useSelector((store) => store.global);
  const dispatch = useDispatch();
  const { pair } = useParams();
  const [loading, setloading] = useState(false);
  const [stepper, setStepper] = useState(0);
  const [baseAmount, setBaseAmount] = useState("");
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  const handleChange = (e) => {
    const { value } = e.target;

    if (value.match(/^[0-9]*[.]?[0-9]*$/)) {
      setBaseAmount(value);
      setStepper(0);
    }
  };

  const showToast = useCallback((msg, type) => {
    return setAlertState({
      open: true,
      message: msg,
      severity: type,
    });
  }, []);

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
      setloading(true);
      socket.emit("place_order", {
        user: userDbData?._id,
        baseToken: "USDT",
        quoteToken: pair?.toUpperCase(),
        isBuyOrder,
        isLimitOrder: false,
        baseAmount,
        network: network ?? pair,
        price: 0,
        remaining: 0,
        currentPrice: currentTokenPrice,
      });
      socket.on("updated_user", (user) => {
        dispatch(setUserDbData(user));
      });
      socket.on("get_user_orders", (orders) => {
        dispatch(setUserOrders(orders));
      });
      setBaseAmount("");
      setloading(false);
      showToast("Order Placed");
    } catch (e) {
      showToast(e?.data?.message, "error");
    }
  }, [
    baseAmount,
    currentTokenPrice,
    dispatch,
    isBuyOrder,
    network,
    pair,
    showToast,
    userDbData?._id,
    walletBalance,
  ]);

  return (
    <>
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Loading loading={loading} />
      <Stack spacing={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography color="text.secondary" fontSize="13px">
            Avbl
          </Typography>
          <Typography fontSize="13px">
            {parseFloat(walletBalance).toFixed(4)}
            {isBuyOrder ? " USDT" : " ETH"}
          </Typography>
          <AddCircleRounded fontSize="small" sx={{ color: "#E1AE3C" }} />
        </Box>

        <CustomField
          placeholder="Price"
          amount="Market"
          value={currentTokenPrice}
          readOnly
        />
        <CustomField
          onChange={handleChange}
          value={baseAmount}
          amount={isBuyOrder ? "Amount" : "Total"}
        />
        <Box sx={{ width: "100%" }}>
          <CustomStepper
            setBaseAmount={setBaseAmount}
            baseBalance={walletBalance}
            price={null}
            setTotalAmount={null}
            setStepper={setStepper}
            stepper={stepper}
          />
        </Box>
        <ButtonMain onClick={handleBuy} sx={{ py: 2, width: "100%", mt: 4 }}>
          {isBuyOrder ? "Buy " : "Sell "}
          {pair.toUpperCase()}
        </ButtonMain>
      </Stack>
    </>
  );
};

export default Market;
