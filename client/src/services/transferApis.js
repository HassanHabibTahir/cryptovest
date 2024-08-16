import { api } from "../utils";

// Define a service using a base URL and expected endpoints

const transferApis = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    transferAmount: builder.mutation({
      query: ({ amount, email, vaultType }) => ({
        url: "/transfer/transferAmount",
        method: "POST",
        body: { amount, email, vaultType },
      }),
      invalidatesTags: ["user"],
    }),
    getCoinMarketCapData: builder.mutation({
      query: () => ({
        url: "/transfer/coinMarketCapData",
        method: "GET",
      }),
    }),
  }),
});

export const { useTransferAmountMutation, useGetCoinMarketCapDataMutation } =
  transferApis;
