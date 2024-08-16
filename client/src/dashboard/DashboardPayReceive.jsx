import { Box, Typography, Divider, IconButton, Tooltip } from "@mui/material";
import { ContentCopy, DoneAll } from "@mui/icons-material";
import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BoxMain from "./BoxMain";
import { ButtonMain } from "../componenets";

const DashboardPayReceive = ({ currency, handleClose }) => {
  const textAreaRef = React.useRef(null);
  const [copy, setCopy] = React.useState(false);
  const [qr, setQr] = React.useState("");
  const { userDbData } = useSelector((store) => store.global);
  console.log(userDbData);
  const navigate = useNavigate();

  // const [qr, setQr] = React.useState("0X5df5sd5g5dfg28dfsadf59sda15fsdafx5d8h");

  // let account = "0X5df5sd5g5dfg28dfsadf59sda15fsdafx5d8h";
  const handelClick = () => {
    handleClose(false);
    // to="/dashboard/home"
    navigate("/dashboard/home");
  };
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    currency === "usdt"
      ? setQr(
          userDbData?.ethVault?.publicKey ?? userDbData?.solVault?.publicKey
        )
      : currency === "eth"
      ? setQr(userDbData?.ethVault?.publicKey)
      : currency === "sol"
      ? setQr(userDbData?.solVault?.publicKey)
      : setQr(userDbData?.btcVault?.publicKey);
  }, [currency, userDbData]);

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      {/* <Box display="flex" alignItems="center" sx={{ color: "#E1AE3C" }}>
        <Typography variant="h4" fontWeight="700">
          Bitcoin
        </Typography>
        <KeyboardArrowRight fontSize="large" />
      </Box> */}
      {/* <Typography>{`${currency.toUpperCase()} vault`}</Typography> */}
      {qr ? (
        <BoxMain sx={{ mt: 3, p: "0px !important" }}>
          <Box
            align="center"
            p={3}
            sx={{
              background: "#fff",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
            }}
          >
            <QRCode id="myqr" value={qr} size={200} background="#fff" />
          </Box>
          <Divider
            sx={{
              background:
                "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
              height: "2px",
            }}
          />
          <Box px={{ xs: 1, md: 3 }} py={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontWeight="700">{`${currency.toUpperCase()} address`}</Typography>
              <Tooltip title={copy ? "coppied" : "copy"} placement="top">
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(qr);
                    setCopy(true);
                  }}
                >
                  {copy ? (
                    <DoneAll sx={{ color: "#E1AE3C" }} />
                  ) : (
                    <ContentCopy sx={{ color: "#E1AE3C" }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
            <Typography ref={textAreaRef}>
              {`${qr.slice(0, 4)} ... ${qr.slice(-4)}`}
            </Typography>
          </Box>
        </BoxMain>
      ) : (
        <BoxMain sx={{ mt: 3, textAlign: "center" }}>
          <Typography>
            {" "}
            {`You don't have ${currency} vault! Go to hame page by clicking on the button bellow and create your ${currency} vault`}
          </Typography>
          <ButtonMain
            sx={{ mt: 3 }}
            className="hvr-bounce-to-right"
            onClick={handelClick}
          >
            create vault
          </ButtonMain>
        </BoxMain>
      )}
    </Box>
  );
};

export default DashboardPayReceive;
