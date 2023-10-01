import { ORDERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: ORDERS_URL,
        body: {...data},
        method: "POST",
      }),
    }),
    getMyorders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myOrders`,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApiSlice