import axios from "axios"
import express from "express"

const getSportNews = (req: express.Request,res: express.Response):void => {
    axios.get('https://api.football-data.org/v4/matches', {
            headers:{
            'Content-Type': 'application/json',
            'X-Auth-Token':'290e85a1397f4b72a6fd682347f9f061'
    }}).then(response => {
        res.send(response.data.matches)
    })
}


export {
    getSportNews
}