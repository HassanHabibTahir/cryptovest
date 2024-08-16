/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useCallback, useEffect, useState } from "react";

import { Box, Container, Typography } from "@mui/material";
import AuthCode from "react-auth-code-input";
import { useLocation, useNavigate } from "react-router";
// import { useDispatch } from "react-redux";

import logo from "../assets/logo.png";
import ButtonMain from "../componenets/ButtonMain";
import { useVerifyOtpMutation } from "../services/authApis";
import Toastify from "../connectivityAssets/Toastify";
import Loading from "../connectivityAssets/Loading";

// import { setIsLoggedIn, setUserDbData } from "../slices";

const codeNotValid = {
  open: true,
  message: "Code is wrong",
  severity: "error",
};

const VerifyOtp = () => {
  // const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const [result, setResult] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email;
  const isReset = location?.state?.isReset;
  console.log("isReset", isReset);

  const [verifyOtp] = useVerifyOtpMutation();
  const handleOnChange = (res) => {
    setResult(res);
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [navigate, email]);

  const handleVerifySmsCode = useCallback(async () => {
    setLoading(true);
    try {
      if (result.length < 6) {
        setAlertState(codeNotValid);
        setLoading(false);
      } else {
        console.log(result, "result");
        const res = await verifyOtp({ otp: result, isReset });
        console.log("verifyOtp:====", res?.data);
        // console.log("verify otp: ", response);
        localStorage.setItem("token", res?.data?.token);

        // if (response?.error || response?.data?.status !== "approved") {
        //   setAlertState(codeNotValid);
        //   setLoading(false);
        // } else {

        // dispatch(setUserDbData(data?.user));
        // dispatch(setIsLoggedIn(true));

        // setTimeout(() => {

        if (isReset) {
          navigate("/reset-password", {
            state: { token: res?.data?.token },
          });
        } else {
          navigate("/two-step-verification");
        }
        // }, 2000);
        setLoading(false);
      }
      // }
    } catch (err) {
      setLoading(false);
    }
  }, [isReset, navigate, result, verifyOtp]);

  return (
    <Box py="50px">
      <Loading isLoading={loading} />

      <Box textAlign="center">
        <img src={logo} alt="logo" />
        <Toastify setAlertState={setAlertState} alertState={alertState} />
        <Typography variant="h2" sx={{ mt: "20px" }}>
          Verify OTP
        </Typography>
      </Box>
      <Container maxWidth="xs">
        <Box py="20px">
          <Typography align="left" mt={2}>
            Enter Code
          </Typography>
          <AuthCode
            allowedCharacters="numeric"
            onChange={handleOnChange}
            inputClassName="input"
            containerClassName="container"
            length={6}
          />

          <Box sx={{ mt: "40px" }}>
            <Typography variant="gery">
              Security is critical at Coinbase. To help keep your account safe,
              we&#39;ll text you a verification code when you sign in on a new
              device.
            </Typography>
          </Box>

          <ButtonMain
            className="hvr-bounce-to-right"
            onClick={handleVerifySmsCode}
            fullWidth
            sx={{ py: 2, mt: 3 }}
          >
            Confirm Code
          </ButtonMain>
        </Box>
      </Container>
    </Box>
  );
};

export default VerifyOtp;
