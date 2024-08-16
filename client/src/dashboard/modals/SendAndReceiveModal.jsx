import React from "react";
import { Box, Button, Container, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import DashboardPayTabs from "../DashboardPayTabs";
import BoxMain from "../BoxMain";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "500px",
  bgcolor: "transparent",
  overFlowY: "scroll",
};

const SendAndReceiveModal = ({ open, setOpen, toggelModel }) => {
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflow: "scroll" }}
    >
      <Container>
        <Box sx={style}>
          <Box position="relative" height={{ md: "70vh", xs: "90vh" }}>
            <Button
              sx={{
                position: "absolute",
                right: 5,
                top: 5,
                color: "white",
                zIndex: 1000000,
              }}
              onClick={toggelModel}
            >
              <CloseIcon sx={{ color: "white", fontSize: "35px" }} />
            </Button>

            <BoxMain sx={{ p: "0 !important" }}>
              <Box mt={5}>
                <DashboardPayTabs handleClose={handleClose} />
              </Box>
            </BoxMain>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};

export default SendAndReceiveModal;
