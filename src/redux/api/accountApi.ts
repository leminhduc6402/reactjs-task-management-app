import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAccount, IBackendRes } from "../../types/backend";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  tagTypes: ["Accounts"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "auth/login",
        method: "POST",
        body: userData,
      }),
      transformResponse: (res: IBackendRes<IAccount>) => {
        return res;
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
});
export const { useLoginMutation, useLogoutMutation } = accountApi;
