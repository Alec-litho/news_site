import axios from "axios";
import express from "express"

async function getNews(req: express.Request, res:express.Response) {
    const {topic, sortBy, amount } = req.body;

    let response:newsItem = await axios.get(`https://newsapi.org/v2/everything?q=${topic}&sortBy=${sortBy}&pageSize=${amount}&apiKey=449afdc276d741c2a4f652246c2ec6cc`);
    return response
}


export {
    getNews
}