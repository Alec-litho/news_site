import axios from 'axios'

export default function saveToBuffer(bufferData:string) {
    axios.put('https://api.jsonbin.io/v3/b/6429b837ebd26539d0a31912',  `{"currentArticleData": ${JSON.stringify(bufferData)}}`, {
        headers: {
            "Content-Type":"application/json",
            "X-Master-Key":"$2b$10$y3p8j1CGw2n5ZUmWh4kE9OW8R.RqoGXrYo7Q7tlS2mAPj5SKqu.o2"
        }
    }).then(res => console.log(res)).catch(err => console.log(err))
}