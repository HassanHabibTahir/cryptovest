import React from "react";
import { Container, Grid, Box, Typography } from "@mui/material";

import earnbg from "../images/earnbg.png";
import grt from "../images/grt.png";
import amp from "../images/amp.png";
import shiping from "../images/shiping.png";
import near from "../images/near.png";
import ButtonMain from "./ButtonMain";

let Table = [
  {
    image: grt,
    name: "The Graph GRT",
    earn: "Earn $4 GRT",
  },
  {
    image: amp,
    name: "Amp AMP",
    earn: "Earn $3 AMP",
  },
  {
    image: shiping,
    name: "Shoping SHOPING",
    earn: "Earn $3 SHOPING",
  },
  {
    image: near,
    name: "Neer protocal NEAR",
    earn: "Earn $3 NEAR",
  },
];

const EarnUpTo = () => {
  return (
    <Container maxWidth="lg" sx={{ px: 3 }}>
      <Grid container alignItems="center" my={5} spacing={5}>
        <Grid item xs={12} md={6} lg={7}>
          <Box pr={{ xs: 0, lg: 17 }}>
            <div
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              <Typography variant="h1">
                Earn up to $13 worth of crypto
              </Typography>
            </div>
            <div
              data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              <Typography
                py={3}
                sx={{ fontSize: "16px", fontFamily: "Roboto " }}
              >
                Discover how specific cryptocurrencies work — and get a bit of
                each crypto to try out for yourself. Start earning
              </Typography>
            </div>
            <div
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              <ButtonMain
                className="hvr-bounce-to-right"
                sx={{ px: 2, fontWeight: "bold" }}
              >
                Start Earning
              </ButtonMain>
            </div>
          </Box>
        </Grid>
        <Grid item md={6} lg={5} xs={12}>
          <div data-aos="flip-left" data-aos-duration="2000">
            <Box
              sx={{
                backgroundImage: `url(${earnbg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              <Box px={{ xs: 2, sm: 3 }} pt={10} pb={7}>
                {Table.map(({ image, name, earn }, index) => (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    key={index}
                  >
                    <Box display="flex" alignItems="center" py={2.5}>
                      <img
                        src={image}
                        alt="not found"
                        srcSet=""
                        width="25px"
                        height="25px"
                      />
                      <Typography
                        pl={{ xs: 1, sm: 2 }}
                        sx={{
                          fontFamily: "Roboto",
                          fontSize: { xs: "15px", sm: "20px" },
                          fontWeight: "400",
                        }}
                      >
                        {name}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "12px",
                      }}
                    >
                      {earn}
                    </Typography>
                  </Box>
                ))}

                <ButtonMain
                  className="hvr-bounce-to-right"
                  sx={{ px: 2, fontWeight: "bold" }}
                >
                  view more
                </ButtonMain>
              </Box>
            </Box>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EarnUpTo;
