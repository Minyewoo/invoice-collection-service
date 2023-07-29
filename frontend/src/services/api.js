import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL;

const buildFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    return formData;
};

const buildInvoiceFormData = ({ qrraw, content, photos }) => {
    const formData = new FormData();
    formData.append('qrraw', qrraw);
    formData.append('content', JSON.stringify(content));
    photos.forEach((photo, idx) => {
        formData.append('photos', photo, `invoice-${idx}.png`);
    });
    return formData;
};

// TODO: add error handling
// prettier-ignore
const customBaseQuery = (...baseArgs) => async (args, api, extraOptions) => {
    const result = await fetchBaseQuery(...baseArgs)(
        args,
        api,
        extraOptions,
    );
    if (
        args.url === import.meta.env.VITE_GET_INVOICE_DATA_URL
        && result.data?.code !== 1
    ) {
        return { error: result.data?.data };
    }
    return result;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: customBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getInvoiceData: builder.query({
            query: ({ qrraw }) => ({
                url: import.meta.env.VITE_GET_INVOICE_DATA_URL,
                method: 'POST',
                body: buildFormData({
                    token: import.meta.env.VITE_GET_INVOICE_DATA_TOKEN,
                    qrraw,
                }),
            }),
            keepUnusedDataFor: 120,
        }),
        uploadInvoice: builder.mutation({
            query: ({ formData }) => ({
                url: '/invoice',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export { buildInvoiceFormData };
export const { useGetInvoiceDataQuery, useUploadInvoiceMutation } = api;
