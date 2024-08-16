import { api } from "../utils";

// Define a service using a base URL and expected endpoints

const userApis = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["user", "Vault"],
    }),
    uploadProfilePic: builder.mutation({
      query: (formData) => ({
        url: "/user/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (profileData) => ({
        url: "/user/update",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: "/user/delete",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUploadProfilePicMutation,
  useGetUserDataQuery,
} = userApis;
