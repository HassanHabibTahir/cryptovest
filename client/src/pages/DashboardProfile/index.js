/* eslint-disable function-paren-newline */
import { lazy } from "react";

import { timeZone } from "./TimeZone";
import { currency } from "./Currency";

// eslint-disable-next-line import/no-cycle
const DashboardProfile = lazy(() => import("./DashboardProfile"));
const DashboardStatements = lazy(() => import("./DashboardStatements"));
// eslint-disable-next-line import/no-cycle

export { DashboardProfile, DashboardStatements, timeZone, currency };
