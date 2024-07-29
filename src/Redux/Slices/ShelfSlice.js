import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import toast from "react-hot-toast";

const initialState ={
    shelflist: []
};



export const getallbookshelfs = createAsyncThunk("course/getallbookshelfs" , async () =>{

    try{
   const response =  axiosInstance.get("bookshelves", {headers : {

         'x-access-token' : localStorage.getItem("token")
   }});
   toast.promise(response, {
    loading : 'Loading booksshelfs',
    success : 'Succesfully Loaded bookshelfs!',
    error : 'Something wrong while fetching bookshlefs'
});

  return await response ;
    }catch(error){
        console.log(error);
         toast.error('Something wrong while fetching bookshlefs');

    }
});

// shelf

export const addbooktoshelfs = createAsyncThunk("course/addbooktoshelf" , async (data) =>{

    try{
   const response =  axiosInstance.patch(`/bookshelves/${data.shelfName}/add/${data.bookId}`,{}, {headers : {

         'x-access-token' : localStorage.getItem("token")
   }});
   toast.promise(response, {
    loading : 'adding Book to shelfs',
    success : 'Successfully added Book to shlefs! ',
    error : 'something went wrong '
});
  
  return await response ;
    }catch(error){
        console.log(error);
         toast.error('Something wrong while adding book to shlefs');

    }
});


// 

export const createshelf= createAsyncThunk("course/createshelf" , async (data) =>{

  try{
 const response =  axiosInstance.post(`/bookshelves`,{name : data.shelfName}, {headers : {

       'x-access-token' : localStorage.getItem("token")
 }});
 toast.promise(response, {
  loading : 'Creating shelfs',
  success : 'created shlefs! ',
  error : 'something went wrong '
});

return await response ;
  }catch(error){
      console.log(error);
       toast.error('Something wrong while creating shlefs');

  }
});

// 

const shelfSlice = createSlice({

    name : 'shelf',
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
           builder.addCase(getallbookshelfs.fulfilled, (state,action) =>{
                 if(action?.payload?.data?.data){
                    state.shelflist = action?.payload?.data?.data;
                 }
           }).addCase(addbooktoshelfs.fulfilled, (state,action) =>{
             console.log(action);
           });
    }
});

export default shelfSlice.reducer;