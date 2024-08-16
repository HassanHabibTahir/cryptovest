import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AppsIcon from "@mui/icons-material/Apps";

// import Tooltip from "@mui/material/Tooltip";
// import ButtonMain from "../componenets/ButtonMain";
import ButtonBorder from "../componenets/ButtonBorder";

export default function HeaderBtnMenu({
  //  toggelBuyModel,
  toggelSendModel,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box>
        {/* <Tooltip title="Account settings"> */}
        <IconButton
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            color: "#000",
            padding: "10px",
            background:
              " linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
          }}
        >
          <AppsIcon />
        </IconButton>
        {/* </Tooltip> */}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            background: "#292929",
            minWidth: "200px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: "''",
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem onClick={toggelBuyModel} sx={{ color: "#000" }}>
          <ButtonMain sx={{ width: "100%" }}> Buy & sell</ButtonMain>
        </MenuItem> */}
        <MenuItem onClick={toggelSendModel} sx={{ color: "#000" }}>
          <ButtonBorder sx={{ width: "100%" }}>Send & receive</ButtonBorder>
        </MenuItem>
      </Menu>
    </>
  );
}
