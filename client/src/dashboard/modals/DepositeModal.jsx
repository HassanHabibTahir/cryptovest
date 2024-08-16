import React from "react";
import {
  Box,
  Container,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import btc from "../../assets/Bitcoin.png";
import mtc from "../../assets/Polygon.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "400px", xs: "70%" },
  background:
    "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
  overFlowY: "scroll",
  borderRadius: "15px",
  px: "10px",
  py: "10px",
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
          <Box position="relative">
            <IconButton
              sx={{
                position: "absolute",
                right: { md: "0px", xs: "0px" },
                top: { md: "-5px", xs: "-5px" },
                color: "white",
                zIndex: 1000000,
              }}
              onClick={toggelModel}
            >
              <CloseIcon sx={{ color: "white", fontSize: "20px" }} />
            </IconButton>
          </Box>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            py="20px"
            px="10px"
            sx={{ border: "1px solid #fff" }}
            mt="30px"
          >
            <Stack alignItems="center" direction="row" columnGap={2}>
              <img width="30px" src={btc} alt="bitcoin" />
              <Typography color="#000"> Deposite Bitcoin </Typography>
            </Stack>
            <IconButton
              sx={{
                "&:hover": {
                  background:
                    "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
                  transition: "0.5s",
                },
              }}
            >
              <ArrowForwardIosIcon sx={{ color: "white", fontSize: "20px" }} />
            </IconButton>
          </Stack>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
            py="20px"
            px="10px"
            sx={{ border: "1px solid #fff" }}
          >
            <Stack alignItems="center" direction="row" columnGap={2}>
              <img width="30px" src={mtc} alt="bitcoin" />
              <Typography color="#000"> Deposite Matic </Typography>
            </Stack>
            <IconButton
              sx={{
                "&:hover": {
                  background:
                    "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
                  transition: "0.5s",
                },
              }}
            >
              <ArrowForwardIosIcon sx={{ color: "white", fontSize: "20px" }} />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Modal>
  );
};

export default DepositeModal;
