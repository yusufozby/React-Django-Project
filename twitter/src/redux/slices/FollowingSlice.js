import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getFollowings = createAsyncThunk('api/getfollowings',async () => {
    return await fetch("http://localhost:8000/api/getfollowings/").then(res => res.json());
})



const  FollowingSlice = createSlice({
    name:'getfollowings',
    initialState:{
        followings:[],
        loading:false
    },
    extraReducers : {
        [getFollowings.pending]:(state)=>{
            state.loading = true;
        },
        [getFollowings.fulfilled]:(state,action) => {
            state.loading = false;
            state.followings = action.payload;

        },
        [getFollowings.rejected]:(state)=>{
            state.loading = false;

        }


    }
    
})
export default FollowingSlice.reducer;