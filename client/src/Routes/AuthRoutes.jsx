import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import {
  ForgotPassword,
  Register,
  ResetPassword,
  Signin,
  TwoStepCode,
  TwoStepVerification,
  WaitForEmail,
  VerifyOtp,
  VerifyUser,
} from "../pages";

const AuthRoutes = () => {
  const { isLoggedIn } = useSelector((store) => store.global);

  return (
    <div>
      <Routes>
        <Route
          path="/sign-in"
          element={!isLoggedIn ? <Signin /> : <Navigate to="/dashboard" />}
        />
        <Route path="/email-verification" element={<WaitForEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/two-step-verification"
          element={<TwoStepVerification />}
        />
        <Route path="/two-step-code" element={<TwoStepCode />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/verify-user" element={<VerifyUser />} />
      </Routes>
    </div>
  );
};

export default AuthRoutes;
