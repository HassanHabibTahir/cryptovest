import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux";

// eslint-disable-next-line import/no-cycle
import { BoxMain } from "../../dashboard";
import { ButtonMain } from "../../componenets";
import { StyledDevider } from "../../utils/styledComponents";

const ConfirmSecondryEmail = () => {
  const { userDbData } = useSelector((store) => store.global);

  return (
    <Container maxWidth="sm">
      <BoxMain mt="40px">
        <Box textAlign="center">
          <WatchLaterIcon sx={{ fontSize: "45px" }} />
          <Typography sx={{ mt: "10px" }} variant="h3">
            Waiting for confirmation.....
          </Typography>
          <Typography sx={{ mt: "10px" }} variant="body2">
            Please confirm your secondry mail
          </Typography>
        </Box>
        <StyledDevider />
        <Box mt="20px" px="20px">
          <Stack direction="row" alignItems="center" columnGap={1}>
            <CheckIcon />
            <Typography variant="h4">{userDbData?.name}</Typography>
            <Typography variant="body2">{userDbData?.email}</Typography>
          </Stack>
          <Stack mt="20px" direction="row" alignItems="center" columnGap={1}>
            <WatchLaterIcon />
            <Typography variant="body2">
              {userDbData?.secondaryEmail}
            </Typography>
          </Stack>
        </Box>
        <StyledDevider />
        <Box textAlign="center">
          <ButtonMain sx={{ mt: "20px", px: "20px" }}> Back </ButtonMain>
        </Box>
      </BoxMain>
    </Container>
  );
};

export default ConfirmSecondryEmail;
