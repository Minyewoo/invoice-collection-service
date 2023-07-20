/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    photos: [],
    qrText: null,
    qrResult: null,
};

const dataSlice = createSlice({
    name: 'dataSlice',
    initialState,
    reducers: {
        setQrText(state, action) {
            state.qrText = action.payload;
        },
        setQrResult(state, action) {
            state.qrResult = action.payload;
        },
        pushPhoto(state, action) {
            state.photos.push(action.payload);
        },
        removePhoto(state, action) {
            state.photos.splice(action.payload, 1);
        },
        clearData: () => initialState,
    },
});

export const { setQrText, setQrResult, pushPhoto, removePhoto, clearData } =
    dataSlice.actions;
export default dataSlice.reducer;
