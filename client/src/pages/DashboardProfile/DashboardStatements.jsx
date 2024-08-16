import React from "react";
import {
  Box,
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  MenuItem,
} from "@mui/material";

import { ButtonMain, CustomInput } from "../../componenets";
import Animation from "../../componenets/Animation";

const DashboardPay = () => {
  const [statementData, setStatementData] = React.useState({
    asset: "",
    transaction: "",
    date: "",
    format: "",
  });

  const handleStatementChange = (e) => {
    setStatementData({ ...statementData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Animation>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Box
            style={{
              border: "1px solid #FCF3BD",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <Typography variant="h3" fontFamily="Roboto" fontWeight="bold">
              Transactions
            </Typography>
            <Typography
              variant="body"
              fontFamily="Roboto"
              sx={{ position: "relative", top: "6px" }}
            >
              Download all your Cryptovest account activities
            </Typography>
            <Box
              sx={{ padding: { md: "40px" } }}
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignContent="center"
              justifyContent="space-between"
            >
              <Box sx={{ width: "70%" }}>
                <Typography variant="body" fontFamily="Roboto">
                  Last 30 days
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection={{ xs: "row", md: "row" }}
                alignContent="center"
                justifyContent="space-around"
              >
                <Typography
                  variant="body"
                  fontFamily="Roboto"
                  fontWeight="bold"
                  sx={{ marginRight: "10px" }}
                >
                  PDF
                </Typography>
                <Typography
                  variant="body"
                  fontWeight="bold"
                  fontFamily="Roboto"
                >
                  CSV
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              border: "1px solid #FCF3BD",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <Typography variant="h3" fontFamily="Roboto" fontWeight="bold">
              Generate custom statement
            </Typography>
            <br />
            <br />
            <Box sx={{ marginBottom: "20px" }}>
              <Typography variant="body" fontFamily="Roboto" fontWeight="bold">
                Asset
              </Typography>
              <CustomInput
                required
                name="asset"
                select
                onChange={handleStatementChange}
              >
                {["asset1", "asset2"].map((item, i) => (
                  <MenuItem key={i} value={item} sx={{ color: "black" }}>
                    {item}
                  </MenuItem>
                ))}
              </CustomInput>
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
              <Typography variant="body" fontFamily="Roboto" fontWeight="bold">
                Transaction type
              </Typography>

              <CustomInput
                required
                name="transaction"
                select
                onChange={handleStatementChange}
              >
                {["Transaction1", "Transaction2"].map((item, i) => (
                  <MenuItem key={i} value={item} sx={{ color: "black" }}>
                    {item}
                  </MenuItem>
                ))}
              </CustomInput>
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
              <Typography variant="body" fontFamily="Roboto" fontWeight="bold">
                Date
              </Typography>
              <CustomInput
                required
                name="date"
                select
                onChange={handleStatementChange}
              >
                {["Date1", "Date2"].map((item, i) => (
                  <MenuItem key={i} value={item} sx={{ color: "black" }}>
                    {item}
                  </MenuItem>
                ))}
              </CustomInput>
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
              <FormControl>
                <Typography
                  variant="body"
                  fontFamily="Roboto"
                  fontWeight="bold"
                >
                  Format
                </Typography>
                <RadioGroup
                  sx={{
                    "& .css-1azolaz-MuiButtonBase-root-MuiRadio-root.Mui-checked":
                      {
                        color: "#E1AE3C",
                      },
                  }}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="format"
                  onChange={handleStatementChange}
                >
                  <FormControlLabel
                    value="PDF"
                    control={<Radio required />}
                    label="PDF"
                  />
                  <FormControlLabel
                    value="CSV"
                    control={<Radio required />}
                    label="CSV"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <ButtonMain
              className="hvr-bounce-to-right"
              type="submit"
              sx={{
                width: "100%",
                fontSize: "15px",
                py: "8px",
                px: { xs: "5px", sm: "10px", md: "20px" },
              }}
            >
              Generate
            </ButtonMain>
          </Box>
        </Grid>
      </Grid>
    </Animation>
  );
};

export default DashboardPay;
