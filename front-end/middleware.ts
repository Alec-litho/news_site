import { useAppDispatch } from "./hooks/reduxCustomHooks";
import { getUser } from "./features/authSlice";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import parsedCookie from "./helperFunctions/parsedCookie";

type IParameters = {
    _id: string 
    token: string
}
export function middleware(req:NextRequest) {
    return (async() => {
    let token = req.cookies.get("token")
    let _id = req.cookies.get("_id")
    let redirectUser = false
    let parameters:IParameters=parsedCookie(req.cookies.toString());
    console.log("parammsp",parameters);
    
    if(parameters._id === null || !req.cookies.has("_id")) return NextResponse.redirect(new URL('/login', req.url));
    let data = await fetch("http://localhost:3001/getUser", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${parameters.token}`
          },
        body: JSON.stringify({"_id": parameters._id.split(' ').join('')})//because _id somehow always has spacing
    })
    let parsedData = await data.json()
    console.log("data middleware", parsedData);
    
    if(!parsedData) redirectUser = true
    return redirectUser? NextResponse.redirect(new URL('/login', req.url)) : NextResponse.next()

    })()
}

export const config = {
    matcher: '/home'
}
