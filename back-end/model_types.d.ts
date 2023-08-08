

interface UserType  {
    _id: string
    email: string,
    fullName: string,
    password: string,
    avatarUrl: string,
    friends: number, 
    location: string,
    age: number|string,
    googleId: string
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
type googleData = {
    sub: string
    name: string
    given_name: string
    family_name: string
    picture: string
    locale: string
}