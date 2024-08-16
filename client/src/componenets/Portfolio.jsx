import React from "react";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import bg from "../assets/bgOne.png";
import sectiontwo from "../assets/section-two-img.png";
import icon from "../assets/Bitcoin.png";
import ButtonMain from "./ButtonMain";

const inputStyle = {
  Input: {
    color: "#9B9999",
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 500,
      fontSize: "14px",
      color: "#9B9999",
    },
  },
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: "15px",
  mr: "10px",
  py: "8px",
  borderTopLeftRadius: "15px",
  borderBottomLeftRadius: "15px",
  borderTopRightRadius: "0px",
  borderBottomRightRadius: "0px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
};

const Portfolio = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} py="50px">
            <Grid item xs={12} md={5} mt={{ xs: "50px", md: "100px" }}>
              <Box display="flex" flexDirection="column" rowGap="20px">
                <div data-aos="fade-down" data-aos-duration="3000">
                  <Box display="flex" alignItems="center">
                    <img src={icon} style={{ width: "30px" }} alt="img" />
                    <Typography fontFamily="Roboto" pl={1} pr={0.5}>
                      Jump start your portfolio
                    </Typography>
                    <ArrowForwardIcon fontSize="small" />
                  </Box>
                </div>
                <div data-aos="fade-right" data-aos-duration="3000">
                  <Typography variant="h1">
                    Jump start your crypto portfolio.
                  </Typography>
                </div>
                <div data-aos="fade-left" data-aos-duration="3000">
                  <Typography fontFamily="Roboto">
                    Coinbase is the easiest place to buy and sell
                    cryptocurrency. Sign up and get started today.
                  </Typography>
                </div>
                <div data-aos="fade-up" data-aos-duration="3000">
                  <Box display="flex" width="100%">
                    <TextField
                      sx={{
                        ...inputStyle,
                      }}
                      placeholder="Enter the Email"
                      size="small"
                      fullWidth
                    />
                    <ButtonMain
                      className="hvr-bounce-to-right"
                      sx={{
                        width: "50%",
                        ml: "-30px",
                        fontSize: "16px",
                      }}
                    >
                      Get started
                    </ButtonMain>
                  </Box>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box>
                <img
                  className="img_moving "
                  src={sectiontwo}
                  alt="mobileimg"
                  width="100%"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Portfolio;
