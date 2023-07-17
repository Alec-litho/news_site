import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'


const initialState: ISearch = {
    status: "unknown",
    news: [],
    articlesAmount: 1,//1 equals 8 news items so 12*8 = max news items
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
        console.log(action.payload);
        
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
    async function(data:InewsParameters) {
        let result = await axios.post<newsItem[]>("http://localhost:3001/getNews", {topic: data.topic, sortBy: data.sortBy, amount: data.amount})
        console.log(result);//result is not coming
        return JSON.stringify(result.data)
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