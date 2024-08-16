import React from "react";
import { Box, Container, Modal } from "@mui/material";
import AddPaymentmethad from "../PaymentMethod/AddPaymentmethad";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "450px", xs: "100%" },
  background:
    "linear-gradient(180deg, rgba(34, 34, 34, 1) -12.28%, rgba(205, 165, 72, 1) 97.96%)",
  borderRadius: "15px",
};

const AddpaymountModal = ({ open, setOpen, toggelModel }) => {
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
          <Box position="relative">
            <AddPaymentmethad toggelModel={toggelModel} />
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};

export default AddpaymountModal;
