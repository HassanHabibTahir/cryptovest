import React from "react";
import { Box, Button, Container, Modal, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "400px", xs: "70%" },
  bgcolor: "transparent",
  overFlowY: "scroll",
};

const DepositeModal = ({ open, setOpen, toggelModel }) => {
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
                right: { md: "20px", xs: "10px" },
                top: { md: "20px", xs: "5px" },
                color: "white",
                zIndex: 1000000,
              }}
              onClick={toggelModel}
            >
              <CloseIcon sx={{ color: "white", fontSize: "35px" }} />
            </Button>

            <Stack
              justifyContent="space-between"
              alignItems="center"
              direction="row"
              py="20px"
              sx={{ border: "1px solid #EDD07C" }}
            >
              ls
            </Stack>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};

export default DepositeModal;
