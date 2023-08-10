import { useAppDispatch } from "./hooks/reduxCustomHooks";
import { getUser } from "./features/authSlice";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

type IParameters = {
    _id: string 
    token: string
}
export function middleware(req:NextRequest) {
    return (async() => {
            // const dispatch = useAppDispatch()
    let token = req.cookies.get("token")
    let _id = req.cookies.get("_id")
    let redirectUser = false
    if(!req.cookies.has("_id"))  return NextResponse.redirect(new URL('/login', req.url))

    let parameters:IParameters={_id:"null",token:"null"};
    let cookiesStr = req.cookies.toString()
    cookiesStr.split(";").forEach((str) => {
        let splitted = str.split("=")
        if(splitted[0]==="token")parameters.token = splitted[1]
        if(splitted[0]==="_id") parameters._id = splitted[1]
    })
    console.log(parameters._id);
    
    let data = await fetch("http://localhost:3001/getUser", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${parameters.token}`
          },
        body: JSON.stringify({"_id": parameters._id.split(' ').join('')})//because _id somehow always has spacing
    })
    if(data === null) redirectUser = true
    console.log(redirectUser);
    
    return redirectUser? NextResponse.redirect(new URL('/login', req.url)) : NextResponse.next()

    })()
}

export const config = {
    matcher: '/home'
}

// let dayta = await fetch("http://localhost:3001/getUser", {
//     method: "POST",
//     headers: {
//         'Content-Type': 'application/json',
//         "Authorization": `Bearer ${parameters.token}`
//       },
//     body: JSON.stringify({"_id": parameters._id.split(' ').join('')})//because _id somehow always has spacing
// })
// .then(res => res.json()).then(res => {
//     console.log(res === null);
//     if(res === null) return NextResponse.redirect(new URL('/login', req.url))
//     else return NextResponse.next();
// })