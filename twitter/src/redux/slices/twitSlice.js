import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getTwits = createAsyncThunk('api/gettwits',async () => {
    return await fetch("http://localhost:8000/api/gettwits/").then(res => res.json());
})



const  twitSlice = createSlice({
    name:'getTwits',
    initialState:{
        twits:[],
        loading:false
    },
    extraReducers : {
        [getTwits.pending]:(state)=>{
            state.loading = true;
        },
        [getTwits.fulfilled]:(state,action) => {
            state.loading = false;
            state.twits = action.payload;

        },
        [getTwits.rejected]:(state)=>{
            state.loading = false;

        }


    }
    
})
export default twitSlice.reducer;