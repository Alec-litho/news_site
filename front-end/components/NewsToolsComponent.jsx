import { useDispatch } from "react-redux";
import {setSearchInfo} from "../features/searchSlice";
import {update} from '../helperFunctions/updateAfterSelecting';
import Relevancy from '../public/svg_icons/home/Relevancy';
import Popular from '../public/svg_icons/home/Popular';
import Newest from '../public/svg_icons/home/Newest';


export default function NewsToolsComponent(props) { 
    const dispatch = useDispatch()

    function hoverOption(e) {
        console.log(e.target.classList[0]);
        if(e.target.classList[0] === "category-option") e.target.classList.add("active")
    }
    return (
        <div className="category mt-3 bg-white">
            <div className="category-option" onMouseEnter={e => hoverOption(e)}>
                <div className="bg-circle-icon">
                    <Relevancy className="icon_A"/>
                </div>
                <a className="chooseBTN" onClick={e => {dispatch(setSearchInfo({topic:props.topic, sortBy:'relevancy', articlesAmount:0, news:[]}));update(e)}}>relevancy</a>
            </div>
            <div className="category-option">
                <div className="bg-circle-icon">
                    <Popular className="icon_A"/>
                </div>
                <a className="chooseBTN" onClick={e => {dispatch(setSearchInfo({topic:props.topic, sortBy:'popularity', articlesAmount:0, news:[]}));update(e)}}>popularity</a>
            </div>
            <div className="category-option">
                <div className="bg-circle-icon">
                    <Newest className="icon_A"/>
                </div>
                <a className="chooseBTN" onClick={e => {dispatch(setSearchInfo({topic:props.topic, sortBy:'publishedAt', articlesAmount:0, news:[]}));update(e)}}>publishedAt</a>
            </div>
        </div>
    )
}
