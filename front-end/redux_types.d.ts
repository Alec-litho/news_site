type newsItem = {
    source: object;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
type InewsParameters = {
    topic: string;
    sortBy: string;
    amount: number;
}
type setNewsVal = {
    articlesAmount: number;
    news: newsItem[];
}
type setSearchInfo = {
    topic:  string;
    sortBy: string;
}
interface ISearch {
    status: string;
    news: newsItem[];
    articlesAmount: number;
    topic: string;
    sortBy: string;
}


interface Iauth {
    auth: boolean
    status: string;
    token: string;
    _id: string|null;
    fullName: string|null;
    location: string;
    age: string|number;
    avatarUrl: string;
}
interface ILogin {
    email: string 
    password: string
}

interface IUser  {
    _id: string
    email: string,
    fullName: string,
    password: string,
    avatarUrl: string,
    friends: number,
    location: string,
    age: number|string,
}
