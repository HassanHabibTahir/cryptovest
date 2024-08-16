import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { setIsLoggedIn, setUserDbData } from "./slices";
import Toastify from "./connectivityAssets/Toastify";
import { useGetUserMutation } from "./services/authApis";

import AuthRoutes from "./Routes/AuthRoutes";
import { DashboardRoutes } from "./Routes";
// import ResponsiveDrawer from "./dashboard/ResponsiveDashboard";
import { Footer, Header } from "./componenets";
import { Home } from "./pages";
import Loading from "./componenets/Loading";

// You can also use <link> for styles
// ..
AOS.init();
function App() {
  const dispatch = useDispatch();
  const [wait, setwait] = useState(true);
  const { isLoggedIn } = useSelector((store) => store.global);
  const token = localStorage.getItem("token");
  const [getUser] = useGetUserMutation();

  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  useEffect(() => {
    async function userData() {
      try {
        if (token) {
          const dbData = await getUser().unwrap();
          console.log(dbData, token, "user======>>>");

          if (dbData?.isLoggedIn) {
            dispatch(setUserDbData(dbData));
            dispatch(setIsLoggedIn(true));
            setwait(false);
          } else {
            dispatch(setIsLoggedIn(false));
            setwait(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    userData();
  }, [dispatch, getUser, token]);

  return (
    <div>
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Suspense fallback={<Loading loading />}>
        <Routes>
          <Route
            path="/"
            element={
              <Box>
                <Header />
                <Home />
                <Footer />
              </Box>
            }
          />
          <Route path="/*" element={<AuthRoutes />} />
          <Route
            path="/dashboard/*"
            element={
              <>
                {!wait ? (
                  <>
                    {" "}
                    {isLoggedIn ? (
                      <DashboardRoutes />
                    ) : (
                      <Navigate to="/sign-in" />
                    )}
                  </>
                ) : (
                  <>
                    <Loading loading={wait} />
                  </>
                )}
              </>
            }
          />

          {/* <Route path="/drawer" element={<ResponsiveDrawer />} /> */}
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;
