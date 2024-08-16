import React from "react";

import { Box } from "@mui/material";
// eslint-disable-next-line import/no-cycle
import {
  AdvanceTrade,
  // SimpleTradeTable,
} from "../../dashboard";
// import TabsButton from "../../dashboard/TabsButton";
import Animation from "../../componenets/Animation";
// import DashboardOrders from "../../dashboard/DashboardOrders";

// const btnName = [
//   {
//     name: "Simple",
//     Component: SimpleTradeTable,
//   },
//   {
//     name: "Advance",
//     Component: AdvanceTrade,
//   },
// ];

const Trade = () => {
  return (
    <Animation>
      <Box>
        {/* <TabsButton btnName={btnName} /> */}
        <AdvanceTrade />
        {/* <DashboardOrders /> */}
      </Box>
    </Animation>
  );
};

export default Trade;
