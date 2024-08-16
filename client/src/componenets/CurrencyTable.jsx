import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const table = [
  { name: "Bitcoin BTC", price: "PKR 5,258,737.32", change: "-0.99%" },
  { name: "Bitcoin BTC", price: "PKR 5,258,737.32", change: "-0.99%" },
  { name: "Bitcoin BTC", price: "PKR 5,258,737.32", change: "-0.99%" },
  { name: "Bitcoin BTC", price: "PKR 5,258,737.32", change: "-0.99%" },
  { name: "Bitcoin BTC", price: "PKR 5,258,737.32", change: "-0.99%" },
];

export default function CurrencyTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Change</TableCell>
            <TableCell align="left">Chart</TableCell>
            <TableCell align="left">Trade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table.map((row, ind) => (
            <TableRow
              key={ind}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left">{row.change}</TableCell>
              <TableCell align="left">dfdf</TableCell>
              <TableCell align="left">dsfg</TableCell>
              <TableCell align="left">dsfg</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
