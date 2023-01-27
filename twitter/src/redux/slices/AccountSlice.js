import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getAccounts = createAsyncThunk('api/getaccounts',async () => {
    return await fetch("http://localhost:8000/api/getusers/").then(res => res.json());
})



const  AccountSlice = createSlice({
    name:'getAccount',
    initialState:{
        Accounts:[],
        loading:false
    },
    extraReducers : {
        [getAccounts.pending]:(state)=>{
            state.loading = true;
        },
        [getAccounts.fulfilled]:(state,action) => {
            state.loading = false;
            state.Accounts = action.payload;

        },
        [getAccounts.rejected]:(state)=>{
            state.loading = false;

        }


    }
    
})
export default AccountSlice.reducer;