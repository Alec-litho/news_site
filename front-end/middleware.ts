import { useAppDispatch } from "./hooks/reduxCustomHooks";
import { getUser } from "./features/authSlice";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req:NextRequest) {
    // const dispatch = useAppDispatch()
    let token = req.cookies.get("token")
    let _id = req.cookies.get("_id")
    if(!req.cookies.has("token"))  return NextResponse.redirect(new URL('/login', req.url))
//     const parameters = {
//         _id: JSON.stringify(_id),
//         token: JSON.stringify(token)
//     }
//     dispatch(getUser(parameters))
    return NextResponse.next()
}

export const config = {
    matcher: '/home'
}