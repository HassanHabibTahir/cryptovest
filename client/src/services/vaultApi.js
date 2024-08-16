import { api } from "../utils";

// Define a service using a base URL and expected endpoints

const vaultApis = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    genrateEthVault: builder.mutation({
      query: (vaultName) => ({
        url: "/vault/ethwalletgenrator",
        method: "POST",
        body: vaultName,
      }),
    }),
    genrateBtcVault: builder.mutation({
      query: (vaultName) => ({
        url: "/vault/btcwalletgenrator",
        method: "POST",
        body: vaultName,
      }),
    }),
    genrateSolVault: builder.mutation({
      query: (vaultName) => ({
        url: "/vault/solwalletgenrator",
        method: "POST",
        body: vaultName,
      }),
    }),
    depositEth: builder.mutation({
      query: () => ({
        url: "/deposit/Eth",
        method: "get",
      }),
    }),
    withdrawEth: builder.mutation({
      query: (data) => ({
        url: "/withdraw/Eth",
        method: "post",
        body: data,
      }),
    }),
    withdrawEthUsdt: builder.mutation({
      query: (data) => ({
        url: "/withdraw/eth-usdt",
        method: "post",
        body: data,
      }),
    }),
    withdrawSolUsdt: builder.mutation({
      query: (data) => ({
        url: "/withdraw/sol-usdt",
        method: "post",
        body: data,
      }),
    }),
    depositBTC: builder.mutation({
      query: () => ({
        url: "/deposit/BTC",
        method: "get",
      }),
    }),
    withdrawBTC: builder.mutation({
      query: (data) => ({
        url: "/withdraw/BTC",
        method: "post",
        body: data,
      }),
    }),
    depositSOL: builder.mutation({
      query: () => ({
        url: "/deposit/SOL",
        method: "get",
      }),
    }),
    withdrawSOL: builder.mutation({
      query: (data) => ({
        url: "/withdraw/SOL",
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const {
  useGenrateBtcVaultMutation,
  useGenrateEthVaultMutation,
  useGenrateSolVaultMutation,
  useWithdrawEthMutation,
  useWithdrawEthUsdtMutation,
  useDepositEthMutation,
  useDepositBTCMutation,
  useWithdrawBTCMutation,
  useWithdrawSOLMutation,
  useDepositSOLMutation,
  useWithdrawSolUsdtMutation,
} = vaultApis;
