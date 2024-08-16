import React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import ButtonBorder from "./ButtonBorder";

const TopNavSignin = ({ signIn }) => {
  const matches = useMediaQuery("(max-width:900px)");
  return (
    <Box sx={{ background: "#292929", py: "20px" }}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            {signIn && <ArrowBack sx={{ color: "#E1AE3C" }} />}
            <img src={logo} width={matches ? "50px" : "70px"} alt="logo" />
          </Link>
          {!signIn && (
            <Stack
              direction="row"
              columnGap={{ md: 5, xs: 1 }}
              alignItems="center"
            >
              <Typography
                sx={{
                  fontFamily: "'Audiowide', cursive",
                  fontSize: { md: "14px", xs: "12px" },
                }}
              >
                Alerdy have an account?
              </Typography>
              <ButtonBorder
                className="hvr-bounce-to-right-sign"
                component={Link}
                to="/sign-in"
              >
                Sign in
              </ButtonBorder>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default TopNavSignin;
