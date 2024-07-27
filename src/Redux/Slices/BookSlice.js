import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import toast from "react-hot-toast";



const initialState = {
    booklist :[]
};


export const getallbooks = createAsyncThunk("course/getallbooks", async (data)=>{


    try {
        const response =  axiosInstance.get("books");
        toast.promise(response, {
            loading : 'Loading books',
            success : 'Succesfully Loaded!',
            error : 'Something wrong'
        });

        return await response;
    } catch (error) {
        console.log(error);
        toast.error("SOmething went wrong!! Cant download books");
    }
});




const bookslice = createSlice({
    name : 'book',
    initialState,
    reducers :{},
    extraReducers : (builder)=>{
        builder.addCase(getallbooks.fulfilled, (state, action)=>{
            if(action?.payload?.data?.data){
                state.booklist = action?.payload?.data?.data ; 
            }
        });

    }
});
export default bookslice.reducer;
