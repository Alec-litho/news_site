import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'


const initialState: ISearch = {
    status: "unknown",
    news: [],
    articlesAmount: 1,
    topic: 'world',
    sortBy: "popularity"
}

const searchSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
       setSearchInfo: (state, action: PayloadAction<ISearch>) => {
        const {topic,sortBy } = action.payload
        state.topic = topic || "world"
        state.sortBy = sortBy || "popularity"
       },
       setNews: (state, action: PayloadAction<setNewsVal>) => {
        const {articlesAmount, news } = action.payload
        state.news = [...state.news, ...news] 
        state.articlesAmount = articlesAmount
       },
       resetNews: (state) => {
        state.news = []
        state.articlesAmount = 1
        state.topic = "world"
        state.sortBy = "popularity"
       }
    },
})
export default searchSlice.reducer 
export const {setSearchInfo, setNews, resetNews} = searchSlice.actions




export const fetchNews = createAsyncThunk(
    'fetch/fetchNews',
    async function(data:any) {
        return await axios.get<newsItem>(`https://newsapi.org/v2/everything?q=${'nasa'}&sortBy=${'popularity'}&pageSize=${8}&apiKey=449afdc276d741c2a4f652246c2ec6cc`)
    }
)


    // extraReducers: builder => {
    //   builder
    //     .addCase(fetchNews.pending, (state, action) => {
    //         state.status = 'loading'
    //     })
    //     .addCase(fetchNews.fulfilled, (state, action) => {
    //         state.status = 'resolved'
    //         console.log(action.payload);
            
    //         // state.news = action.payload
    //     })
    // }