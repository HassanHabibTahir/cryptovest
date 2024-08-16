/* eslint-disable no-unsafe-optional-chaining */
import React, { useCallback, useState } from "react";
import {
  Box,
  Container,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import {
  CheckCircle,
  CheckCircleOutline,
  Email,
  PhoneEnabled,
  ErrorOutline,
  AccessTime,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// eslint-disable-next-line import/no-cycle
import { BoxMain } from "../../dashboard";
import { ButtonMain } from "../../componenets";
import {
  useGenrateBtcVaultMutation,
  useGenrateEthVaultMutation,
  useGenrateSolVaultMutation,
} from "../../services/vaultApi";
import Loading from "../../connectivityAssets/Loading";
import Toastify from "../../connectivityAssets/Toastify";
import { useGetUserMutation } from "../../services/authApis";
import { setUserDbData } from "../../slices";

const StyledDevider = styled(Divider)({
  background:
    "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
  height: "2px",
  marginTop: "20px",
});

const VaultCreationCompleted = () => {
  const dispatch = useDispatch();
  const { userDbData } = useSelector((store) => store.global);
  const nevigate = useNavigate();
  const [genrateBtcVault] = useGenrateBtcVaultMutation();
  const [genrateEthVault] = useGenrateEthVaultMutation();
  const [genrateSolVault] = useGenrateSolVaultMutation();
  const [getUser] = useGetUserMutation();

  const [loading, setLoading] = React.useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  const showToast = useCallback((msg, type) => {
    return setAlertState({
      open: true,
      message: msg,
      severity: type,
    });
  }, []);
  const { vault, vaultName } = useParams();
  // console.log(vault, vaultName, "WALLET TYPE");

  const createWalletHandler = useCallback(async () => {
    try {
      setLoading(true);
      if (vault === "BTC") {
        await genrateBtcVault({ vaultName }).unwrap();
      } else if (vault === "ETH") {
        await genrateEthVault({ vaultName }).unwrap();
      } else {
        await genrateSolVault({ vaultName }).unwrap();
      }

      const dbData = await getUser().unwrap();
      dispatch(setUserDbData(dbData));

      showToast(`${vaultName}`, "success");
      setLoading(false);
      setTimeout(() => {
        nevigate("/dashboard/trade");
      }, 3000);
    } catch (error) {
      showToast(error?.data?.message, "error");
      console.error(error);
      setLoading(false);
    }
  }, [
    dispatch,
    genrateBtcVault,
    genrateEthVault,
    genrateSolVault,
    getUser,
    nevigate,
    showToast,
    vault,
    vaultName,
  ]);
  return (
    <Container maxWidth="sm">
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Loading isLoading={loading} />
      <BoxMain mt="40px">
        <Box textAlign="center">
          <CheckCircle sx={{ fontSize: "45px" }} />
          <Typography sx={{ mt: "10px" }} variant="h3">
            Complete Your Vault
          </Typography>
        </Box>
        <StyledDevider />
        <Box mt="20px" px="20px">
          <Stack direction="row" columnGap={1}>
            <CheckCircleOutline />
            <Box>
              <Typography fontSize="20px">Approvers</Typography>
              <Box display="flex" alignItems="center" columnGap={1}>
                <Email fontSize="small" />
                <Typography variant="body2">{userDbData?.email}</Typography>
              </Box>
            </Box>
          </Stack>
        </Box>
        <StyledDevider />
        <Box mt="20px" px="20px">
          <Stack direction="row" columnGap={1}>
            <ErrorOutline />
            <Box>
              <Typography fontSize="20px">Notificatins</Typography>
              <Box display="flex" alignItems="center" columnGap={1}>
                <Email fontSize="small" />
                <Typography variant="body2">
                  {`${userDbData?.email?.slice(
                    0,
                    1
                  )}****${userDbData?.email?.slice(-9)}`}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" columnGap={1}>
                <PhoneEnabled fontSize="small" />
                <Typography variant="body2">
                  {" "}
                  {`${userDbData?.number?.slice(
                    0,
                    1
                  )}xxxxxxxx${userDbData?.number?.slice(-2)}`}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Box>
        <StyledDevider />

        <Box mt="20px" px="20px">
          <Stack direction="row" columnGap={1}>
            <AccessTime />
            <Box>
              <Typography fontSize="20px">Time delay</Typography>
              <Typography variant="body2">48h</Typography>
            </Box>
          </Stack>
        </Box>
        <StyledDevider />

        <Box textAlign="center">
          <ButtonMain
            sx={{ mt: "20px", px: "20px" }}
            onClick={createWalletHandler}
          >
            Create Your Vault
          </ButtonMain>
        </Box>
      </BoxMain>
    </Container>
  );
};

export default VaultCreationCompleted;
