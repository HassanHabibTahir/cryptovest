import React, { useState, useCallback } from "react";
import {
  Box,
  Dialog,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
  Typography,
} from "@mui/material";

import {
  ImportExport,
  AccountBalanceWallet,
  Edit,
  // ArrowRight,
} from "@mui/icons-material";

// import { useTransferAmountMutation } from "../services/authApis";

import { useSelector } from "react-redux";
import BoxMain from "./BoxMain";
import { ButtonBorder, ButtonMain, CustomInput } from "../componenets";

import { bitcoin, Solana, Ethereum, btc } from "../assets";
// eslint-disable-next-line import/no-cycle
// import SearchModal from "./modals/SearchModal";
import { useTransferAmountMutation } from "../services/transferApis";
import Toastify from "../connectivityAssets/Toastify";
import Loading from "../componenets/Loading";

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DashboardPaySend = ({ setCurrency, currency }) => {
  // const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [inputValue, setInputValue] = useState({
    amount: "",
    email: "",
  });
  // console.log("================currency=======", currency);
  const { userDbData } = useSelector((store) => store.global);

  const [transferAmount, { isLoading }] = useTransferAmountMutation();
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  let table = [
    {
      heading: "Pay with",
      text: currency.toUpperCase(),
      img:
        currency === "usdt"
          ? btc
          : currency === "eth"
          ? Ethereum
          : currency === "sol"
          ? Solana
          : bitcoin,
    },
    {
      heading: "To",
      text: "Mobile or Email ",
      Icon: AccountBalanceWallet,
    },
    {
      heading: "Notice",
      text: "Optional Message",
      Icon: Edit,
    },
  ];
  console.log(isLoading);
  const showToast = (msg, type) => {
    return setAlertState({
      open: true,
      message: msg,
      severity: type,
    });
  };

  // const toggelModel = () => {
  //   setOpen(!open);
  // };
  const inputStyle = {
    Input: {
      color: "#fff",
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        fontWeight: 500,

        color: "#fff",
      },
    },

    width: { xs: "70%", lg: "60%" },
    mt: { xs: 3, md: 0 },
    "& .css-k0eu5g-MuiTypography-root": {
      fontSize: { xs: 20, sm: 30, lg: inputValue.amount.length > 6 ? 17 : 40 },
      fontFamily: "Audiowide",
      color: "#fff",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
  };

  const handleClose = () => setOpen1(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      if (value.match(/^[0-9]*[.]?[0-9]*$/)) {
        setInputValue((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setInputValue((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setOpen1(true);
  };

  const handleSubmit = useCallback(async () => {
    try {
      handleClose();
      if (currency === "usdt") {
        if (Number(inputValue?.amount) > userDbData?.usdtBalance) {
          showToast(
            "You do have not enough balance for the transaction",
            "error"
          );
        }
      } else if (!userDbData?.[`${currency}Vault`]) {
        showToast(`You don't have ${currency} Vault!`, "error");
      } else if (
        userDbData?.[`${currency}Vault`]?.balance < Number(inputValue?.amount)
      ) {
        showToast(
          "You do have not enough balance for the transaction",
          "error"
        );
      } else {
        console.log("currency", currency);
        const data = await transferAmount({
          amount: inputValue?.amount,
          email: inputValue?.email,
          vaultType: currency ?? "usdt",
        }).unwrap();
        showToast(data?.message, "success");
        setInputValue({
          amount: "",
          email: "",
        });
      }
    } catch (error) {
      console.log(error);
      showToast(error?.data?.message, "error");
    }
  }, [currency, inputValue, transferAmount, userDbData]);
  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      {/* <SearchModal open={open} setOpen={setOpen} toggelModel={toggelModel} /> */}
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Loading loading={isLoading} />

      <Dialog
        open={open1}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            background:
              "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",
            backdropFilter: "blur(5px)",
            borderRadius: "15px",
            border: "2px solid transparent",
            padding: "30px",
          },
        }}
      >
        <Typography variant="h4" align="center">
          Are you sure you want to send?
        </Typography>
        <Box display="flex" gap={2} mt={3}>
          <ButtonBorder sx={{ width: "50%" }} onClick={handleClose}>
            no
          </ButtonBorder>
          <ButtonMain ButtonMain sx={{ width: "50%" }} onClick={handleSubmit}>
            Yes
          </ButtonMain>
        </Box>
      </Dialog>
      <Box align="center">
        <Box sx={{ float: "right" }}>
          <IconButton
            onClick={() => setCurrency("usdt")}
            sx={{
              background:
                "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
            }}
          >
            <ImportExport sx={{ color: "#000" }} />
          </IconButton>
          <Typography fontSize="12px" fontWeight="400" mt={1}>
            {currency.toUpperCase()}
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmitForm}>
          <TextField
            value={inputValue?.amount}
            sx={inputStyle}
            placeholder="0"
            name="amount"
            onChange={handleChange}
            required
            InputProps={{
              sx: {
                fontSize: {
                  xs: 20,
                  sm: 30,
                  lg: inputValue?.amount.length > 6 ? 17 : 40,
                },
                color: "#fff",
                fontFamily: "Audiowide",
                justifyContent: "center",
              },
              startAdornment: (
                <InputAdornment position="start">
                  {currency.toUpperCase()}
                </InputAdornment>
              ),
            }}
          />

          <CustomInput
            placeholder="Enter email address"
            type="email"
            name="email"
            value={inputValue?.email}
            onChange={handleChange}
            required
          />
          <Typography fontSize="12px" sx={{ pt: 2, pb: 3 }}>
            You don`t have any Bitcoin to send. Try buying some to get started.
          </Typography>

          <ButtonMain
            type="submit"
            className="hvr-bounce-to-right"
            sx={{ px: 3 }}
            // onClick={() => setOpen1(true)}
          >
            Send
          </ButtonMain>
        </Box>
      </Box>
      <BoxMain mt={3} py={2} sx={{ px: "0px !important" }}>
        {table.map(({ heading, text, Icon, img }, ind) => (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            key={ind}
            width="100%"
            borderBottom={heading !== "Notice" ? "1px solid #E1AE3C" : "none"}
          >
            <Typography sx={{ width: "30%", pl: { xs: 1, sm: 2 }, py: 1 }}>
              {heading}
            </Typography>
            {img ? <img src={img} alt="bitcoin" width="25px" /> : <Icon />}
            <Typography sx={{ width: "60%", ml: 1 }}>{text}</Typography>
            <Box sx={{ width: "10%" }}> </Box>
          </Box>
        ))}
      </BoxMain>
      {/* <ButtonMain
        className="hvr-bounce-to-right"
        sx={{ width: "100%", py: 1, my: 2 }}
      >
        Continue
      </ButtonMain> */}
      <Box
        px={2}
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle">{`${currency.toUpperCase()} Balance`}</Typography>
        {currency === "usdt" ? (
          <>
            {" "}
            <Typography variant="subtitle">
              {userDbData?.usdtBalance ?? 0}
            </Typography>
          </>
        ) : (
          <>
            {userDbData?.[`${currency}Vault`] ? (
              <Typography variant="subtitle">
                {userDbData?.[`${currency}Vault`].balance}
              </Typography>
            ) : (
              <Typography variant="subtitle">0</Typography>
            )}
          </>
        )}
      </Box>
      {/* <BoxMain mt={2} p={2}>
        <Typography sx={{ fontFamily: "Audiowide", fontSize: "18px" }}>
          Transactions
        </Typography>
        <Box diaplsy="flex" py={1}>
          <Typography variant="subtitle" fontWeight="700" mr={5}>
            Send
          </Typography>
          <Typography variant="subtitle">Receive</Typography>
        </Box>
        <Typography variant="subtitle">
          Send crypto to any email address in 100+ countries instantly and free.
        </Typography>
      </BoxMain> */}
    </Box>
  );
};

export default DashboardPaySend;
