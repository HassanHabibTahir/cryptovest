import { api } from "../utils";

// Define a service using a base URL and expected endpoints

const orderApis = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getUserOrdersCompleted: builder.mutation({
      query: ({ network }) => ({
        url: "/order/getUserOrdersCompleted",
        method: "POST",
        body: { network },
      }),
      invalidatesTags: ["user"],
    }),
    getUserOrdersPending: builder.mutation({
      query: () => ({
        url: "/order/getUserOrdersPending",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserOrdersCompletedMutation,
  useGetUserOrdersPendingMutation,
} = orderApis;
