"use client"
import axios from 'axios'
import {setNews} from "../features/searchSlice"
import { fetchNews } from '../features/searchSlice';
import { useAppDispatch, useAppSelector } from './reduxCustomHooks';

export default function useGetNews():()=> void {
    const dispatch = useAppDispatch()
    let newsInfo:ISearch = useAppSelector(state => state.search)
    console.log(newsInfo);
    
    let newValForArticles:number = newsInfo.articlesAmount
    return function() {
        // const newsParameters:InewsParameters = {topic: newsInfo.topic, sortBy:newsInfo.sortBy, amount: newValForArticles*8}
        // newValForArticles = newsInfo.articlesAmount >= 12 || newsInfo.articlesAmount === 1?  1 : newValForArticles+1
        // dispatch(fetchNews(newsParameters)).then(res => JSON.parse(res.payload)).then((result:newsItem[]) => {
        //     console.log(result);
            
        //     let index: number = newValForArticles === 1? 0 : (newValForArticles-1)*8
        //     let res: newsItem[] = result.slice(index, result.length-1)
        //     dispatch(setNews({articlesAmount:newValForArticles,news:[...res] }))
        // }).catch(err => console.log(err)
        // )
    }
}