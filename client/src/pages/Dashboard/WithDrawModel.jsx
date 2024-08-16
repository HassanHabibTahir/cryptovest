/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ButtonMain, CustomInput } from "../../componenets";
import {
  useGetUserMutation,
  useVerifyEmailForWithDrawMutation,
} from "../../services/authApis";
import Toastify from "../../connectivityAssets/Toastify";
import {
  useWithdrawBTCMutation,
  useWithdrawEthMutation,
  useWithdrawEthUsdtMutation,
  useWithdrawSOLMutation,
  useWithdrawSolUsdtMutation,
} from "../../services/vaultApi";
import Loading from "../../connectivityAssets/Loading";
import { setUserDbData } from "../../slices";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overFlowY: "scroll",
  backgroundColor: "#2A2A29",
  borderRadius: "20px",
};

const WithDrawModel = ({ withdraw, setWithdraw, toggelModel, vault }) => {
  const dispatch = useDispatch();
  const [withDrawETH, { isLoading: isLoadingETH }] = useWithdrawEthMutation();
  const [withDrawETHUSDT, { isLoading: isLoadingETHUSDT }] =
    useWithdrawEthUsdtMutation();
  const [withDrawSolUSDT, { isLoading: isLoadingSolUSDT }] =
    useWithdrawSolUsdtMutation();
  const [withDrawBTC, { isLoading: isLoadingBTC }] = useWithdrawBTCMutation();
  const [withDrawSOL, { isLoading: isLoadingSOL }] = useWithdrawSOLMutation();
  const [getUser, { isLoading: isLoadingUser }] = useGetUserMutation();
  const [toSend, setToSend] = useState("");
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const [amount, setAmount] = useState(0);

  const [verifyEmail] = useVerifyEmailForWithDrawMutation();
  const { userDbData } = useSelector((store) => store.global);
  const navigate = useNavigate();

  const handleClose = () => setWithdraw(false);

  const handleVerify = async () => {
    try {
      const verify = await verifyEmail().unwrap();
      navigate("/email-verification", { state: { email: verify?.email } });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAmountChange = (e) => {
    if (!isNaN(e.target.value)) {
      setAmount(e.target.value);
    }
  };
  const handleEthWithdraw = async (isNative) => {
    if (userDbData?.[vault]?.balance < 0.0008) {
      setWithdraw(false);
      return setAlertState({
        open: true,
        message: "Balance Too Low",
        severity: "error",
      });
    }
    if (isNative) {
      if (amount > userDbData?.[vault]?.balance) {
        setWithdraw(false);
        return setAlertState({
          open: true,
          message: "Amount Should be less than balance",
          severity: "error",
        });
      }
    } else {
      if (amount > userDbData?.usdtBalance) {
        setWithdraw(false);
        return setAlertState({
          open: true,
          message: "Amount Should be less than balance",
          severity: "error",
        });
      }
    }

    if (amount <= 0 || toSend?.length === 0) {
      setWithdraw(false);
      return setAlertState({
        open: true,
        message: "Fill All Fields",
        severity: "error",
      });
    }

    try {
      setWithdraw(false);

      console.log(vault, "VAULT===>>>>");
      let msg = "";
      if (vault === "ethVault") {
        let dowithdraw;
        if (isNative) {
          dowithdraw = await withDrawETH({ toSend, amount }).unwrap();
        } else {
          dowithdraw = await withDrawETHUSDT({ toSend, amount }).unwrap();
        }
        // eslint-disable-next-line no-lone-blocks

        msg = dowithdraw?.message;
      } else if (vault === "btcVault") {
        const dowithdraw = await withDrawBTC({ toSend, amount }).unwrap();
        msg = dowithdraw?.message;
      } else {
        // eslint-disable-next-line no-lonely-if
        if (isNative) {
          const dowithdraw = await withDrawSOL({ toSend, amount }).unwrap();
          msg = dowithdraw?.message;
        } else {
          const dowithdraw = await withDrawSolUSDT({ toSend, amount }).unwrap();
          msg = dowithdraw?.message;
        }
      }
      const dbData = await getUser().unwrap();

      dispatch(setUserDbData(dbData));

      setAlertState({
        open: true,
        message: msg,
        severity: "success",
      });
    } catch (error) {
      setAlertState({
        open: true,
        message: error?.message,
        severity: "error",
      });
      setWithdraw(false);
    }
  };
  return (
    <>
      <Loading
        isLoading={
          isLoadingUser ||
          isLoadingBTC ||
          isLoadingETH ||
          isLoadingSOL ||
          isLoadingETHUSDT ||
          isLoadingSolUSDT
        }
      />
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      {/* {userDbData?.[vault]?.withDrawReady === "true" ? ( */}
      <Modal
        open={withdraw}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "scroll" }}
      >
        <Box p={2} sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Withdraw </Typography>

            <Button onClick={toggelModel}>
              <CloseIcon sx={{ color: "white", fontSize: "35px" }} />
            </Button>
          </Box>

          <Divider
            sx={{
              my: 3,
              background:
                "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
              height: "2px",
            }}
          />
          <Typography variant="body">Address</Typography>
          <CustomInput
            value={toSend}
            placeholder="Address"
            onChange={(e) => {
              setToSend(e.target.value);
            }}
          />
          <Divider
            sx={{
              my: 3,
              background:
                "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
              height: "2px",
            }}
          />
          <Typography variant="body">Amount</Typography>
          <CustomInput
            placeholder="Amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <Divider
            sx={{
              my: 3,
              background:
                "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
              height: "2px",
            }}
          />

          {/* BTC dose not have any Satble tokens */}

          <Box textAlign="center" my={1.5} sx={{ display: "flex", gap: 1 }}>
            <ButtonMain
              sx={{
                textAlign: "center",
                p: 1,
              }}
              onClick={() => handleEthWithdraw(true)}
            >
              WithDraw
            </ButtonMain>
            {vault !== "btcVault" && (
              <ButtonMain
                sx={{
                  textAlign: "center",
                  p: 1,
                  m: 1,
                }}
                onClick={() => handleEthWithdraw(false)}
              >
                WithDraw USDT
              </ButtonMain>
            )}
          </Box>
        </Box>
      </Modal>
      {/* ) : (
        <Modal
          open={withdraw}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ overflow: "scroll" }}
        >
          <Box p={2} sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">
                Verify Your Emails to Withdraw
              </Typography>

              <Button onClick={toggelModel}>
                <CloseIcon sx={{ color: "white", fontSize: "35px" }} />
              </Button>
            </Box>

            <Divider
              sx={{
                my: 3,
                background:
                  "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
                height: "2px",
              }}
            />

            <Box textAlign="center" my={1.5}>
              <ButtonMain
                sx={{
                  textAlign: "center",
                  p: 1,
                }}
                onClick={handleVerify}
              >
                Continue
              </ButtonMain>
            </Box>
          </Box>
        </Modal>
      )} */}
    </>
  );
};

export default WithDrawModel;
