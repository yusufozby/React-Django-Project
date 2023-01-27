import { createAsyncThunk } from "@reduxjs/toolkit";


export const getUsers = createAsyncThunk("/users/getusers",async () => {
    return fetch("http://localhost:8000/api/getusers/").then(res => res.json());
});

