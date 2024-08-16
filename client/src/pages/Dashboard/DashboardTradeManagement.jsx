import * as React from "react";

import { Box } from "@mui/material";
import DashboardTradeFees from "../../dashboard/DashboardTradeFees";
import DashboardOrders from "../../dashboard/DashboardOrders";
import TabsButton from "../../dashboard/TabsButton";

const btnName = [
  {
    name: "Orders",
    Component: DashboardOrders,
  },
  {
    name: "Fees",
    Component: DashboardTradeFees,
  },
];

export default function DashboardTradeManagement() {
  return (
    <Box>
      <TabsButton btnName={btnName} />
    </Box>
  );
}
