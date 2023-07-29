'use client';
import NewsArticleComponent from './NewsArticleComponent'
import { useAppDispatch, useAppSelector } from '../hooks/reduxCustomHooks';
import { setSearchInfo, resetNews } from '../features/searchSlice';
import useGetNews from '../hooks/useGetNews';
import { useState, useEffect, useRef } from 'react';


export default function NewsFeedComponent() {
    const newsInfo:ISearch = useAppSelector(state => state.search)
    const [update, setUpdate] = useState<Boolean>(false)
    const dispatch = useAppDispatch()
    const getNews = useGetNews() /*getNews(set update function if needed)*/

    function getNewsOnScroll() {//load more news when user gets to the bottom of the page
        // if(window.innerHeight + window.pageYOffset >= (document.body.offsetHeight-1)) getNews()
        console.log(window.innerHeight + window.scrollY, document.body.offsetHeight-1);
        
    }
    useEffect(() => {
        console.log('w');
        
        if(newsInfo.news.length >= 100) dispatch(resetNews())
        window.addEventListener("scroll", getNewsOnScroll)
        getNews()
        return () => window.removeEventListener("scroll", getNewsOnScroll)
    }, [])
  

    return (
        <div>
            {newsInfo.news.map((article, id )=> {
                return <NewsArticleComponent key={id} topic={newsInfo.topic} title={article.title} content={article.content} image={article.urlToImage} url={article.url} pubDate={article.publishedAt}/>
            })}
        </div>
    )
}