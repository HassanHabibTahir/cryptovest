import React, { useState } from "react";

import { Box, Container, Divider, Typography } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import { Link, useParams } from "react-router-dom";

import BoxMain from "../../dashboard/BoxMain";
import { ButtonMain, CustomInput } from "../../componenets";

const SetupVaultName = () => {
  const { vault } = useParams();
  const [vaultName, setVaultName] = useState(`${vault} vault`);

  return (
    <>
      <Container maxWidth="sm">
        <BoxMain sx={{ p: 4, my: { md: 10, xs: 3 } }}>
          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <WbSunnyIcon sx={{ fontSize: "45px" }} />
            <Typography variant="h3">Name Your ETH Vault</Typography>
          </Box>
          <Divider
            sx={{
              my: 3,
              background:
                "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
              height: "2px",
            }}
          />
          <Box>
            <Typography variant="body">Vault Name</Typography>
            <CustomInput
              placeholder="Vault Name"
              value={vaultName}
              onChange={(e) => setVaultName(e.target.value)}
            />
          </Box>
          <Divider
            sx={{
              my: 3,
              background:
                "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
              height: "2px",
            }}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <ButtonMain p={1} startIcon={<ArrowCircleLeftOutlinedIcon />}>
              Cancel
            </ButtonMain>
            <Link
              to={`/dashboard/vault-creation-complete/${vault}/${vaultName}`}
              style={{ textDecoration: "none" }}
            >
              <ButtonMain p={1.5} endIcon={<ArrowCircleRightOutlinedIcon />}>
                Next
              </ButtonMain>
            </Link>
          </Box>
        </BoxMain>
      </Container>
    </>
  );
};

export default SetupVaultName;
