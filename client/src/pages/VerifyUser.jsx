import {
  Box,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import { Solana, bitcoin, Ethereum } from "../assets";

import { ButtonMain } from "../componenets";
import { BoxMain } from "../dashboard";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background:
      "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
    color: theme.palette.common.black,
    fontWeight: "600",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    borderBottom: "none",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    background: "rgba(34, 34, 34, 0.42)",
    borderRadius: "44px",
    color: theme.palette.common.black,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    backgroundColor: "transparent",
  },
  borderBottom: "none",
}));

const rows = [
  {
    name: {
      img: bitcoin,
      currency: "Bitcoin",
      symbol: "BTC",
    },
    price: "PKR 6,768,819.09",
    change: "-1.87%",
    marketCap: "PKR 123.6T",
    watch: true,
  },
  {
    name: {
      img: Solana,
      currency: "Solana",
      symbol: "SOL",
    },
    price: "PKR 6,768,819.09",
    change: "-1.87%",
    marketCap: "PKR 123.6T",
    watch: true,
  },
  {
    name: {
      img: Ethereum,
      currency: "Ethereum",
      symbol: "ETH",
    },
    price: "PKR 6,768,819.09",
    change: "-1.87%",
    marketCap: "PKR 123.6T",
    watch: true,
  },
];

const tableRow = ["Name", "Price", "Change", "Market Cap", "Watch"];
const VerifyUser = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "80%", lg: "70%" },
        margin: "auto",
        mt: 10,
      }}
    >
      <BoxMain sx={{ mt: "10px" }}>
        <TableContainer
          sx={{
            "& .MuiPaper-root ": {
              backgroundColor: "transparent",
            },
            mt: "10px",
            background: "transparent",
            borderRadius: "0px",
            maxWidth: { xs: "700px", sm: "100%", md: "100%" },
            maxHeight: "500px",
            width: "100%",
            overflowX: "scroll",
            "&::-webkit-scrollbar": {
              width: "0 !important",
            },
            "&::-webkit-scrollbar:horizontal": {
              height: "4px !important",
            },
            "&::-webkit-scrollbar:verticle": {
              width: "4px !important",
            },

            "&::-webkit-scrollbar-thumb": {
              background: "#F8EBB0",
            },
          }}
          elevation={0}
          component={Paper}
        >
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                {tableRow.map((data, ind) => (
                  <StyledTableCell align="left" key={ind}>
                    {data}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(({ name, change, price, marketCap }, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    <Link
                      to={`price/${name.currency.toLowerCase()}`}
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      <Stack direction="row" alignItems="center">
                        <img src={name.img} alt={name.currency} width="25px" />
                        <Box px="5px">
                          <Typography fontSize="14px" fontWeight="600">
                            {name.currency}
                          </Typography>
                          <Typography fontSize="10px">{name.symbol}</Typography>
                        </Box>
                      </Stack>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="left">{price}</StyledTableCell>
                  <StyledTableCell align="left">{change}</StyledTableCell>
                  <StyledTableCell align="left">{marketCap}</StyledTableCell>
                  <StyledTableCell align="center">
                    <ButtonMain className="hvr-bounce-to-right">Buy</ButtonMain>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BoxMain>
    </Box>
  );
};

export default VerifyUser;
