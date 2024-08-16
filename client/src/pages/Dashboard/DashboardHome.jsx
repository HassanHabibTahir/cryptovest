/* eslint-disable operator-linebreak */
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  // styled,
  // IconButton,
  // LinearProgress,
  // linearProgressClasses,
} from "@mui/material";
import {
  // CreditCard,
  // SwapHoriz,
  // ExpandMore,
  ArrowUpward,
  FavoriteBorder,
  // CallMade,
  // SouthEast,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

import videoimg from "../../assets/dashboard-homesection.png";
// import Tickicon from "../../dashboard/Tickicon";

import {
  //  CustomTable,
  // ButtonMain,
  MoreInfoAccordion,
} from "../../componenets";
// import { augur, metal, golem } from "../../assets/index";
import AddpaymountModal from "../../dashboard/modals/AddpaymountModal";
import Animation from "../../componenets/Animation";
import { SimpleTradeTable } from "../../dashboard";

// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 10,
//   borderRadius: 20,
//   [`&.${linearProgressClasses.colorPrimary}`]: {
//     backgroundColor:
//       theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
//   },
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 20,
//     background:
//       "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
//   },
// }));

// const remianStepData = {
//   dataone: {
//     icon: <CreditCard />,
//     title: "Add a payment method",
//     description: "Get ready to trade",
//     question: "Why is this important",
//     answer: "answer is nice ",
//   },
//   datatwo: {
//     icon: <SwapHoriz />,
//     title: "Buy your first crypto",
//     description: "Jump start your crypto portfolio",
//     question: "Learn more",
//     answer: "answer is nice ",
//   },
// };
// let topMovers = [
//   {
//     img: augur,
//     name: "Augur",
//     text: "REP",
//     price: "PKR 2,970.43",
//     percentage: "62.91%",
//     Icon: SouthEast,
//   },
//   {
//     img: golem,
//     name: "Golem (old)",
//     text: "GNT",
//     price: "PKR 2,970.43",
//     percentage: "62.91%",
//     Icon: CallMade,
//   },
//   {
//     img: metal,
//     name: "Metal",
//     text: "MTL",
//     price: "PKR 2,970.43",
//     percentage: "62.91%",
//     Icon: SouthEast,
//   },
// ];
let accordiantData = [
  {
    heading: "FAQ",
    detail: "FAQ details",
  },
  {
    heading: "Account agreement & statements",
    detail: "Account agreement & statements details",
  },
];

const DashboardHome = () => {
  const [open, setOpen] = useState(false);
  const { userDbData } = useSelector((store) => store.global);
  // console.log("userDbData data:=======", userDbData);

  const toggelModel = () => {
    setOpen(!open);
  };
  return (
    <>
      <Animation>
        <AddpaymountModal
          open={open}
          setOpen={setOpen}
          toggelModel={toggelModel}
        />
        <Grid container rowSpacing={2}>
          <Grid
            item
            xs={12}
            // lg={7}
            pr={{ xs: 0, lg: 3 }}
            sx={{
              borderRight: {
                xs: "none",
                // , lg: "1px solid #D09B03"
              },
            }}
          >
            <Typography variant="h3" my="3" px="5">
              {`Welcome ${userDbData?.firstName} ${userDbData?.lastName}`}
            </Typography>
            {userDbData?.usdtBalance && (
              <Typography mt={1.2} mb={2.5}>
                {`USDT balance: ${userDbData?.usdtBalance} $`}
              </Typography>
            )}
            {/* <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              my={1.5}
            >
              <Tickicon text="You’re almost there" />
              <Box
                display="flex"
                justifyContent="flex-end"
                my={1.5}
                alignItems="center"
              >
                <Box width={{ xs: "120px", sm: "200px" }}>
                  <BorderLinearProgress variant="determinate" value={50} />
                </Box>
                <Typography ml={{ xs: 1, lg: 2 }}>2/4</Typography>
              </Box>
            </Box> */}

            {/* <Typography variant="h2" fontFamily="Roboto">
              Find your account
            </Typography> */}
            {/* <Box
              sx={{
                borderTop: "1px solid #FCF3BD",
                mt: 3.7,
                pt: 3,
              }}
            >
              <Typography variant="h4" color=" #D09B03">
                Remaining Steps
              </Typography>
              <Typography mt={1.2} mb={2.5}>
                You’re close to finishing your account setup. Next up, add a
                payment method.
              </Typography>
              <Tickicon text="Account Created" />
              <Tickicon text="Verify your info" mt={1} />

              {Object.keys(remianStepData).map((key, i) => {
                return (
                  <Box key={i} mt="25px" display="flex" alignItems="center">
                    <IconButton
                      sx={{
                        color: "#D09B03",
                      }}
                    >
                      {remianStepData[key].icon}
                    </IconButton>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignContent="center"
                      gap={{ xs: "10px", md: "3px" }}
                      ml={{ xs: 0, md: 2 }}
                    >
                      <Typography variant="h4">
                        {remianStepData[key].title}
                      </Typography>
                      <Typography fontSize="13px">
                        {remianStepData[key].description}
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <Typography color="#D09B03">
                          {remianStepData[key].question}
                        </Typography>
                        <ExpandMore
                          sx={{
                            color: "#D09B03",
                          }}
                        />

                        {remianStepData[key].title ===
                          "Add a payment method" && (
                          <ButtonMain
                            className="hvr-bounce-to-right"
                            onClick={toggelModel}
                            sx={{
                              fontSize: "10px",
                              py: "8px",
                              px: { xs: "5px", sm: "10px" },
                              ml: { xs: "0px", md: "130px" },
                            }}
                          >
                            Add a payment method
                          </ButtonMain>
                        )}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box> */}
            <Box mt={5}>
              <SimpleTradeTable />
            </Box>
            <Box
              sx={{
                borderTop: "1px solid #FCF3BD",
                mt: 3.5,
                pt: 2,
              }}
            >
              <Typography variant="h4" color="#D09B03" my="25px">
                More Info
              </Typography>
              <MoreInfoAccordion accordiantData={accordiantData} />
            </Box>
            <Box
              sx={{
                borderTop: "1px solid #FCF3BD",
                mt: 3.5,
                pt: 2,
              }}
            >
              <Typography variant="h4" color=" #D09B03">
                Tuesady, February 07
              </Typography>
              <Box
                display="flex"
                // justifyContent="space-between"
                gap={5}
                flexWrap="wrap"
                mt={2}
              >
                <Box>
                  <img src={videoimg} alt="video" />
                </Box>
                <Box mr={1} mt={2}>
                  <Typography component="span" fontSize="16px">
                    Coinbase Learn
                  </Typography>
                  <Typography fontSize="12px" component="span" ml={2}>
                    Tips & tutorials
                  </Typography>
                  <Typography fontSize="18px" color="#D09B03" mt="28px">
                    How to setup a crypto wallet?
                  </Typography>
                  <Typography>
                    Learn about different kinds of crypto wallets and how to set
                    them up.
                  </Typography>
                  <Box
                    display="flex"
                    columnGap="20px"
                    alignItems="center"
                    mt={3}
                  >
                    <FavoriteBorder sx={{ color: "#D09B03" }} />
                    <Typography color="#D09B03">12k</Typography>
                    <ArrowUpward sx={{ color: "#D09B03" }} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* <Grid item xs={12} lg={5}>
            <Box
              sx={{
                height: "50px",
                background:
                  "linear-gradient
                  (180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
              }}
            />
            <Box p={{ xs: 1, lg: 2 }}>
              <Box display="flex" justifyContent="space-between" my={1}>
                <Typography variant="h4">Top Movers</Typography>
                <Typography color="#D09B03">See all</Typography>
              </Box>
              <CustomTable data={topMovers} /> */}
          {/* {topMovers.map(
              ({ img, name, text, price, percentage, Icon }, ind) => (
                <Box
                  mt={2}
                  key={ind}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" alignItems="center">
                    <img src={img} alt="logo" width="35px" height="35px" />
                    <Box ml={1}>
                      <Typography>{name}</Typography>
                      <Typography fontSize="14px">{text}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography fontSize="14px">{price}</Typography>
                    <Box
                      display="flex"
                      sx={{
                        float: "right",
                        color: Icon === CallMade ? "#D5232F" : "#098551",
                      }}
                    >
                      <Icon fontSize="small" sx={{ mr: 1 }} />
                      <Typography fontSize="14px">{percentage}</Typography>
                    </Box>
                  </Box>
                </Box>
              )
            )} */}
          {/* </Box>
          </Grid> */}
        </Grid>
      </Animation>
    </>
  );
};

export default DashboardHome;
