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
    description: "...",
    backgroundImg: "https://i.ibb.co/wrvWWtb/depositphotos-121012076-stock-illustration-blank-photo-icon.webp",
    avatarUrl: "https://i.ibb.co/Bqm8N2r/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
}


export const loginUser = createAsyncThunk('auth/loginUserAuth', async(params:ILogin) => {
    const data = await axios.post('http://localhost:3001/login', params)
    const result:Iauth = {...data.data._doc, token: data.data.token}
    return result
})
export const getUser = createAsyncThunk("auth/getUserAuth", async({_id, token}:{_id:string,token:string}) => {
    console.log(_id);
    const data = await axios.post('http://localhost:3001/getUser', {"_id": _id.split(' ').join('')}, {//because _id somehow always has spacing
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        
    })
    if(data.status === 404) return undefined;
    const result:Iauth = {...data.data}
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
           .addCase(loginUser["fulfilled"], (state, action) => {
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
           .addCase(loginUser["rejected"], (state, action) => {
            state.status = "rejected"
           })
           .addCase(getUser["fulfilled"], (state, action) => {//сделать рефакторинг чтобы не повторяться
            if(action.payload===undefined) return action.payload;
            state.logedIn = true;
            state._id = action.payload._id;
            state.fullName = action.payload.fullName;
            state.location = action.payload.location;
            state.age = action.payload.age;
            state.avatarUrl = action.payload.avatarUrl;
            state.status = "fulfilled";
            state.token = action.payload.token;
           })
    }
});

export default authSlice.reducer 
export const {setLogedIn} = authSlice.actions

