import { useCallback } from "react";
import { StepLabel, Step, Stepper, Stack, styled } from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const ColorlibConnector = styled(StepConnector)({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 13,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#E1AE3C",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#E1AE3C",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
});

const ColorlibStepIconRoot = styled("div")({
  zIndex: 1,
  color: "#fff",
  width: 30,
  height: 30,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
});

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      <CheckBoxOutlineBlankIcon
        sx={{
          transform: "rotate(45deg)",
          fontSize: active ? "20px" : "15px",
          color: completed || active ? "#E1AE3C" : "#fff",
        }}
      />
    </ColorlibStepIconRoot>
  );
}

const steps = ["0", "25", "50", "75", "100"];

export default function CustomizedSteppers({
  setBaseAmount,
  baseBalance,
  price,
  setTotalAmount,
  setStepper,
  stepper,
}) {
  const handleChange = useCallback(
    (index) => {
      const currentBasePrice = (baseBalance * (index * 25)) / 100;
      setStepper(index);
      setBaseAmount(currentBasePrice);

      if (price && setTotalAmount && price > 0) {
        setTotalAmount(price * currentBasePrice);
      }
    },
    [price, baseBalance, setBaseAmount, setStepper, setTotalAmount]
  );

  return (
    <Stack sx={{ width: "100%" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={stepper}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, ind) => (
          <Step key={label}>
            <StepLabel
              sx={{
                "& .css-1h8zsnr-MuiStepLabel-label.MuiStepLabel-alternativeLabel":
                  {
                    fontSize: "10px",
                    mt: 0,
                  },
                "& .css-1h8zsnr-MuiStepLabel-label.Mui-active": {
                  color: "#E1AE3C",
                },
                "& .css-1h8zsnr-MuiStepLabel-label.Mui-completed": {
                  color: "#E1AE3C",
                },
              }}
              onClick={() => handleChange(ind)}
              StepIconComponent={ColorlibStepIcon}
            >
              {`${label} %`}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
