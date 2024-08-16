import * as React from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Box, Typography } from "@mui/material";

export default function FAQs({ accordiantData }) {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    if (event) {
      setExpanded(newExpanded ? panel : false);
    }
  };

  return (
    <Box>
      {accordiantData.map(({ heading, detail }, ind) => (
        <MuiAccordion
          disableGutters
          elevation={0}
          square
          key={ind}
          expanded={expanded === heading}
          onChange={handleChange(heading)}
          sx={{ background: "#222222" }}
        >
          <MuiAccordionSummary
            expandIcon={
              <ArrowForwardIosSharpIcon
                sx={{ fontSize: "0.9rem", color: "#000" }}
              />
            }
            sx={{
              background:
                "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",

              marginTop: "10px",
              flexDirection: "row",
              "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                transform: "rotate(90deg)",
              },
              "& .MuiAccordionSummary-content": {
                marginup: 1,
              },
            }}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography sx={{ color: "#000" }}>{heading}</Typography>
          </MuiAccordionSummary>
          <MuiAccordionDetails
            sx={{
              padding: 2,
              border: "1px solid #EEBE62",
              background: "#222222",
            }}
          >
            <Typography>{detail}</Typography>
          </MuiAccordionDetails>
        </MuiAccordion>
      ))}
    </Box>
  );
}
