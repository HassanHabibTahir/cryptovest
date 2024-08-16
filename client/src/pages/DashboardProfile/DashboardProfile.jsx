/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Dialog,
  IconButton,
  InputAdornment,
  MenuItem,
  DialogContent,
  Avatar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { ArrowBack, Search, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { ButtonMain, ButtonBorder, CustomInput } from "../../componenets";
// eslint-disable-next-line import/no-cycle
import { currency, timeZone } from "./index";
import {
  useGetUserDataQuery,
  useUploadProfilePicMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../services/userApis";
import Toastify from "../../connectivityAssets/Toastify";
import { setUserDbData } from "../../slices";
import Animation from "../../componenets/Animation";

const DashboardHome = () => {
  const [deleteUser] = useDeleteUserMutation();
  const [uploadProfilePic] = useUploadProfilePicMutation();
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const { data } = useGetUserDataQuery();
  const [dltSure, setDltSure] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    timeZone: "",
    currency: "",
    resedentialAddress: "",
    cryptoAddressess: "",
  });
  const [open, setOpen] = useState(false);
  const [openPhoto, setPhotoOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { userDbData } = useSelector((store) => store.global);

  const handleProfileDataChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };
  const showToast = useCallback((msg, type) => {
    return setAlertState({
      open: true,
      message: msg,
      severity: type,
    });
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePhotoOpen = () => {
    setPhotoOpen(true);
  };
  const handlePhotoClose = () => {
    setPhotoOpen(false);
  };
  const handleProfileOpen = () => {
    setProfileOpen(true);
  };
  const handleProfileClose = () => {
    setProfileOpen(false);
  };
  const handleImgSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("profilePic", imageFile);
      const data1 = await uploadProfilePic(formData).unwrap();
      showToast(data1?.message, "success");
      setPhotoOpen(false);
      setImageFile(false);
    } catch (error) {
      showToast(error?.message, "error");
    }
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(profileData).unwrap();
      showToast("Profile Updated!", "success");
      setProfileOpen(false);
      setProfileData({
        firstName: "",
        lastName: "",
        dob: "",
        timeZone: "",
        currency: "",
        resedentialAddress: "",
        cryptoAddressess: "",
      });
    } catch (error) {
      showToast(error?.message, "error");
    }
  };
  const handleDeleteAccount = async () => {
    try {
      dispatch(setUserDbData(null));
      await deleteUser();
      showToast("Deleted", "success");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      showToast(error?.message, "error");
    }
  };

  return (
    <Animation>
      <Box>
        <Toastify setAlertState={setAlertState} alertState={alertState} />
        {/* Edit Profile here */}
        <Dialog
          fullWidth
          maxWidth="sm"
          open={profileOpen}
          onClose={handleProfileClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            sx={{
              background:
                "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",

              border: "2px solid transparent",
            }}
          >
            <IconButton
              onClick={handleProfileClose}
              sx={{
                float: "right",
                background:
                  "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
              }}
            >
              <Close sx={{ color: "#000" }} />
            </IconButton>
            <Typography align="center" variant="h4">
              Change Profile Settings
            </Typography>

            <form onSubmit={handleProfileSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography>First name</Typography>
                  <CustomInput
                    type="text"
                    onChange={handleProfileDataChange}
                    name="firstName"
                    required
                    placeholder="First Name"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Last name</Typography>

                  <CustomInput
                    type="text"
                    required
                    onChange={handleProfileDataChange}
                    placeholder="Last Name"
                    name="lastName"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>Date of birth</Typography>

                  <CustomInput
                    type="date"
                    required
                    id="outlined-required"
                    onChange={handleProfileDataChange}
                    name="dob"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography>Address</Typography>

                  <CustomInput
                    type="text"
                    required
                    placeholder="Address"
                    name="resedentialAddress"
                    onChange={handleProfileDataChange}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography>Timezone</Typography>

                  <CustomInput
                    required
                    select
                    onChange={handleProfileDataChange}
                  >
                    {timeZone.map((item, i) => (
                      <MenuItem
                        key={i}
                        disabled={i === 0}
                        value={item}
                        sx={{ color: "black" }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </CustomInput>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography>Currency</Typography>

                  <CustomInput
                    required
                    select
                    // defaultValue="Currency"
                    onChange={handleProfileDataChange}
                  >
                    {currency.map((item, i) => (
                      <MenuItem
                        key={i}
                        disabled={i === 0}
                        value={item}
                        sx={{ color: "black" }}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </CustomInput>
                </Grid>
              </Grid>

              <br />

              <ButtonMain
                type="submit"
                sx={{
                  fontSize: "15px",
                  py: "12px",
                  width: "100%",
                  marginTop: "15",
                }}
              >
                Update Now
              </ButtonMain>
            </form>
          </DialogContent>
        </Dialog>

        {/* Are You Sure for account deletion */}
        <Dialog
          fullWidth
          maxWidth="sm"
          open={dltSure}
          onClose={() => setDltSure(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            sx={{
              background:
                "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",

              border: "2px solid transparent",
            }}
          >
            <Typography align="center" variant="h4" mb={3}>
              Are You Sure ?
            </Typography>

            <Box display="flex">
              <ButtonMain
                sx={{
                  fontSize: "15px",
                  py: "12px",
                  width: "48%",
                  mx: 0.5,
                }}
                onClick={handleDeleteAccount}
              >
                Yes
              </ButtonMain>
              <ButtonMain
                sx={{
                  fontSize: "15px",
                  py: "12px",
                  width: "48%",
                  mx: 0.5,
                }}
                onClick={() => setDltSure(false)}
              >
                No
              </ButtonMain>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Image Upload Dialog here */}
        <Dialog
          maxWidth="sm"
          fullWidth
          open={openPhoto}
          onClose={handlePhotoClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            sx={{
              background:
                "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",

              border: "2px solid transparent",
            }}
          >
            <IconButton
              onClick={handlePhotoClose}
              sx={{
                float: "right",
                background:
                  "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
              }}
            >
              <Close sx={{ color: "#000" }} />
            </IconButton>
            <Typography align="center" variant="h4" mb={3}>
              Change Photo
            </Typography>

            <ButtonMain
              variant="contained"
              component="label"
              fullWidth
              sx={{
                fontSize: "15px",
                py: "12px",
                width: "100%",
                marginTop: "15",
              }}
            >
              Upload Photo
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </ButtonMain>
            {imageFile && (
              <>
                <Box my={1}>
                  <img
                    width="100%"
                    height={340}
                    src={URL.createObjectURL(imageFile)}
                    alt=""
                  />
                </Box>
                <ButtonMain onClick={handleImgSubmit}>Upload</ButtonMain>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Search Dialog here */}
        <Dialog
          fullWidth
          maxWidth="sm"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            sx={{
              background:
                "linear-gradient(#31312C, #2A2A29) padding-box,\n               linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%), border-box",

              border: "2px solid transparent",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                float: "left",
                background:
                  "linear-gradient(180deg, #D09B03 0%, #FEF9C8 35.06%, #D38D00 74.31%, #FFF8C4 116%)",
              }}
            >
              <ArrowBack sx={{ color: "#000" }} />
            </IconButton>
            <Typography align="center" variant="h4" mb={3}>
              Select Crypto addresses
            </Typography>
            <CustomInput
              type="search"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "#fff" }} />
                  </InputAdornment>
                ),
              }}
            />
            <Box
              height="300px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography mb={2}>No results for </Typography>
              <ButtonBorder>clear search</ButtonBorder>
            </Box>
          </DialogContent>
        </Dialog>

        <Grid container rowSpacing={2}>
          <Grid item xs={12} lg={2}>
            &nbsp;
          </Grid>
          <Grid item xs={12} lg={8} pr={{ xs: 0, lg: 3 }}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box my={1.5} alignItems="center">
                <Box
                  display="flex"
                  flexDirection={{ xs: "row", md: "row" }}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box m={1.5} alignItems="center">
                    <Avatar
                      sx={{ width: "80px", height: "80px" }}
                      src={`data:image/png;base64,${userDbData?.profilePicBuffer}`}
                    />
                  </Box>
                  <Box sx={{ lineHeight: "0px", marginLeft: { md: "20px" } }}>
                    <Typography
                      variant="h2"
                      fontFamily="Roboto"
                      fontWeight="bold"
                    >
                      {`${userDbData?.firstName} ${userDbData?.lastName}`}
                    </Typography>
                    <br />
                    <Typography component="span">
                      {userDbData?.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box my={1.5} alignItems="center">
                <ButtonMain
                  className="hvr-bounce-to-right"
                  onClick={handlePhotoOpen}
                  sx={{
                    fontSize: "10px",
                    py: "8px",
                    px: { xs: "5px", sm: "10px", md: "10px" },
                  }}
                >
                  Edit Profile Photo
                </ButtonMain>
              </Box>
            </Box>

            <Box
              sx={{
                border: "1px solid #FCF3BD",
                borderRadius: "10px",
              }}
            >
              <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignContent="center"
                gap={{ xs: "10px", md: "3px" }}
                padding="20px"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    variant="h3"
                    fontFamily="Roboto"
                    fontWeight="bold"
                  >
                    Contact info
                  </Typography>
                </Box>
                <Box sx={{ display: { xs: "none" } }}>&nbsp;</Box>
              </Box>

              <Box
                sx={{ borderTop: "1px solid #FCF3BD" }}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignContent="center"
                gap={{ xs: "10px", md: "3px" }}
                padding="20px"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    Display name
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    {`${userDbData?.firstName} ${userDbData?.lastName}`}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ borderTop: "1px solid #FCF3BD" }}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignContent="center"
                gap={{ xs: "10px", md: "3px" }}
                padding="20px"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    Email address
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    {data?.email}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ borderTop: "1px solid #FCF3BD" }}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignContent="center"
                gap={{ xs: "10px", md: "3px" }}
                padding="20px"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    Crypto addresses
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    <CurrencyBitcoinIcon
                      style={{
                        background: "#f7931a",
                        borderRadius: "50%",
                        padding: "1px",
                      }}
                    />
                    <KeyboardArrowRightIcon
                      onClick={handleClickOpen}
                      style={{ cursor: "pointer" }}
                    />
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* //////////////////////////////////////////////// */}

            <Box
              sx={{
                marginTop: "50px",
                border: "1px solid #FCF3BD",
                borderRadius: "10px",
                // p: 3,
              }}
            >
              <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignContent="center"
                gap={{ xs: "10px", md: "3px" }}
                padding="20px"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    variant="h3"
                    fontFamily="Roboto"
                    fontWeight="bold"
                  >
                    Personal info
                  </Typography>
                </Box>
                <Box sx={{ display: { xs: "none" } }}>&nbsp;</Box>
              </Box>

              <Box
                sx={{ borderTop: "1px solid #FCF3BD" }}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignContent="center"
                gap={{ xs: "10px", md: "3px" }}
                padding="20px"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    Legal name
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    {`${data?.firstName} ${data?.lastName}`}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ borderTop: "1px solid #FCF3BD" }}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignContent="center"
                gap={{ xs: "10px", md: "3px" }}
                padding="20px"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    Date of birth
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    {data?.dob
                      ? JSON.stringify(new Date(data?.dob)).slice(1, 11)
                      : "N/A"}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ borderTop: "1px solid #FCF3BD" }}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignContent="center"
                gap={{ xs: "10px", md: "3px" }}
                padding="20px"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    Address
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    <Typography
                      variant="body"
                      fontFamily="Roboto"
                      sx={{ position: "relative", top: "-6px" }}
                    >
                      {data?.resedentialAddress || "N/A"}
                    </Typography>
                    <KeyboardArrowRightIcon />
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ borderTop: "1px solid #FCF3BD" }}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignContent="center"
                gap={{ xs: "10px", md: "3px" }}
                padding="20px"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    Manage your privacy setting
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    <KeyboardArrowRightIcon />
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* //////////////////////////////////////////////// */}

            <Box
              sx={{
                marginTop: "50px",
                border: "1px solid #FCF3BD",
                borderRadius: "10px",
                // p: 3,
              }}
            >
              <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignContent="center"
                gap={{ xs: "10px", md: "3px" }}
                padding="20px"
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    variant="h3"
                    fontFamily="Roboto"
                    fontWeight="bold"
                  >
                    Preferences
                  </Typography>
                </Box>
                <Box sx={{ display: { xs: "none" } }}>&nbsp;</Box>
              </Box>

              <Box
                sx={{ borderTop: "1px solid #FCF3BD" }}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignContent="center"
                gap={{ xs: "10px", md: "3px" }}
                padding="20px"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    Timezone
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    <Typography
                      variant="body"
                      fontFamily="Roboto"
                      sx={{ position: "relative", top: "-6px" }}
                    >
                      {data?.timeZone || "N/A"}
                    </Typography>
                    <KeyboardArrowRightIcon />
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ borderTop: "1px solid #FCF3BD" }}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignContent="center"
                gap={{ xs: "10px", md: "3px" }}
                padding="20px"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    Currency
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    <Typography
                      variant="body"
                      fontFamily="Roboto"
                      sx={{ position: "relative", top: "-6px" }}
                    >
                      {data?.currency || "N/A"}
                    </Typography>
                    <KeyboardArrowRightIcon />
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* //////////////////////////////////////////////// */}

            <ButtonMain
              className="hvr-bounce-to-right"
              onClick={handleProfileOpen}
              sx={{
                fontSize: "10px",
                py: "8px",
                px: { xs: "5px", sm: "10px", md: "10px" },
                mt: "20px",
              }}
            >
              Edit Profile Detail
            </ButtonMain>

            <Box
              sx={{
                marginTop: "50px",
                border: "1px solid #FCF3BD",
                borderRadius: "10px",
                // p: 3,
              }}
            >
              <Box sx={{ padding: "20px" }}>
                <Typography variant="h3" fontFamily="Roboto" fontWeight="bold">
                  Close account
                </Typography>
              </Box>

              <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignContent="center"
                padding="20px"
                justifyContent="space-between"
              >
                <Box>
                  <Typography variant="body" fontFamily="Roboto">
                    Closing your account can’t be undone. Please make sure
                    <br />
                    your account balance is $0.00 before you begin.
                  </Typography>
                </Box>
                <Box alignItems="center">
                  <ButtonMain
                    className="hvr-bounce-to-right"
                    onClick={() => setDltSure(true)}
                    sx={{
                      fontSize: "10px",
                      py: "8px",
                      px: { xs: "5px", sm: "10px", md: "20px" },
                    }}
                  >
                    Close account
                  </ButtonMain>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={2}>
            &nbsp;
          </Grid>
        </Grid>
      </Box>
    </Animation>
  );
};

export default DashboardHome;
