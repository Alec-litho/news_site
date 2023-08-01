'use client';
import NewsArticleComponent from './NewsArticleComponent'
import { useAppDispatch, useAppSelector } from '../hooks/reduxCustomHooks';
import { setSearchInfo, resetNews } from '../features/searchSlice';
import useGetNews from '../hooks/useGetNews';
import { useState, useEffect, useRef } from 'react';
const data = [
    {title: "dsmlwdko", content:"dwijwijdiwj", urlToImage:"https://i.ibb.co/YWf9P5K/m-MF3k-ROW3-I4.jpg",url:"dsjwqihrwd",publishedAt:"22-19-20017"},
    {title: "ww", content:"ss", urlToImage:"https://i.ibb.co/YWf9P5K/m-MF3k-ROW3-I4.jpg",url:"dsjwqihrwd",publishedAt:"22-09-2017"},
    {title: "Александр Пушной & The Band - Все идет по плану", content:"Даже через экран, орал вместе с залом) (И да, жалко, что у разных поколений, разный Егор, слава богу, что один Виктор)", urlToImage:"https://i.ibb.co/YWf9P5K/m-MF3k-ROW3-I4.jpg",url:"dsjwqihrwd",publishedAt:"22-19-20017"},
]

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
            { data.map((article, id )=> {
                return <NewsArticleComponent key={id} topic={newsInfo.topic} title={article.title} content={article.content} image={article.urlToImage} url={article.url} pubDate={article.publishedAt}/>
            })}
        </div>
    )
}