'use client'
import { update } from "../helperFunctions/updateAfterSelecting"
import { useDispatch } from "react-redux"
import { setSearchInfo } from "../features/searchSlice"
import axios from "axios"

export default function TopicsToolComponent() {
    let dispatch = useDispatch()
    let topics = []
    // axios.get('http://localhost:3001/getHistory').then(res => topics = res)
    return (
        <div>
            <div className="category mt-5 py-3 px-2">
                {topics.map((topic, id) => {
                    return <button className="chooseBTN" key={id} onClick={e => {
                        dispatch(setSearchInfo({topic, sortBy:'publishedAt', articlesAmount:0}))
                        update()
                    }}>{topic}</button>
                })}
            </div>
        </div>
    )
}