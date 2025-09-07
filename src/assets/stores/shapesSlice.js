import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:'shapes',
    initialState: {
        shapeType: 'line',
        shapeColor: '#000000',
        isShaping: 0,
        shapeSize:15
    },
    reducers: {
        setShapeType: (state, action) => {
            state.shapeType = action.payload;
        },
        setShapeColor: (state, action) => {
            state.shapeColor= action.payload;
        },
        setisShaping: (state, action) => {
            state.isShaping = action.payload;
        },
        setShapesize: (state , action) =>{
            state.shapeSize = action.payload
        }
    },
})

export const { setShapeType, setShapeColor, setisShaping , setShapesize} = slice.actions;
export default slice.reducer;