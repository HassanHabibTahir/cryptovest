import React from "react";
import PropTypes from "prop-types";
import { Box, Tab, Tabs } from "@mui/material";

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
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
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
const TabsButton = ({ btnName }) => {
  const [tabbtnValue, setTabBtnValue] = React.useState(0);

  // eslint-disable-next-line no-unused-vars
  const changeTabbtnValue = (event, newValue) => {
    setTabBtnValue(newValue);
  };

  return (
    <>
      <Tabs
        indicatorColor=""
        variant="scrollable"
        value={tabbtnValue}
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        onChange={changeTabbtnValue}
        sx={{
          "& .MuiTabs-scrollButtons": {
            "& .MuiSvgIcon-root": {
              fontSize: "2rem",
            },
          },
        }}
      >
        {btnName.map((btn, index) => (
          <Tab
            key={index}
            label={btn.name}
            {...a11yProps(index)}
            sx={{
              mr: "10px",
              fontFamily: "Roboto",
              fontSize: "13px",
              border: "1px solid #FACB30",
              backdropFilter: "blur(5px)",
              color: "white",
              borderRadius: "43px",
              "&.Mui-selected": {
                background:
                  "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
                borderRadius: "43px",
                fontWeight: 500,
                color: "#292929",
              },
            }}
          />
        ))}
      </Tabs>
      {btnName.map(({ Component }, index) => (
        <TabPanel key={index} value={tabbtnValue} index={index}>
          <Component />
        </TabPanel>
      ))}
    </>
  );
};

export default TabsButton;
