import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = '';

const getFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    return formData;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getInvoiceData: builder.query({
            query: ({ qrraw }) => ({
                url: import.meta.env.VITE_GET_INVOICE_DATA_URL,
                method: 'POST',
                body: getFormData({
                    token: import.meta.env.VITE_GET_INVOICE_DATA_TOKEN,
                    qrraw,
                }),
            }),
            keepUnusedDataFor: 120,
        }),
    }),
});

export const { useGetInvoiceDataQuery } = api;
