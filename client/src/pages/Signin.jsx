import {
  Container,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import ButtonBorder from "../componenets/ButtonBorder";
import ButtonMain from "../componenets/ButtonMain";
import TopNavSignin from "../componenets/TopNavSignin";
import CustomInput from "../componenets/CustomInput";
import Loading from "../connectivityAssets/Loading";
import {
  useLoginUserMutation,
  // useSendMailConfirmationMutation,
  useSendSmsCodeMutation,
} from "../services/authApis";
import Toastify from "../connectivityAssets/Toastify";

const Signin = () => {
  const [sendCode] = useSendSmsCodeMutation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [login] = useLoginUserMutation();
  // const [sendMail] = useSendMailConfirmationMutation();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const showToast = useCallback((msg, type) => {
    return setAlertState({
      open: true,
      message: msg,
      severity: type,
    });
  }, []);

  const handleSignIn = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        setLoading(true);
        const data = await login({ email, password }).unwrap();
        console.log("signin resposense:===========>>>>>>>", data);
        if (data?.token) {
          localStorage.setItem("token", data?.token);
        }
        showToast(data?.message, "success");
        if (!data?.user?.isVerified) {
          setTimeout(() => {
            navigate("/verify-otp", {
              state: { email: data?.user?.email },
            });
          }, 3000);
        } else if (!data?.user?.twoStepVerification) {
          // setTimeout(() => {
          navigate("/two-step-verification");
          // }, 3000);
        } else {
          // Two Step Verification
          await sendCode({ number: data?.user?.number }).unwrap();
          navigate("/two-step-code", {
            state: { number: data?.user?.number },
          });
        }

        // setTimeout(() => {
        //   navigate("/verify-otp", {
        //     state: { email: data?.email },
        //   });
        // }, 3000);
        // If Email Not Verified
        // if (!data?.user?.isVerified) {
        //   const res = await sendMail().unwrap();
        //   showToast(res?.data?.message, "success");
        //   setTimeout(
        //     () =>
        //       // eslint-disable-next-line implicit-arrow-linebreak
        //       navigate("/verify-otp", {
        //         state: { email: data?.user?.email },
        //       }),
        //     3000
        //   );

        //   // navigate("/email-verification", {
        //   //   state: { email: data?.user?.email },
        //   // });
        // } else
        // if (!data?.user?.isVerified) {
        //   setLoading(false);

        //   showToast(data?.message, "success");
        //   setTimeout(
        //     () =>
        //       // eslint-disable-next-line implicit-arrow-linebreak
        //       navigate("/verify-otp", {
        //         state: { email: data?.user?.email },
        //       }),
        //     2000
        //   );
        // } else if (!data?.user?.twoStepVerification) {
        //   setLoading(false);

        //   navigate("/two-step-verification");
        // } else {
        //   // Two Step Verification
        //   await sendCode({ number: data?.user?.number }).unwrap();
        //   navigate("/two-step-code", {
        //     state: { number: data?.user?.number },
        //   });
        // }
        setLoading(false);
      } catch (error) {
        console.error(error);
        showToast(error?.data?.message, "error");
        // showToast(error?.data?.message || "Phone Number Not Valid", "error");
        setLoading(false);
      }
    },
    [email, login, navigate, password, sendCode, showToast]
  );

  return (
    <Box>
      <Loading isLoading={loading} />
      <TopNavSignin signIn />
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Container maxWidth="xs">
        <form onSubmit={handleSignIn}>
          <Typography align="center" variant="h3" mt={6}>
            Sign in to Cryptovest
          </Typography>
          <Typography mt={2}>Email</Typography>
          <CustomInput
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
          />

          <Typography mt={2}>Password</Typography>
          <CustomInput
            required
            placeholder="........"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ color: "#fff" }}
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Link to="/forgot-password" style={{ textDecoration: "none" }}>
            <Typography
              mt={2}
              sx={{
                cursor: "pointer",
                color: "#D09B03",
              }}
            >
              Forgot password?
            </Typography>
          </Link>

          <ButtonMain
            className="hvr-bounce-to-right"
            type="submit"
            sx={{ width: "100%", py: 2, mt: 3, fontWeight: 800 }}
          >
            Sign in
          </ButtonMain>
          <ButtonBorder
            className="hvr-bounce-to-right-sign"
            component={Link}
            to="/register"
            sx={{ width: "100%", py: 2, mt: 2 }}
          >
            Create an account
          </ButtonBorder>
        </form>
      </Container>
    </Box>
  );
};

export default Signin;
