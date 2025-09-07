import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:'eraser',
    initialState:{
        eraserSize: 15,
        isErasing: false,
        selection:false,
    },
    reducers: {
        setEraserSize: (state, action) => {
            state.eraserSize = action.payload;
        },
        setIsErasing: (state, action) => {
            state.isErasing = action.payload;
        },
        setSelection:(state , action)=>{
            state.selection = action.payload
        }
    },
})

export const { setEraserSize, setIsErasing , setSelection} = slice.actions;
export default slice.reducer;