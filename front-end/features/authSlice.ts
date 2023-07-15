import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'


const initialState:Iauth = {
    status: "no info",
    _id: null,
    fullName: null,
    location: "not mentioned",
    age: "not mentioned",
    avatarUrl: "https://i.ibb.co/Bqm8N2r/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
}


export const fetchData = createAsyncThunk('auth/fetchAuth', async(params:ILogin) => {
    const data:IUser = await axios.post('http://localhost:3001/login', params)
    return data
})

const authSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
           .addCase(fetchData["fulfilled"], (state, action) => {
            state._id = action.payload._id
            state.fullName = action.payload.fullName
            state.location = action.payload.location
            state.age = action.payload.age
            state.avatarUrl = action.payload.avatarUrl
            state.status = "fulfilled"

           })
           .addCase(fetchData["rejected"], (state, action) => {
            state.status = "rejected"
           })
    }
})

export default authSlice.reducer 
// export const { = authSlice.actions

