import axios from 'axios'
import { useEffect, useState } from 'react';

export default function HeadLinesComponent() {
    let [footballNews, setFootballNews] = useState([])
    console.log(footballNews);
    useEffect(() => {
        let allMatches = []
        axios.get('http://localhost:3001/getsportnews').then(res => {
            console.log(res);
            res.data.map(match => {
                let matchBlock = { "homeTeamName": match.homeTeam.shortName, "homeTeamLogo": match.homeTeam.crest, "awayTeamName": match.awayTeam.shortName, "awayTeamLogo": match.awayTeam.crest, "scoreHomeTeam": Math.floor(Math.random() * (10 - 0 + 1) + 0), "scoreAwayTeam": Math.floor(Math.random() * (10 - 0 + 1) + 0) }
                allMatches.push(matchBlock)
            })
        }).then(_ => setFootballNews(allMatches)).catch(err => console.log(err))

    }, [])
    async function getSportNews() {
       let res = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=449afdc276d741c2a4f652246c2ec6cc`)
       console.log(res);
    }
    return (
        <div>
            <div className="footbalNews">
                <h2>Sport news</h2>
                    {footballNews.map((news, id) => {
                        return <FootballBlock key={id} homeTeamLogo={news.homeTeamLogo} homeTeamName={news.homeTeamName} scoreHomeTeam={news.scoreHomeTeam} awayTeamLogo={news.awayTeamLogo} awayTeamName={news.awayTeamName} scoreAwayTeam={news.scoreAwayTeam}/>
                    })}
            </div>
            <div className="politics">
                <h2>Politics</h2>
                
            </div>
            <div className="politics">
                
            </div>
        </div>
    )

}


function FootballBlock(props) {
    return (
    <div className="newsBlock d-grid mb-5" >
        <div className="firstTeam d-flex align-items-center">
            <img className="w-25 p-3" src={props.homeTeamLogo}></img>
            <span>{props.homeTeamName}</span>
        </div>
        <span className="ms-3">{props.scoreAwayTeam} VS {props.scoreHomeTeam}</span>
        <div className="secondTeam d-flex align-items-center">
            <img className="w-25 p-3" src={props.awayTeamLogo}></img>
            <span>{props.awayTeamName}</span>
        </div>
    </div>
    )
}