import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'


const initialState:Iauth = {
    logedIn: false,
    status: "undefined",
    token: "undefined",
    _id: null,
    fullName: null,
    location: "not mentioned",
    age: "not mentioned",
    avatarUrl: "https://i.ibb.co/Bqm8N2r/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
}


export const fetchData = createAsyncThunk('auth/fetchAuth', async(params:ILogin) => {
    const data = await axios.post('http://localhost:3001/login', params)
    console.log('fetchdata');
    
    const result:Iauth = {...data.data._doc, token: data.data.token}
    return result
})
export const getUser = createAsyncThunk("auth/getUserAuth", async({_id, token}:{_id:string,token:string}) => {
    console.log(_id, token);
    
    const data = await axios.post('http://localhost:3001/getUser', {"_id": _id.split(' ').join('')}, {
        headers: {
            'content-type': 'text/json',
            'Authorization': `Bearer ${token}`
        }
        
    })
    console.log(token)
    const result:Iauth = {...data.data._doc}
    return result
})

const authSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setLogedIn(state,action) {
            state.logedIn = true
        }
    },
    extraReducers: (builder) => {
        builder
           .addCase(fetchData["fulfilled"], (state, action) => {
            document.cookie = `_id=${action.payload._id}; path=/`;
            document.cookie = `token=${action.payload.token}; path=/`;
            state.logedIn = true;
            state._id = action.payload._id;
            state.fullName = action.payload.fullName;
            state.location = action.payload.location;
            state.age = action.payload.age;
            state.avatarUrl = action.payload.avatarUrl;
            state.status = "fulfilled";
            state.token = action.payload.token;

           })
           .addCase(fetchData["rejected"], (state, action) => {
            state.status = "rejected"

           })
           .addCase(getUser["fulfilled"], (state, action) => {//сделать рефакторинг чтобы не повторяться
            state._id = action.payload._id
            state.fullName = action.payload.fullName
            state.location = action.payload.location
            state.age = action.payload.age
            state.avatarUrl = action.payload.avatarUrl
            state.status = "fulfilled"
            state.token = action.payload.token
           })
    }
});

export default authSlice.reducer 
export const {setLogedIn} = authSlice.actions

