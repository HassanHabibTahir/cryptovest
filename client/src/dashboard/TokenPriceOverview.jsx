import { Box, Grid, Typography } from "@mui/material";
import {
  ErrorOutline,
  Star,
  FeedOutlined,
  LanguageOutlined,
} from "@mui/icons-material";
import React from "react";
import BoxMain from "./BoxMain";
import { ButtonMain, CustomTable } from "../componenets";
import BorderLinearProgress from "./BorderLinearProgress";
import {
  BitRewards,
  WrappedBitcoin,
  Cartesi,
  Polygon,
  BarnBridge,
  SuperRare,
  Marinade,
  Bittup,
  community,
} from "../assets/index";
import GradientLineChart from "./Chart";
import BuyAndSell from "./BuyAndSell";

const ratings = [
  {
    heading: "Community",
    value: 90,
    rating: "4.6(4.3K)",
  },
  {
    heading: "Roadmap",
    value: 85,
    rating: "4.4(4.3K)",
  },
  {
    heading: "Usefulness",
    value: 87,
    rating: "4.5(4.3K)",
  },
];
let priceCorrelation = [
  {
    img: BitRewards,
    name: "BitRewards",
    text: "Moves tightly together",
    price: "PKR 0.0042",
    percentage: "100%",
  },
  {
    img: WrappedBitcoin,
    name: "Wrapped Bitcoin",
    text: "Moves tightly together",
    price: "PKR 5,897,782.59",
    percentage: "100%",
  },
  {
    img: Cartesi,
    name: "Cartesi",
    text: "Moves tightly together",
    price: "PKR 41.17",
    percentage: "100%",
  },
  {
    img: Polygon,
    name: "Polygon",
    text: "Moves tightly together",
    price: "PKR 3321.54",
    percentage: "88%",
  },
  {
    img: BarnBridge,
    name: "BarnBridge",
    text: "Moves tightly together",
    price: "PKR 1303.00",
    percentage: "82%",
  },
  {
    img: SuperRare,
    name: "SuperRare",
    text: "Moves together",
    price: "PKR 41.56",
    percentage: "74%",
  },
  {
    img: Marinade,
    name: "Marinade",
    text: "Moves against",
    price: "PKR 16.24",
    percentage: "-46%",
  },
  {
    img: Bittup,
    name: "BITTUP",
    text: "Moves against",
    price: "PKR 891.28",
    percentage: "-59%",
  },
];
const resources = [
  {
    Icon: FeedOutlined,
    text: "Whitepaper",
  },
  {
    Icon: LanguageOutlined,
    text: "Official website",
  },
];
const topStories = [
  {
    heading: " BTC/ICP Integration Beta Release: The Bitcoin Testnet API Is ",
    text: "Inflation slowed to 6.4%, but markets, including Bitcoin and Ethereum, are still parsing through several mixed signals from the CPI report.",
    block: "Decrypt",
    date: "17 hours ago",
  },
  {
    heading: " BTC/ICP Integration Beta Release: The Bitcoin Testnet API Is ",
    text: "Inflation slowed to 6.4%, but markets, including Bitcoin and Ethereum, are still parsing through several mixed signals from the CPI report.",
    block: "Decrypt",
    date: "17 hours ago",
  },
];

const TokenPriceOverview = () => {
  return (
    <Grid container columnSpacing={3} mt={3}>
      <Grid item xs={12} lg={7.7}>
        <BoxMain>
          <GradientLineChart />
        </BoxMain>
        <BoxMain sx={{ p: "0px !important" }} mt={3}>
          <Box p={{ xs: "20px", md: "30px" }}>
            <Typography variant="h4" fontWeight="600">
              Overview
            </Typography>
            <Typography my={4} fontSize="14px">
              Bitcoin is the world’s first widely-adopted cryptocurrency. With
              Bitcoin, people can securely and directly send each other digital
              money on the internet.
              <br />
              <br />
              Unlike services like Venmo and PayPal, which rely on the
              traditional financial system for permission to transfer money and
              on existing debit/credit accounts, Bitcoin is decentralized: any
              two people, anywhere in the world, can send Bitcoin to each other
              without the involvement of a bank, government, or other
              institution.
            </Typography>
            <Typography fontSize="14px">RESOURCES</Typography>
            {resources.map(({ Icon, text }, i) => (
              <Box
                key={i}
                display="flex"
                alignItems="center"
                gap="10px"
                my={1.5}
              >
                <Icon />
                <Typography fontSize="14px" sx={{ color: "#E1AE3C" }}>
                  {text}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box borderTop="2px solid #D09B03" align="center" py={2}>
            <Typography>View more</Typography>
          </Box>
        </BoxMain>
        <BoxMain mt={3}>
          <Typography variant="h4">Community updates</Typography>
          <Grid container columnSpacing={10} mt={3}>
            <Grid item xs={12} sm={8}>
              <Typography
                fontSize={{ xs: "15px", md: "20px" }}
                lineHeight="23px"
              >
                BTC/ICP Integration Beta Release: The Bitcoin Testnet API Is Now
                Available
              </Typography>
              <Box display="flex" flexWrap="wrap" columnGap="15px" mt={2}>
                <Typography>dfinity Team</Typography>
                <Typography>Aug 04, 2022</Typography>
                <Box display="flex" alignItems="center" gap="5px">
                  <Box
                    width="8px"
                    height="8px"
                    borderRadius="50%"
                    backgroundColor="#E1AE3C"
                  />
                  <Typography>Bitcoin</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={0} sm={4}>
              <Box
                sx={{
                  display: { xs: "none", sm: "block" },
                  height: "120px",
                  backgroundImage: `url(${community})`,
                  backgroundSize: "cover ",
                  backgroundPosition: "left",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </Grid>
          </Grid>
        </BoxMain>
        <BoxMain mt={3}>
          <Typography variant="h4">Top stories</Typography>
          {topStories.map(({ heading, text, block, date }, i) => (
            <Box key={i} borderBottom="2px solid #E1AE3C">
              <Grid container columnSpacing={10} my={2}>
                <Grid item xs={12} sm={8}>
                  <Typography
                    fontSize={{ xs: "15px", md: "20px" }}
                    lineHeight="23px"
                  >
                    {heading}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {text}
                  </Typography>
                  <Box display="flex" flexWrap="wrap" columnGap="15px" mt={2}>
                    <Typography>{block}</Typography>
                    <Typography>{date}</Typography>
                    <Box display="flex" alignItems="center" gap="5px">
                      <Box
                        width="8px"
                        height="8px"
                        borderRadius="50%"
                        backgroundColor="#E1AE3C"
                      />
                      <Typography>Bitcoin</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={0} sm={4}>
                  <Box
                    sx={{
                      display: { xs: "none", sm: "block" },
                      height: "120px",
                      backgroundImage: `url(${community})`,
                      backgroundSize: "cover ",
                      backgroundPosition: "left",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
        </BoxMain>
      </Grid>
      <Grid item xs={12} lg={4.3}>
        <BoxMain
          mt={{ xs: 3, lg: 0 }}
          sx={{
            paddingLeft: "0px",
            paddingRight: "0px",
            paddingBottom: "0px",
          }}
        >
          <BuyAndSell />
        </BoxMain>
        <BoxMain mt={3}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Star sx={{ color: "#E1AE3C" }} fontSize="large" />
              <Typography fontSize="20px" fontWeight="600">
                4.5 out of 5
              </Typography>
            </Box>
            <Typography fontSize="20px" fontWeight="600">
              view details
            </Typography>
          </Box>
          {ratings.map(({ heading, value, rating }, i) => (
            <Box
              my={1.5}
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography sx={{ width: "30%", fontWeight: "600" }}>
                {heading}
              </Typography>
              <Box width={{ xs: "45%" }}>
                <BorderLinearProgress variant="determinate" value={value} />
              </Box>
              <Typography sx={{ width: "20%" }}>{rating}</Typography>
            </Box>
          ))}
          <ButtonMain sx={{ py: 2, width: "100%", mt: 2 }}>
            View details
          </ButtonMain>
          <Typography fontSize="14px" mt={1}>
            This content is provided for informational purpose only. Learn more
          </Typography>
        </BoxMain>
        <BoxMain mt={3}>
          <Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h4" fontWeight="600">
                Price correlation with
              </Typography>
              <ErrorOutline />
            </Box>
            <CustomTable data={priceCorrelation} />
          </Box>
        </BoxMain>
      </Grid>
    </Grid>
  );
};

export default TokenPriceOverview;
