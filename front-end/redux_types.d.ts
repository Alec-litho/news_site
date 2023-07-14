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
type setNewsVal = {
    articlesAmount: number;
    news: [];
}
type setSearchInfo = {
    topic:  string;
    sortBy: string;
}
interface IsearchInfo {
    status: string;
    news: Array<newsItem>;
    articlesAmount: number;
    topic: string;
    sortBy: string;
}


interface Iauth {
    _id: string|null;
    fullName: string|null;
    location: string;
    age: string|number;
    avatarUrl: string;
}