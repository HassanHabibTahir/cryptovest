import * as React from "react";
// import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Container, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalMallIcon from "@mui/icons-material/LocalMall";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 40,
    [theme.breakpoints.down("md")]: {
      top: 30,
    },
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(90deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(90deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme }) => ({
  zIndex: 1,
  color: "#fff",
  width: 80,
  height: 80,
  [theme.breakpoints.down("md")]: {
    width: 60,
    height: 60,
  },
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#222222",
  background:
    "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",
  border: "3px solid transparent",
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PersonAddIcon />,
    2: <AccountBalanceIcon />,
    3: <LocalMallIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  "Create an account",
  "Link your bank account",
  "Start buying & selling",
];

export default function GetStarted() {
  return (
    <Container maxWidth="md" sx={{ px: 3, mt: 5 }}>
      <div data-aos="fade-down" data-aos-duration="2000">
        <Typography
          align="center"
          sx={{
            fontFamily: "Audiowide",
            fontSize: { xs: "30px", md: "40px" },
            background:
              "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
            backgroundClip: "text",
            textFillColor: "transparent",
          }}
        >
          Get started in a few minutes
        </Typography>
        <Typography
          align="center"
          sx={{ fontSize: "20px", fontWeight: "400", fontFamily: "Roboto" }}
        >
          Coinbase supports a variety of the most popular digital currencies.
        </Typography>
      </div>
      <Stack
        sx={{
          mt: 5,
          width: "100%",
          "& .css-i4bv87-MuiSvgIcon-root": {
            fontSize: { xs: "20px", md: "40px" },
            color: "#E1AE3C",
          },
        }}
        spacing={4}
      >
        <div data-aos="fade-up" data-aos-duration="2000">
          <Stepper
            alternativeLabel
            activeStep={2}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontWeight: "700",
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                  >
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </Stack>
    </Container>
  );
}
