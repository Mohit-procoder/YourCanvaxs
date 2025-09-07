import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:'pencil',
    initialState: {
        pencilColor: '#000000',
        pencilSize: 15,
        isDrawing: true,
    },
    reducers: {
        setPencilColor: (state, action) => {
            state.pencilColor = action.payload;
        },
        setPencilSize: (state, action) => {
            state.pencilSize = action.payload;
        },
        setIsDrawing: (state, action) => {
            state.isDrawing = action.payload;
        },
    },
})

export const { setPencilColor, setPencilSize, setIsDrawing } = slice.actions;   
export default slice.reducer;