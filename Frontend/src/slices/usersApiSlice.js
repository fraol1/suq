import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApislice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: USERS_URL,
                method:'POST',
                body:data,
                
            }),
            keepUnusedDataFor: 5
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method:'POST',
                body:data,
                
            }),
            keepUnusedDataFor: 5
        }),
    })
})

export const {useLoginMutation,useRegisterMutation} = usersApislice