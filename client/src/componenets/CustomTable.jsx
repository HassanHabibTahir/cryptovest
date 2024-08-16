import React from "react";
import { CallMade } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const CustomTable = ({ data }) => {
  return (
    <Box>
      {data.map(({ img, name, text, price, percentage, Icon }, ind) => (
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
              <Typography fontWeight="500">{name}</Typography>
              <Typography fontSize="14px">{text}</Typography>
            </Box>
          </Box>
          <Box sx={{ float: "right" }}>
            <Typography fontSize="14px" fontWeight="500">
              {price}
            </Typography>
            {Icon ? (
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
            ) : (
              <Typography fontSize="14px" sx={{ float: "right" }}>
                {percentage}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CustomTable;
