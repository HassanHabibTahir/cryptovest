/* eslint-disable import/no-useless-path-segments */
import React from "react";
import {
  Grid,
  // , Box,  IconButton, Stack, Typography
} from "@mui/material";
// import { Link } from "react-router-dom";
// import { ArrowForwardIos, Feed } from "@mui/icons-material";
// eslint-disable-next-line import/no-cycle
import {
  RecentTransction,
  // , Tabs
} from "../dashboard";

// import BoxMain from "./BoxMain";
import AdvanceTradeTable from "./AdvanceTradeTable";
import DashboardOrders from "./DashboardOrders";

// const gainerandlooser = [
//   {
//     name: "LQTY-USTD",
//     price: "$0.000000000",
//   },
//   {
//     name: "STX-USDT",
//     price: "$0.000000000",
//   },
//   {
//     name: "BOND-USDT",
//     price: "$0.0000",
//   },
// ];
// const Gainer = () => {
//   return (
//     <Box>
//       {gainerandlooser.map(({ name, price }, index) => (
//         <Box
//           key={index}
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           py="10px"
//         >
//           <Typography fontWeight="bold">{name}</Typography>
//           <Typography>{price}</Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// };

// const btnName = [
//   {
//     name: "Top gainers",
//     Component: Gainer,
//   },
//   {
//     name: "Top loosers",
//     Component: Gainer,
//   },
// ];

const AdvanceTrade = () => {
  return (
    <Grid container spacing={2} mt="10px">
      <Grid item xs={12}>
        <AdvanceTradeTable />
      </Grid>

      {/* ========================order Mangament=============================== */}
      {/* <Grid item container spacing={2} lg={4} xs={12}> */}
      {/* <Grid item xs={12} sm={6} lg={12}>
          <BoxMain sx={{ p: 2, height: "100%" }}>
            <Box
              sx={{
                px: "10px",
                py: "20px",
              }}
            >
              <Typography variant="h3"> Order management</Typography>
            </Box>
            <Link
              to="managment"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="body">
                  <IconButton>
                    <Feed sx={{ color: "white" }} />
                  </IconButton>
                  Orders
                </Typography>
                <IconButton>
                  <ArrowForwardIos sx={{ color: "white" }} />
                </IconButton>
              </Stack>
            </Link>
          </BoxMain>
        </Grid>
        <Grid item xs={12} sm={6} lg={12}>
          <BoxMain
            sx={{
              height: "100%",
            }}
          >
            <Tabs btnName={btnName} />
          </BoxMain>
        </Grid> */}
      <Grid item xs={12}>
        <RecentTransction />
      </Grid>
      <Grid item xs={12}>
        <DashboardOrders />
      </Grid>

      {/* </Grid> */}
      {/* ========================order Mangament=============================== */}
    </Grid>
  );
};

export default AdvanceTrade;
