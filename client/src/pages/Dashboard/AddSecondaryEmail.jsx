import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { Box, Container, Divider, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";

import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import KeyIcon from "@mui/icons-material/Key";

import BoxMain from "../../dashboard/BoxMain";
import { ButtonMain, CustomInput } from "../../componenets";
import { useVerifySecondaryEmailMutation } from "../../services/authApis";
import Toastify from "../../connectivityAssets/Toastify";

const AddSecondaryEmail = () => {
  const { vault } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const { userDbData } = useSelector((store) => store.global);
  const [registerEmail] = useVerifySecondaryEmailMutation();
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

  const handleSecondaryEmailSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await registerEmail(email).unwrap();
      navigate("/dashboard/confirm-secondry-email");
      showToast(data?.message, "success");
    } catch (error) {
      showToast(error?.data?.message, "error");
    }
  };

  return (
    <>
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Container maxWidth="sm">
        <BoxMain sx={{ p: 4, my: { md: 10, xs: 3 } }}>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <KeyIcon sx={{ fontSize: "45px" }} />
            <Typography variant="h3">Add a Secondary Email</Typography>
            <Typography variant="h4" textAlign="center">
              Every withdrawal from your vault will need to be approved from two
              email addresses.
            </Typography>
          </Box>
          <Divider
            sx={{
              my: 3,
              background:
                "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
              height: "2px",
            }}
          />
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            // alignItems="center"
            gap={1}
          >
            <Typography variant="body">Primary Email</Typography>
            <Typography variant="body">{userDbData?.email}</Typography>
          </Box>
          <Divider
            sx={{
              my: 3,
              background:
                "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
              height: "2px",
            }}
          />
          <form onSubmit={handleSecondaryEmailSubmit}>
            <Typography variant="body">Secondary Email</Typography>
            <CustomInput
              placeholder="email@example.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Divider
              sx={{
                my: 3,
                background:
                  "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
                height: "2px",
              }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link
                to={`/dashboard/vault-name-setup/${vault}`}
                style={{ textDecoration: "none" }}
              >
                <ButtonMain p={1} startIcon={<ArrowCircleLeftOutlinedIcon />}>
                  previous
                </ButtonMain>
              </Link>

              <ButtonMain
                type="submit"
                p={1.5}
                endIcon={<ArrowCircleRightOutlinedIcon />}
              >
                Next
              </ButtonMain>
            </Box>
          </form>
        </BoxMain>
      </Container>
    </>
  );
};

export default AddSecondaryEmail;
