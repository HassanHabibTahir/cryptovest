import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ResponsiveDashboard } from "../dashboard";
import {
  AddSecondaryEmail,
  ConfirmSecondryEmail,
  DashboardEarn,
  DashboardHome,
  DashboardMyAssets,
  DashboardOrderbook,
  DashboardPay,
  DashboardWeb3,
  QRgenerator,
  SetupVaultName,
  TokenPrice,
  Trade,
  VaultCreationCompleted,
} from "../pages/Dashboard";
import DashboardTradeManagement from "../pages/Dashboard/DashboardTradeManagement";
import {
  DashboardProfile,
  DashboardStatements,
} from "../pages/DashboardProfile";

const DashboardRoutes = () => {
  return (
    <div>
      <ResponsiveDashboard>
        <Routes>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<DashboardHome />} />
          <Route path="/home/price/:token" element={<TokenPrice />} />
          <Route path="trade" element={<Trade />} />
          <Route
            path="/trade/managment"
            element={<DashboardTradeManagement />}
          />
          <Route path="trade/:pair" element={<DashboardOrderbook />} />
          <Route path="my-assets" element={<DashboardMyAssets />} />
          <Route path="pay" element={<DashboardPay />} />
          <Route path="earn" element={<DashboardEarn />} />
          <Route path="web3" element={<DashboardWeb3 />} />
          <Route path="/vault-name-setup/:vault" element={<SetupVaultName />} />
          <Route path="/add-secondry-email/" element={<AddSecondaryEmail />} />
          <Route path="/qr-regenerator" element={<QRgenerator />} />
          <Route path="/profile" element={<DashboardProfile />} />
          <Route path="/statements" element={<DashboardStatements />} />
          <Route
            path="/confirm-secondry-email/"
            element={<ConfirmSecondryEmail />}
          />
          <Route
            path="vault-creation-complete/:vault/:vaultName"
            element={<VaultCreationCompleted />}
          />
        </Routes>
      </ResponsiveDashboard>
    </div>
  );
};

export default DashboardRoutes;
