import { useDispatch } from "react-redux"
import {setSearchInfo} from "../features/searchSlice"
import {update} from '../helperFunctions/updateAfterSelecting'

export default function NewsToolsComponent(props) {
    const dispatch = useDispatch()

    return (
        <div className="category mt-3 bg-white px-3 py-1">
           <button className="chooseBTN" onClick={e => {
            dispatch(setSearchInfo({topic:props.topic, sortBy:'relevancy', articlesAmount:0, news:[]}))
            update(e)
            }}>relevancy</button>
           <button className="chooseBTN" onClick={e => {
            dispatch(setSearchInfo({topic:props.topic, sortBy:'popularity', articlesAmount:0, news:[]}))
            update(e)    
            }}>popularity</button>
           <button className="chooseBTN" onClick={e => {
            dispatch(setSearchInfo({topic:props.topic, sortBy:'publishedAt', articlesAmount:0, news:[]}))
            update(e)
            }}>publishedAt</button>
        </div>
    )
}
