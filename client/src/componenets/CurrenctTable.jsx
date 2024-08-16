import * as React from "react";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  styled,
} from "@mui/material";

import TimelineIcon from "@mui/icons-material/Timeline";

import { currencybg, bitcoin } from "../assets";
import Ethereum from "../images/Ethereum.png";
import Cardano from "../images/Cardano.png";
import Solana from "../images/Solana.png";

const table = [
  {
    name: "Bitcoin BTC",
    price: "PKR 5,258,737.32",
    change: "-0.99%",
    image: bitcoin,
  },
  {
    name: "Ethereum ETH",
    price: "PKR 359,871.91",
    change: "-4.90%",
    image: Ethereum,
  },
  {
    name: "Cardano ADA",
    price: "PKR 83.30",
    change: "_4.84%",
    image: Cardano,
  },
  {
    name: "Solana SOL",
    price: "PKR 5,489.86",
    change: "-3.60%",
    image: Solana,
  },
];

const StyledTableCell = styled(TableCell)({
  fontFamily: "Roboto ",
  textAlign: "left",
  fontWeight: "400",
  fontSize: "12px",
});

const TableCellData = ["#", "Name", "Price", "Change", "Chart", "Trade"];

export default function CurrencyTable() {
  return (
    <Container maxWidth="lg" sx={{ px: 3 }}>
      <div data-aos="zoom-in-up" data-aos-duration="3000">
        <Box
          my={10}
          px={2}
          sx={{
            backgroundImage: `url(${currencybg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          <TableContainer
            sx={{
              py: 10,
              "&::-webkit-scrollbar": {
                width: "0 !important",
              },
              "&::-webkit-scrollbar:horizontal": {
                height: "4px !important",
              },
            }}
          >
            <Table
              sx={{
                width: "100%",
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {TableCellData.map((item, index) => (
                    <StyledTableCell
                      key={index}
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        textAlign: index === 0 ? "center" : "",
                        width: "10%",
                      }}
                    >
                      {item}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {table.map((row, index) => (
                  <TableRow key={index}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center" }}
                    >
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: { xs: "auto", md: "20%" } }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={row.image}
                          alt="not found"
                          srcSet=""
                          width="20px"
                          style={{ marginRight: "10px" }}
                        />
                        {row.name}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>{row.price}</StyledTableCell>
                    <StyledTableCell>{row.change}</StyledTableCell>
                    <StyledTableCell>
                      <TimelineIcon fontSize="large" />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          background: "#047601",
                          textTransform: "none",
                          fontFamily: "Roboto",
                          borderRadius: "10px",
                          color: "#fff",
                          "&:hover": {
                            background: "#047601",
                          },
                        }}
                      >
                        Buy
                      </Button>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </Container>
  );
}
