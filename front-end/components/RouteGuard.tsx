'use client'
import {useRouter} from 'next/router';
import {useState, useEffect, ReactNode} from 'react';
import { useAppDispatch } from '../hooks/reduxCustomHooks';
import { getUser } from '../features/authSlice';
import React from 'react';
import Login from '../pages/login';



export const RouterGuard:React.FC<{children:ReactNode}> = function({children}):ReactNode {

    const dispatch = useAppDispatch()
    let token: string|null = null;
    let _id: string;
    if(typeof window !== "undefined") {
        token = sessionStorage.getItem("token")
        _id = JSON.stringify(sessionStorage.getItem("_id"))
    }
    function setAuthFalse() {setAuthorized(false)};
    const router = useRouter();
    let [authorized, setAuthorized] = useState(token? true : false);

    useEffect(() => {
        checkAuth(router.asPath)
        router.events.on("routeChangeStart", setAuthFalse);
        router.events.on("routeChangeComplete", checkAuth);
        return () => {
            router.events.off("routeChangeStart", () => setAuthFalse);
            router.events.off("routeChangeComplete", checkAuth);
        };
    }, []);

    function checkAuth(url:string):JSX.Element|void {
        console.log(url);
        
            if(!authorized && url !== "/login") {
                router.push( "/login");
                if(token) {
                setAuthorized(true)
                dispatch(getUser({_id,token}))
            }
            }
    };
    console.log(typeof window );
    if( typeof window === "undefined") return children || <Login/>
    if((authorized===true&&typeof window !== "undefined")) return children
    else return <Login/>
};