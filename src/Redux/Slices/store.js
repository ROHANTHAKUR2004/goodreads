import { configureStore } from "@reduxjs/toolkit";

import AuthSliceReducer from "./AuthSlice";
import BookSliceReducer from "./BookSlice";



 export default configureStore({
    reducer: {
        auth : AuthSliceReducer,
        book : BookSliceReducer
    },
    devTools: true,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false})

});
