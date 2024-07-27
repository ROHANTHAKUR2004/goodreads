import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "Configs/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    isloggedin : localStorage.getItem('isloggedin') || false,
    username : localStorage.getItem('username') ||  '',
    token :  localStorage.getItem('token')  ||  '' 

};


// 

export const signup = createAsyncThunk('auth/signup', async (data) =>{
      try {
        const response = axiosInstance.post("signup", data);
        toast.promise(response, {
            loading : 'Submitting form',
            success : 'Succesfully signed Up!',
            error : 'Something went wrong'
        });

        return await response; 

      } catch (error) {
          toast.error("Cannot signup! Something went wrong");
      }
});

// 

export const signin = createAsyncThunk('auth/signin', async (data) =>{
    try {
      const response = axiosInstance.post("signin", data);
      toast.promise(response, {
          loading : 'Submitting form',
          success : 'Succesfully signed In!',
          error : 'Something went wrong'
      });

      return await response; 

    } catch (error) {
        
        if(error?.response?.data?.err){
            toast.error(error?.response?.data?.err);

        }else {
        toast.error("Cannot signin! Something went wrong");
        }
    }
});

const authSlice = createSlice({
    name : 'auth',
    initialState ,
    reducers : {
            logout : (state) => {
                state.isloggedin = false;
                state.username = '';
                state.token = '';
                localStorage.clear();
            }
    },
    extraReducers : (builder) => {
        builder.addCase(signin.fulfilled , (state,action) =>{
            if(action?.payload?.data){
                state.isloggedin = (action?.payload?.data?.data != undefined);
                state.username = action?.payload?.data?.data?.username;
                state.token = action?.payload?.data?.data?.token;
                localStorage.setItem("isloggedin", (action?.payload?.data?.data != undefined));
                localStorage.setItem("username", action?.payload?.data?.data?.username);
                localStorage.setItem("token", action?.payload?.data?.data?.token);
            }  
        });
    }
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;

