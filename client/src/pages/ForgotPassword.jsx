import { Container, Typography, Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonMain from "../componenets/ButtonMain";
import TopNavSignin from "../componenets/TopNavSignin";
import CustomInput from "../componenets/CustomInput";
import { useResetPassMutation } from "../services/authApis";
import Toastify from "../connectivityAssets/Toastify";
import Loading from "../connectivityAssets/Loading";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const showToast = (msg, type) => {
    return setAlertState({
      open: true,
      message: msg,
      severity: type,
    });
  };
  const [email, setEmail] = useState("");
  const [resetPass] = useResetPassMutation();

  const handleForgotPassword = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        setLoading(true);
        console.log(email);
        const data = await resetPass(email).unwrap();
        console.log("forget password response ===========>>>>>>>>>", data);
        // showToast(data?.message, "success");
        setLoading(false);

        navigate("/email-verification", {
          state: { email },
        });

        // setTimeout(() => {
        //   navigate("/verify-otp", {
        //     state: { email, isReset: true },
        //   });
        // }, 3000);
      } catch (error) {
        console.log(error);
        setLoading(false);
        showToast(error?.data?.message, "error");
      }
    },
    [email, resetPass]
  );

  return (
    <Box>
      <TopNavSignin />
      <Loading isLoading={loading} />

      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Container maxWidth="xs">
        <Typography align="center" variant="h3" mt={6}>
          Forgot your password?
        </Typography>
        <Typography variant="body2" align="center" mt={2}>
          Reset your password with a device you`ve recently used to access
          Coinbase to avoid a temporary security restriction
        </Typography>
        <Typography mt={2}>Email</Typography>
        <CustomInput
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <ButtonMain
          sx={{ width: "100%", py: 2, mt: 3, fontWeight: 800 }}
          onClick={handleForgotPassword}
        >
          Reset Password
        </ButtonMain>
        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <Typography>Don`t have an account yet?</Typography>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Typography pl={0.5} sx={{ color: "#D09B03", cursor: "pointer" }}>
              {" "}
              Sign Up
            </Typography>
          </Link>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
          <Typography>Already have an account?</Typography>
          <Link to="/sign-in" style={{ textDecoration: "none" }}>
            <Typography pl={0.5} sx={{ color: "#D09B03", cursor: "pointer" }}>
              {" "}
              Sign In
            </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
