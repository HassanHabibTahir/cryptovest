import React, { useCallback, useState } from "react";
import {
  Container,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  // useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ButtonMain from "../componenets/ButtonMain";
import TopNavSignin from "../componenets/TopNavSignin";
import CustomInput from "../componenets/CustomInput";
import { useChangePassMutation } from "../services/authApis";
import Toastify from "../connectivityAssets/Toastify";
import Loading from "../connectivityAssets/Loading";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [changePass] = useChangePassMutation();
  const [confirmPassword, setConfirmPassword] = useState();
  const [resetPassParam, setResetPassParam] = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  // const location = useLocation();

  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  // eslint-disable-next-line operator-linebreak
  const resetPassUserId =
    new URLSearchParams(resetPassParam).get("token") || false;
  // const token = location?.state?.token;

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, [navigate, token]);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  const showToast = (msg, type) => {
    return setAlertState({
      open: true,
      message: msg,
      severity: type,
    });
  };

  const handleResetPassword = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        if (password.length < 8) {
          showToast("Minume 8 characters are required !", "error");
          return;
        }
        if (password !== confirmPassword) {
          showToast("Password and confirm password should be same", "error");
          return;
        }
        setLoading(true);
        const data = await changePass({
          token: resetPassUserId,
          password,
        }).unwrap();

        showToast(data?.message, "success");
        resetPassParam.delete("token");
        setResetPassParam(resetPassParam);
        setLoading(false);
        setTimeout(() => {
          navigate("/sign-in");
        }, 3000);
      } catch (error) {
        showToast(error?.data?.message, "error");
        setLoading(false);
      }
    },
    [
      password,
      confirmPassword,
      changePass,
      resetPassUserId,
      resetPassParam,
      setResetPassParam,
      navigate,
    ]
  );
  return (
    <Box>
      <TopNavSignin />
      <Loading isLoading={loading} />

      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Container maxWidth="xs">
        <Typography align="center" variant="h3" mt={6}>
          Reset Password
        </Typography>
        <Typography mt={2}>Choose a password</Typography>
        <CustomInput
          onChange={(e) => setPassword(e.target.value)}
          placeholder="........"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{ color: "#fff" }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Typography mt={2}>Confirm password</Typography>
        <CustomInput
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="........"
          type={showConfirmPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{ color: "#fff" }}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <ButtonMain
          onClick={handleResetPassword}
          sx={{ width: "100%", py: 2, mt: 3, fontWeight: 800 }}
        >
          update password
        </ButtonMain>
      </Container>
    </Box>
  );
};

export default ResetPassword;
