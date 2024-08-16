import { api } from "../utils";

// Define a service using a base URL and expected endpoints
const authApis = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ firstName, lastName, email, password }) => ({
        url: "/auth/register",
        method: "POST",
        body: { firstName, lastName, email, password },
      }),
    }),

    sendSmsCode: builder.mutation({
      query: ({ number }) => ({
        url: "/auth/sendSmsCode",
        method: "POST",
        body: { number },
      }),
    }),
    verifySmsCode: builder.mutation({
      query: ({ number, result }) => ({
        url: "/auth/verifySmsCode",
        method: "POST",
        body: { code: result, number },
      }),
    }),

    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    verifySecondaryEmail: builder.mutation({
      query: (email) => ({
        url: "/auth/secondaryEmailRegister",
        method: "POST",
        body: { secondaryEmail: email },
      }),
    }),

    getUser: builder.mutation({
      query: () => ({
        url: "/user/",
        method: "GET",
      }),
    }),
    sendMailConfirmation: builder.mutation({
      query: () => ({
        url: "/auth/sendMail",
        method: "POST",
        body: {},
      }),
    }),
    resetPass: builder.mutation({
      query: (email) => ({
        url: `/auth/forgotPassword/${email}`,
        method: "GET",
      }),
    }),
    changePass: builder.mutation({
      query: ({ token, password }) => ({
        url: "/auth/changepassword",
        method: "POST",
        body: { token, password },
      }),
    }),
    verifyEmailForWithDraw: builder.mutation({
      query: () => ({
        url: "/auth/verifyEmailForWithdraw",
        method: "get",
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useResetPassMutation,
  useLoginUserMutation,
  useSendMailConfirmationMutation,
  useVerifySecondaryEmailMutation,
  useVerifySmsCodeMutation,
  // useGetUserQuery,
  useGetUserMutation,
  usePrefetch,
  useChangePassMutation,
  useSendSmsCodeMutation,
  useVerifyEmailForWithDrawMutation,
  useVerifyOtpMutation,
} = authApis;
