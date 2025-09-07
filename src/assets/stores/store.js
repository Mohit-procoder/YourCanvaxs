import { configureStore } from "@reduxjs/toolkit";
import pencilSlice from "./pencilSlice";
import shapesSlice from "./shapesSlice";
import eraseSlice from "./eraseSlice";

export const store = configureStore({
    reducer: {
        pencil:pencilSlice,
        shapes: shapesSlice,
        eraser: eraseSlice,
    },
})