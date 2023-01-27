import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getLikes = createAsyncThunk('api/getlikes',async () => {
    return await fetch("http://localhost:8000/api/getlikes/").then(res => res.json());
})



const  LikeSlice = createSlice({
    name:'getlikes',
    initialState:{
        likes:[],
        loading:false
    },
    extraReducers : {
        [getLikes.pending]:(state)=>{
            state.loading = true;
        },
        [getLikes.fulfilled]:(state,action) => {
            state.loading = false;
            state.likes = action.payload;

        },
        [getLikes.rejected]:(state)=>{
            state.loading = false;

        }


    }
    
})
export default LikeSlice.reducer;