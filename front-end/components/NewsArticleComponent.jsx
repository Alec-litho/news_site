import saveToBuffer from '../helperFunctions/saveToBuffer'
import Link from 'next/link';
import {Container} from "react-bootstrap"
import saveToReadLater from '../helperFunctions/saveToReadLater';

export default function NewsArticleComponent(props) {
    let { url, content } = props
    let post = { "contentArticle": content, "titleArticle": props.title, "image": props.image, "url": url }
    return (
        <div className="newsBlock rounded mb-5">
            <img className="rounded w-100" src={props.image === null? /*require('../../assets/images/defaultIMG.jpg')*/null : props.image} ></img>
            <Container className="mt-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <div className="categoryTag">{props.category}</div>
                        <p className="h6 date">{props.pubDate}</p>
                    </div>
                </div>
                <div className="preview d-flex pb-3 justify-content-between">
                    <Link className="newsBlockLink" href="/read_post" onClick={_ => saveToBuffer(post)}>{props.title}</Link>
                    <button className="saveToPocket" onClick={_ => saveToReadLater(post)}>Read later</button>
                </div>
            </Container>
        </div>
    )
}
