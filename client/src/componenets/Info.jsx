import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";

const InfoCircle = ({ num, text }) => {
  return (
    <Box
      className="bounce2"
      sx={{
        width: "199px",
        height: "199px",
        background: "#fff",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: "10px",
      }}
    >
      <Box>
        <Typography variant="h2" textAlign="center" color="#D09B03">
          {num}
        </Typography>
        <Typography textAlign="center" color="#000" fontSize="14px">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

const array = [
  {
    num: " $159B",
    text: "Quarterly volume traded",
  },
  {
    num: " 100+",
    text: "Countries supported",
  },
  {
    num: "108M+",
    text: "Verified users",
  },
];

const Info = () => {
  return (
    <Box
      py="70px"
      sx={{
        background:
          "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
      }}
    >
      <Container>
        <Stack
          direction={{ sm: "row", xs: "column" }}
          alignItems="center"
          justifyContent="space-around"
        >
          {array.map(({ num, text }, i) => (
            <InfoCircle key={i} num={num} text={text} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Info;
