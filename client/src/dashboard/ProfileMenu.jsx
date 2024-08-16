import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { setIsLoggedIn, setUserDbData } from "../slices";

export default function ProfileMenu() {
  const { userDbData } = useSelector((store) => store.global);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    dispatch(setUserDbData(null));
    dispatch(setIsLoggedIn(false));
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <Box>
        <Tooltip title="Account settings" placement="left">
          <IconButton
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              background:
                "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",
              border: "2px solid transparent",
              p: 0,
            }}
          >
            <Avatar
              src={`data:image/png;base64,${userDbData?.profilePicBuffer}`}
            />
          </IconButton>
        </Tooltip>
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
        <Link
          to="/dashboard/profile"
          style={{ textDecoration: "none", color: "white" }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar
              src={`data:image/png;base64,${userDbData?.profilePicBuffer}`}
            />
            Profile
          </MenuItem>
        </Link>

        <Divider />
        <MenuItem
          onClick={() => {
            handleLogOut();
            // handleClose();
          }}
        >
          <ListItemIcon>
            <PersonAdd fontSize="small" sx={{ color: "#fff" }} />
          </ListItemIcon>
          logout
        </MenuItem>
      </Menu>
    </>
  );
}
