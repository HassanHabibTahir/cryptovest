import * as React from "react";
import PropTypes from "prop-types";

import { Tab, Box, Tabs, Button } from "@mui/material";
import DashboardPaySend from "./DashboardPaySend";
import DashboardPayReceive from "./DashboardPayReceive";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DashboardPayTabs({ handleClose }) {
  const [value, setValue] = React.useState(0);
  const [currency, setCurrency] = React.useState("usdt");

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  const buttons = ["usdt", "eth", "sol", "btc"];

  return (
    <Box>
      <Box>
        <Box ml={2} display="flex" gap={2}>
          {buttons.map((button, index) => (
            <Box key={index}>
              <Button
                onClick={() => setCurrency(button)}
                sx={{
                  px: 2,
                  background:
                    button === currency
                      ? "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)"
                      : "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",
                  borderRadius: "15px",
                  fontFamily: "Roboto",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: button === currency ? "#000" : "#fff",

                  border: "2px solid transparent",
                }}
              >
                {button}
              </Button>
            </Box>
          ))}
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              background:
                "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
            },
          }}
        >
          <Tab
            label="Send"
            {...a11yProps(0)}
            sx={{
              width: "50%",
              fontFamily: "Roboto",
              textTransform: "none",
              fontSize: "22px",
              fontWeight: "400",
              color: "#fff",
              padding: "20px 0",
            }}
          />
          <Tab
            label="Receive"
            {...a11yProps(1)}
            sx={{
              width: "50%",
              fontFamily: "Roboto",
              textTransform: "none",
              fontSize: "22px",
              fontWeight: "400",
              color: "#fff",
              padding: "20px 0",
            }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DashboardPaySend currency={currency} setCurrency={setCurrency} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DashboardPayReceive currency={currency} handleClose={handleClose} />
      </TabPanel>
    </Box>
  );
}
