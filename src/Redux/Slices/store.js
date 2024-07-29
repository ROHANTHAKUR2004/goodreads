import { configureStore } from "@reduxjs/toolkit";

import AuthSliceReducer from "./AuthSlice";
import BookSliceReducer from "./BookSlice";
import ShelfSliceReducer from "./ShelfSlice";



 export default configureStore({
    reducer: {
        auth : AuthSliceReducer,
        book : BookSliceReducer,
        shelf : ShelfSliceReducer
    },
    devTools: true,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false})

});
