import React from "react";

import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TableCell,
  tableCellClasses,
  TableRow,
  styled,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

// import CustomSelect from "../componenets/CustomSelect";
// import ButtonMain from "../componenets/ButtonMain";

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

// const marketArray = ["All Markets"];
// const typeArray = ["All Types", "Markets", "Stop", "Limit"];
// const sideArray = ["All Sides", "Buy", "Sell"];

const rows = [];

const DashboardOrders = () => {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    if (event) {
      setExpanded(newExpanded ? panel : false);
    }
  };

  // menue

  // const [select, setSelect] = useState("All Markets");
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const [select2, setSelect2] = useState("All Assets");
  // const [anchorEl2, setAnchorEl2] = React.useState(null);

  // const [select3, setSelect3] = useState("All Sides");
  // const [anchorEl3, setAnchorEl3] = React.useState(null);

  return (
    <Box>
      {/* open orders */}
      <Accordion
        disableGutters
        elevation={0}
        square
        expanded={expanded === "Open orders"}
        onChange={handleChange("Open orders")}
        sx={{ background: "#222222" }}
      >
        <AccordionSummary
          expandIcon={
            <ArrowForwardIosSharpIcon
              sx={{ fontSize: "0.9rem", color: "#000" }}
            />
          }
          sx={{
            background:
              "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",

            marginTop: "10px",
            borderRadius: "15px",
            flexDirection: "row",
            "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
              transform: "rotate(90deg)",
            },
            "& .MuiAccordionSummary-content": {
              marginup: 1,
            },
          }}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography sx={{ color: "#000" }} variant="h4">
            Open orders
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: 2,
            border: "1px solid #EEBE62",
            background: "#222222",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
            mt: "-12px",
          }}
        >
          {/* <Grid container spacing={{ md: 5, xs: 3 }}>
            <Grid item md={3} xs={6}>
              <CustomSelect
                select={select}
                setSelect={setSelect}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                array={marketArray}
              />
            </Grid>
            <Grid item md={3} xs={6}>
              <CustomSelect
                select={select2}
                setSelect={setSelect2}
                anchorEl={anchorEl2}
                setAnchorEl={setAnchorEl2}
                array={typeArray}
              />
            </Grid>
            <Grid item md={3} xs={6}>
              <CustomSelect
                select={select3}
                setSelect={setSelect3}
                anchorEl={anchorEl3}
                setAnchorEl={setAnchorEl3}
                array={sideArray}
              />
            </Grid>
            <Grid item md={3} xs={6}>
              <ButtonMain className="hvr-bounce-to-right" sx={{ mt: "10px" }}>
                {" "}
                Cancle all
              </ButtonMain>
            </Grid>
          </Grid> */}

          {/* ===================== order Table===================  */}

          <TableContainer
            sx={{
              "& .MuiPaper-root ": {
                backgroundColor: "transparent",
              },
              mt: "10px",
              background: "transparent",
              borderRadius: "0px",
              maxWidth: { xs: "700px", sm: "100%", md: "100%" },
              width: "100%",
              overflowX: "scroll",
              "&::-webkit-scrollbar": {
                width: "0 !important",
              },
              "&::-webkit-scrollbar:horizontal": {
                height: "4px !important",
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
                  <StyledTableCell>Data</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Type</StyledTableCell>
                  <StyledTableCell align="left">Side </StyledTableCell>
                  <StyledTableCell align="left"> Price</StyledTableCell>

                  <StyledTableCell align="left">Amount</StyledTableCell>
                  <StyledTableCell align="left">%Filled</StyledTableCell>
                  <StyledTableCell align="left">Total</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map(
                    (
                      {
                        data,
                        name,
                        type,
                        side,
                        price,
                        amount,
                        filled,
                        total,
                        status,
                      },
                      i
                    ) => (
                      <StyledTableRow key={i}>
                        <StyledTableCell component="th" scope="row">
                          {data}
                        </StyledTableCell>
                        <StyledTableCell align="left">{name}</StyledTableCell>
                        <StyledTableCell align="left">{type}</StyledTableCell>
                        <StyledTableCell align="left">{side}</StyledTableCell>
                        <StyledTableCell align="center">
                          {price}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {amount}
                        </StyledTableCell>
                        <StyledTableCell align="left">{filled}</StyledTableCell>
                        <StyledTableCell align="left">{total}</StyledTableCell>
                        <StyledTableCell align="left">{status}</StyledTableCell>
                      </StyledTableRow>
                    )
                  )
                ) : (
                  <Typography
                    variant="h3"
                    sx={{ py: "40px", textAlign: "center", width: "100%" }}
                  >
                    {" "}
                    NO ORDERS YET
                  </Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      {/*  orders history */}
      <Accordion
        disableGutters
        elevation={0}
        square
        expanded={expanded === "order history"}
        onChange={handleChange("order history")}
        sx={{ background: "#222222", mt: "20px" }}
      >
        <AccordionSummary
          expandIcon={
            <ArrowForwardIosSharpIcon
              sx={{ fontSize: "0.9rem", color: "#000" }}
            />
          }
          sx={{
            background:
              "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",

            marginTop: "10px",
            borderRadius: "15px",
            flexDirection: "row",
            "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
              transform: "rotate(90deg)",
            },
            "& .MuiAccordionSummary-content": {
              marginup: 1,
            },
          }}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography sx={{ color: "#000" }} variant="h4">
            Order history
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: 2,
            border: "1px solid #EEBE62",
            background: "#222222",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
            mt: "-12px",
          }}
        >
          {/* <Grid container spacing={{ md: 5, xs: 3 }}>
            <Grid item md={3} xs={6}>
              <CustomSelect
                select={select}
                setSelect={setSelect}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                array={marketArray}
              />
            </Grid>
            <Grid item md={3} xs={6}>
              <CustomSelect
                select={select2}
                setSelect={setSelect2}
                anchorEl={anchorEl2}
                setAnchorEl={setAnchorEl2}
                array={typeArray}
              />
            </Grid>
            <Grid item md={3} xs={6}>
              <CustomSelect
                select={select3}
                setSelect={setSelect3}
                anchorEl={anchorEl3}
                setAnchorEl={setAnchorEl3}
                array={sideArray}
              />
            </Grid>
            <Grid item md={3} xs={6}>
              <ButtonMain className="hvr-bounce-to-right" sx={{ mt: "10px" }}>
                {" "}
                Download Statement
              </ButtonMain>
            </Grid>
          </Grid> */}

          {/* ===================== order Table===================  */}

          <TableContainer
            sx={{
              "& .MuiPaper-root ": {
                backgroundColor: "transparent",
              },
              mt: "10px",
              background: "transparent",
              borderRadius: "0px",
              maxWidth: { xs: "700px", sm: "100%", md: "100%" },
              width: "100%",
              overflowX: "scroll",
              "&::-webkit-scrollbar": {
                width: "0 !important",
              },
              "&::-webkit-scrollbar:horizontal": {
                height: "4px !important",
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
                  <StyledTableCell>Data</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Type</StyledTableCell>
                  <StyledTableCell align="left">Side </StyledTableCell>
                  <StyledTableCell align="left"> Price</StyledTableCell>

                  <StyledTableCell align="left">Amount</StyledTableCell>
                  <StyledTableCell align="left">%Filled</StyledTableCell>
                  <StyledTableCell align="left">Total</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map(
                    (
                      {
                        data,
                        name,
                        type,
                        side,
                        price,
                        amount,
                        filled,
                        total,
                        status,
                      },
                      i
                    ) => (
                      <StyledTableRow key={i}>
                        <StyledTableCell component="th" scope="row">
                          {data}
                        </StyledTableCell>
                        <StyledTableCell align="left">{name}</StyledTableCell>
                        <StyledTableCell align="left">{type}</StyledTableCell>
                        <StyledTableCell align="left">{side}</StyledTableCell>
                        <StyledTableCell align="center">
                          {price}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {amount}
                        </StyledTableCell>
                        <StyledTableCell align="left">{filled}</StyledTableCell>
                        <StyledTableCell align="left">{total}</StyledTableCell>
                        <StyledTableCell align="left">{status}</StyledTableCell>
                      </StyledTableRow>
                    )
                  )
                ) : (
                  <Typography
                    variant="h3"
                    sx={{ py: "40px", textAlign: "center", width: "100%" }}
                  >
                    {" "}
                    NO ORDERS YET
                  </Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default DashboardOrders;
