import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'


const initialState:Iauth = {
    _id: null,
    fullName: null,
    location: "not mentioned",
    age: "not mentioned",
    avatarUrl: "https://i.ibb.co/Bqm8N2r/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
}


export const fetchData = createAsyncThunk('auth/fetchAuth', async(params) => {
    const {data} = await axios.post('/login', params)
    return data
})

const authSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
       
    },
})

export default authSlice.reducer 
// export const { = authSlice.actions

