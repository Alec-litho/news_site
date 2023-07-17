import axios from "axios";
import express from "express"

async function getNews(req: express.Request, res:express.Response) {
    const {topic, sortBy, amount } = req.body;

    let response = await axios.get(`https://newsapi.org/v2/everything?q=${topic}&sortBy=${sortBy}&pageSize=${amount}&apiKey=7c413b70726b4a3fa0035b3c3e582014`);

    res.json([...response.data.articles])
}


export {
    getNews,
    
}