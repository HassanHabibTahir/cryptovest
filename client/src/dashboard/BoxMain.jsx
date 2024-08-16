import { styled, Box } from "@mui/material";

const BoxMain = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
  background:
    "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",
  backdropFilter: "blur(5px)",
  borderRadius: "15px",
  border: "2px solid transparent",
  padding: "30px",
}));
export default BoxMain;
