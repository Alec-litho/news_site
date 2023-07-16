"use client"
import axios from 'axios'
import {setNews} from "../features/searchSlice"
import { useAppDispatch, useAppSelector } from './reduxCustomHooks';

export default function useGetNews():()=> void {
    const dispatch = useAppDispatch()
    let newsInfo:ISearch = useAppSelector(state => state.search)
    console.log(newsInfo);
    
    let newValForArticles:number = newsInfo.articlesAmount
    return function() {
        newValForArticles = newsInfo.articlesAmount >= 12?  1 : newValForArticles+1
        axios.get(`https://newsapi.org/v2/everything?q=${newsInfo.topic}&sortBy=${newsInfo.sortBy}&pageSize=${newValForArticles*8}&apiKey=449afdc276d741c2a4f652246c2ec6cc`).then(result => {
            let index: number = newValForArticles === 1? 0 : (newValForArticles-1)*8
            let res: [] = result.data.articles.slice(index, result.data.articles.length)
            dispatch(setNews({articlesAmount:newValForArticles,news:[...res] }))
        })
    }
}