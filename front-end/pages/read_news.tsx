import {Container} from "react-bootstrap"
import {useState, useEffect} from 'react';
import axios from "axios";
export default function ReadNews() {
    let [data, setData] = useState({title: '', image_url: '', content: ''})

    console.log(data);
    useEffect(() => {
        axios.get("https://api.jsonbin.io/v3/b/6429b837ebd26539d0a31912", {
            headers: {
                "X-Master-Key":"$2b$10$y3p8j1CGw2n5ZUmWh4kE9OW8R.RqoGXrYo7Q7tlS2mAPj5SKqu.o2"
            }
        }).then(res => {setData(res.data.record.currentArticleData); console.log(res);return res}).then(res => {
            axios.get(`https://extractorapi.com/api/v1/extractor?apikey=52ae147797e99f768a904dd1c1f01242a6b68710&url=${res.data.record.currentArticleData.url}`).then(txt => {
                let text = txt.data.text
                setData(data => ({...data, text}))
            })
        })
    }, [])

    return (
        <>
            <Container className="bg-white d-grid background-color-white mt-5">
               {/* <h1 className="my-5">{data.titleArticle}</h1>
               <div className='d-flex w-100 justify-content-center'><img className='w-75 align-self-center mb-4' src={data.image}></img></div>
               <h2 className="mb-4">{data.contentArticle}</h2>
               <h4 style={{"text-align":"justify"}}>{data.text}</h4> */}
            </Container>
        </>
    )
}