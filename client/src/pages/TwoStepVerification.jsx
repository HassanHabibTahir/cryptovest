import React, { useState, useEffect, useCallback } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

// import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import logo from "../assets/logo.png";
import ButtonMain from "../componenets/ButtonMain";
import { useSendSmsCodeMutation } from "../services/authApis";
import Toastify from "../connectivityAssets/Toastify";
import Loading from "../connectivityAssets/Loading";

const phoneNotValid = {
  open: true,
  message: "Phone Number Not Valid",
  severity: "error",
};

const TwoStepVerification = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { userDbData } = useSelector((store) => store.global);
  const [number, setNumber] = useState();
  const [sendCode] = useSendSmsCodeMutation();
  const [loading, setLoading] = React.useState(false);

  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  useEffect(() => {
    if (!token || userDbData) {
      navigate("/");
      console.log(!token, userDbData);
    }
  }, [navigate, token, userDbData]);

  const handleSendCode = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        setLoading(true);
        const result = await sendCode({ number }).unwrap();
        console.log(result);
        setLoading(false);
        navigate("/two-step-code", { state: { number } });
      } catch (i) {
        console.log(i);
        setAlertState(phoneNotValid);
        setLoading(false);
      }
    },
    [navigate, number, sendCode]
  );

  return (
    <Box py="50px">
      <Loading isLoading={loading} />

      <Box textAlign="center">
        <img src={logo} alt="logo" />
        <Typography variant="h2" sx={{ mt: "20px" }}>
          Set up two-step verification
        </Typography>
      </Box>
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <form onSubmit={handleSendCode}>
        <Container maxWidth="xs">
          <Box py="20px">
            <Typography align="left" mt={2}>
              Phone Number
            </Typography>
            <PhoneInput
              onChange={(e) => setNumber(e)}
              required
              international
              defaultCountry="PK"
              inputExtraProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              style={{
                border: "none",
                outline: "none",
                color: "black",
              }}
            />
            <Box sx={{ mt: "40px" }}>
              <Typography variant="gery">
                Security is critical at Coinbase. To help keep your account
                safe, we&#39;ll text you a verification code when you sign in on
                a new device.
              </Typography>
            </Box>

            <ButtonMain
              className="hvr-bounce-to-right"
              type="submit"
              fullWidth
              sx={{ py: 2, mt: 3 }}
            >
              Send Codes
            </ButtonMain>
          </Box>
        </Container>
      </form>
    </Box>
  );
};

export default TwoStepVerification;
