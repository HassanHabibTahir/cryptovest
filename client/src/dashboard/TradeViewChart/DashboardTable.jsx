/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { useSelector } from "react-redux";

import { CustomSelect } from "../../componenets";
import { socket } from "../../utils";

const filterArray = ["All", "BTC-USDT"];
const filterArray2 = ["All", "Open", "Filled", "Cenceled", "Expired", "Failed"];

export default function DashboardTable() {
  const [select1, setSelect1] = React.useState("All Statuses");
  const [select2, setSelect2] = React.useState("All Markets");
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [userOrder, setUserOrder] = React.useState([]);
  const { userDbData } = useSelector((store) => store.global);

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (userDbData?._id) {
      // eslint-disable-next-line no-underscore-dangle
      socket.emit("join_user", userDbData?._id);

      socket.on("get_user_orders", (orders) => {
        setUserOrder(orders);
        console.log(orders, "orders");
      });
    }
  }, [userDbData]);

  return (
    <Box border="1px solid gray" mt={1} borderRadius="5px">
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        justifyContent="space-between"
        my={0.5}
        p={1}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography>Order</Typography>
          <HelpIcon />
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <CustomSelect
            select={select2}
            setSelect={setSelect2}
            anchorEl={anchorEl2}
            setAnchorEl={setAnchorEl2}
            array={filterArray}
          />
          <CustomSelect
            select={select1}
            setSelect={setSelect1}
            anchorEl={anchorEl1}
            setAnchorEl={setAnchorEl1}
            array={filterArray2}
          />
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            background: "#222222",
            border: "1px solid gray",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">Pair</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Side</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">%Filled</TableCell>
              <TableCell align="left">Total</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userOrder?.map((value, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {value.updatedAt.slice(0, 10)}
                </TableCell>
                <TableCell align="left">
                  {value.quoteToken}/{value.baseToken}
                </TableCell>
                <TableCell align="left">
                  {value.isLimitOrder === true ? "Limit" : "Market"}
                </TableCell>
                <TableCell align="left">
                  {" "}
                  {value.isBuyOrder === true ? "Buy" : "Sell"}
                </TableCell>
                <TableCell align="left">{value.price}</TableCell>
                <TableCell align="left">
                  {parseFloat(value.baseAmount).toFixed(3)}
                </TableCell>
                <TableCell align="left">
                  {value.isLimitOrder ? (
                    <>
                      {value.isBuyOrder === true ? (
                        <>
                          {value.status === "pending" ? (
                            <>
                              {(
                                (value.filled /
                                  (value.baseAmount / value.price)) *
                                100
                              ).toFixed(2)}
                            </>
                          ) : (
                            // limit  buy order Complete
                            <>{(100).toFixed(2)}</>
                          )}
                        </>
                      ) : (
                        // limit  sell order

                        <>
                          {value.status === "pending" ? (
                            <>
                              {(
                                (value.filled / value.baseAmount) *
                                100
                              ).toFixed(2)}
                            </>
                          ) : (
                            // limit  sell order complete
                            <>{(100).toFixed(2)}</>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    // ================================= Market Orders==========================
                    <>
                      {value.isLimitOrder ? (
                        <>
                          {value.isBuyOrder === true ? (
                            //  {/ ======================LIMIT ORDERS========================  /}
                            <>
                              {value.status === "pending" ? (
                                //   {/ {/ limit  buy order pending   /} /}
                                <>
                                  {(
                                    (value.filled /
                                      (value.baseAmount / value.price)) *
                                    100
                                  ).toFixed(2)}
                                </>
                              ) : (
                                // limit  buy order Complete
                                <>{(100).toFixed(2)}</>
                              )}
                            </>
                          ) : (
                            // limit  sell order
                            <>
                              {(
                                (value.filled / value.baseAmount) *
                                100
                              ).toFixed(2)}
                            </>
                          )}
                        </>
                      ) : (
                        // ================================= Market Orders==========================
                        <>
                          {value.isBuyOrder === true ? (
                            <>
                              {value.status === "pending" ? (
                                // {/ {/ Market  buy order pending   /} /}
                                <>
                                  {(
                                    (value.filled /
                                      (value.baseAmount / value.price)) *
                                    100
                                  ).toFixed(2)}
                                </>
                              ) : (
                                // Market  buy order Complete
                                <>{(100).toFixed(2)}</>
                              )}
                            </>
                          ) : (
                            // MARKET  sell order
                            // sell order Pending
                            <>
                              {value.status === "pending" ? (
                                <>
                                  {(
                                    (value.filled / value.baseAmount) *
                                    100
                                  ).toFixed(2)}
                                </>
                              ) : (
                                // sell order filled
                                <>{(100).toFixed(2)}</>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                  %
                </TableCell>
                <TableCell align="left">
                  {value.isBuyOrder
                    ? parseFloat(value.baseAmount / value.price).toFixed(2)
                    : parseFloat(value.baseAmount * value.price).toFixed(2)}
                </TableCell>
                <TableCell align="left">{value.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
