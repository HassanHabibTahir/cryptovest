/* eslint-disable operator-linebreak */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";

import { Box, Container, Grid, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";

import { BoxMain } from "../../dashboard";
import { ButtonMain } from "../../componenets";
import AddcoinModel from "./AddcoinModel";
import WithDrawModel from "./WithDrawModel";
import {
  useDepositBTCMutation,
  useDepositEthMutation,
  useDepositSOLMutation,
} from "../../services/vaultApi";
import { setUserDbData } from "../../slices";
import { useGetUserMutation } from "../../services/authApis";
import Loading from "../../connectivityAssets/Loading";

const Addcoin = ({ vaultType }) => {
  const dispatch = useDispatch();
  const [depositeEth, { isLoading: isLoadingEth }] = useDepositEthMutation();
  const [depositeBTC, { isLoading: isLoadingBTC }] = useDepositBTCMutation();
  const [depositeSOL, { isLoading: isLoadingSOL }] = useDepositSOLMutation();
  const [getUser, { isLoading: isLoadingUser }] = useGetUserMutation();

  // deposite API calls

  useEffect(() => {
    async function fetchData() {
      if (vaultType === "ethVault") {
        await depositeEth();
      } else if (vaultType === "solVault") {
        await depositeSOL();
      } else {
        await depositeBTC();
      }
      const dbData = await getUser().unwrap();
      dispatch(setUserDbData(dbData));
    }
    fetchData();
  }, [depositeBTC, depositeEth, depositeSOL, dispatch, getUser, vaultType]);

  const { userDbData } = useSelector((store) => store.global);

  const [open, setOpen] = useState(false);
  const [withdraw, setWithdraw] = useState(false);

  const toggelModel = () => {
    setOpen(!open);
  };
  const toggelModelWithdraw = () => {
    setWithdraw(!withdraw);
  };
  return (
    <>
      <Loading
        isLoading={
          isLoadingUser || isLoadingEth || isLoadingSOL || isLoadingBTC
        }
      />
      <AddcoinModel
        setOpen={setOpen}
        open={open}
        toggelModel={toggelModel}
        vaultType={vaultType}
        qr={userDbData?.[vaultType]?.publicKey}
      />

      <WithDrawModel
        setWithdraw={setWithdraw}
        withdraw={withdraw}
        toggelModel={toggelModelWithdraw}
        vault={vaultType}
      />

      <Box mt={5}>
        <Container>
          <Grid container spacing={2}>
            <Grid item md={8} xs={12} sm={6}>
              <BoxMain
                height="100%"
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                gap={4}
                py={3}
              >
                {userDbData?.[vaultType]?.balance > 0 ? (
                  <>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Typography variant="body">Balance:</Typography>
                      <Typography variant="body">
                        {userDbData?.[vaultType]?.balance.toFixed(3)}
                        {` ${vaultType}`}
                      </Typography>
                    </Box>
                    <Box display="flex" gap="20px">
                      <Typography variant="body">
                        Refresh the page to update your balance
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography variant="body">
                      Looks like there isn&lsquo;t any
                      {`${vaultType}`}
                      in your vault yet
                    </Typography>
                  </>
                )}

                {userDbData?.[vaultType]?.balance > 0 ? (
                  <>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Typography variant="body">USDT Balance:</Typography>
                      <Typography variant="body">
                        {userDbData?.usdtBalance}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography variant="body">
                      Looks like there isn&lsquo;t any USDT in your vault yet
                    </Typography>
                  </>
                )}
                <ButtonMain onClick={toggelModel} sx={{ p: 1.5 }}>
                  Add to
                  {` ${vaultType}`}
                </ButtonMain>
              </BoxMain>
            </Grid>
            <Grid item md={4} xs={12} sm={6}>
              <BoxMain height="100%">
                <Box display="flex" alignItems="center">
                  <ButtonMain
                    sx={{ p: 1, mr: 1, fontSize: "12px" }}
                    onClick={toggelModel}
                  >
                    Add to vault
                  </ButtonMain>
                  <ButtonMain
                    onClick={toggelModelWithdraw}
                    sx={{ p: 1, fontSize: "12px" }}
                  >
                    Withdraw with vault
                  </ButtonMain>
                </Box>

                <Box display="flex" alignItems="center" gap={2} mt={2}>
                  <InfoIcon sx={{ fontSize: "38px" }} />
                  <Typography variant="h4">Vault details</Typography>
                </Box>
                <Box mt={1} display="flex" alignItems="center" gap={2}>
                  <HighlightOffIcon sx={{ fontSize: "38px" }} />
                  <Typography variant="h4">Delete vault</Typography>
                </Box>
              </BoxMain>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Addcoin;
