/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    photos: [],
    photoTaken: null,
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
        setPhotoTaken(state, action) {
            state.photoTaken = action.payload;
        },
        clearData: () => initialState,
    },
});

export const {
    setQrText,
    setQrResult,
    pushPhoto,
    removePhoto,
    clearData,
    setPhotoTaken,
} = dataSlice.actions;
export default dataSlice.reducer;
