import { Box, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

import ButtonMain from "../ButtonMain";

const IDVerification = () => {
  return (
    <Box align="center">
      <ErrorOutline sx={{ fontSize: "100px", mt: 4 }} />
      <Typography variant="h4" my={1}>
        Identity Verification Required
      </Typography>
      <Typography>
        You`re almost ready to trade. Please verify your personal information
      </Typography>
      <ButtonMain sx={{ py: 2, width: "100%", mt: 4 }}>
        Verify your id
      </ButtonMain>
    </Box>
  );
};

export default IDVerification;
