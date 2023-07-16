

interface UserType  {
    _id: string
    email: string,
    fullName: string,
    password: string,
    avatarUrl: string,
    friends: number,
    location: string,
    age: number|string,
}

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