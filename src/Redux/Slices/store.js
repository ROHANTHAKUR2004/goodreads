import { configureStore } from "@reduxjs/toolkit";

import AuthSliceReducer from "./AuthSlice";



 export default configureStore({
    reducer: {
        auth : AuthSliceReducer
    },
    devTools: true,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false})

});
