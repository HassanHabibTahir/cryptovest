import React from "react";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

import { ArrowBack, Search } from "@mui/icons-material";
import BoxMain from "../BoxMain";
import { ButtonBorder } from "../../componenets";

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

const SearchModal = ({ open, setOpen, toggelModel }) => {
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
            <BoxMain>
              <IconButton
                onClick={toggelModel}
                sx={{
                  float: "left",
                  background:
                    "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
                }}
              >
                <ArrowBack sx={{ color: "#000" }} />
              </IconButton>
              <Typography align="center" variant="h4">
                Select asset
              </Typography>
              <TextField
                type="search"
                fullWidth
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#fff" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mt: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "1px solid #E1AE3C",
                    },
                    "&:hover fieldset": {
                      border: "1px solid #E1AE3C",
                    },
                    "&.Mui-focused fieldset": {
                      border: "1px solid #E1AE3C",
                    },
                  },
                }}
              />
              <Box
                height="300px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography mb={2}>No results for </Typography>
                <ButtonBorder>clear search</ButtonBorder>
              </Box>
            </BoxMain>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};

export default SearchModal;
