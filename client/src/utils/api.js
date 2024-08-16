import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from "socket.io-client";

export const baseUrl = import.meta.env.PROD
  ? "https://crypto-vest-3173718ad5ad.herokuapp.com/api"
  : "http://localhost:5050/api";

// export const baseUrl = "http://localhost:5050/api";
//

export const api = createApi({
  reducerPath: "apis",
  tagTypes: ["user", "vault", "order", "user_order"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

const serverUrl = import.meta.env.PROD
  ? "https://crypto-vest-3173718ad5ad.herokuapp.com"
  : "http://localhost:5050";

// const serverUrl = "https://qasimcrypto.herokuapp.com";

// export const socket = io.connect(serverUrl);
export const socket = io.connect(serverUrl, { transports: ["websocket"] });
