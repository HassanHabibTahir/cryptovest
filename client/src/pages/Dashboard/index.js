/* eslint-disable function-paren-newline */
import { lazy } from "react";

const DashboardEarn = lazy(() => import("./DashboardEarn"));
const DashboardHome = lazy(() => import("./DashboardHome"));
const DashboardPay = lazy(() => import("./DashboardPay"));
const DashboardWeb3 = lazy(() => import("./DashboardWeb3"));
const DashboardMyAssets = lazy(() => import("./DashboardMyAssets"));
const SetupVaultName = lazy(() => import("./SetupVaultName"));
const DashboardOrderbook = lazy(() => import("./DashboardOrderbook"));
const AddSecondaryEmail = lazy(() => import("./AddSecondaryEmail"));
const QRgenerator = lazy(() => import("./QRgenerator"));
// eslint-disable-next-line import/no-cycle
const VaultCreationCompleted = lazy(() => import("./VaultCreationCompleted"));
const DashboardTradeManagement = lazy(() =>
  // eslint-disable-next-line implicit-arrow-linebreak
  import("./DashboardTradeManagement")
);
// eslint-disable-next-line import/no-cycle
const Trade = lazy(() => import("./Trade"));
const TokenPrice = lazy(() => import("./TokenPrice"));
const ConfirmSecondryEmail = lazy(() => import("./ConfirmSecondryEmail"));

export {
  DashboardEarn,
  DashboardHome,
  DashboardPay,
  DashboardWeb3,
  DashboardMyAssets,
  DashboardTradeManagement,
  Trade,
  TokenPrice,
  SetupVaultName,
  DashboardOrderbook,
  AddSecondaryEmail,
  ConfirmSecondryEmail,
  QRgenerator,
  VaultCreationCompleted,
};
