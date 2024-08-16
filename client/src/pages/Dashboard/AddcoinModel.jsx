import React from "react";

import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ContentCopy, DoneAll } from "@mui/icons-material";

import QRCode from "react-qr-code";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overFlowY: "scroll",
  backgroundColor: "#2A2A29",
  borderRadius: "20px",
};

const AddcoinModel = ({ open, setOpen, toggelModel, vaultType, qr }) => {
  const handleClose = () => setOpen(false);
  // const [qr, _setQr] = useState("Baber ali");
  const [copy, setCopy] = React.useState(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflow: "scroll" }}
    >
      <Box p={2} sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">
            Transfer into
            {` ${vaultType} `}
            vault
          </Typography>

          <Button onClick={toggelModel}>
            <CloseIcon sx={{ color: "white", fontSize: "35px" }} />
          </Button>
        </Box>
        <Divider
          sx={{
            my: 3,
            background:
              "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
            height: "2px",
          }}
        />
        <div style={{ background: "white", padding: "30px" }}>
          {qr ? (
            <QRCode id="myqr" value={qr} size={320} background="#fff" />
          ) : (
            <p>No QR code preview</p>
          )}
        </div>
        <Divider
          sx={{
            my: 3,
            background:
              "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
            height: "2px",
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            {" "}
            {` ${vaultType} `}
            Adress
          </Typography>
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
          {/* <ContentCopyIcon sx={{ cursor: "pointer" }} /> */}
        </Box>
        <Box fontSize="14px">{qr}</Box>
      </Box>
    </Modal>
  );
};

export default AddcoinModel;
