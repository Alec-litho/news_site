'use client'
import {useRouter} from 'next/router';
import {useState, useEffect, ReactNode} from 'react';
import { useAppDispatch } from '../hooks/reduxCustomHooks';
import { getUser } from '../features/authSlice';
import React from 'react';



export const RouterGuard:React.FC<{children:ReactNode}> = function({children}):ReactNode {
    const dispatch = useAppDispatch()
    let token: string|null = null;
    let _id: string;
    if(typeof window !== "undefined") {
        token = sessionStorage.getItem("token")
        _id = JSON.stringify(sessionStorage.getItem("_id"))
    }
    
    const router = useRouter();
    let [authorized, setAuthorized] = useState(token? true : false);

    useEffect(() => {
        if(!authorized) router.push("/login");
        function setAuthFalse() {setAuthorized(false)};
        router.events.on("routeChangeStart", setAuthFalse);

        router.events.on("routeChangeComplete", checkAuth);

        return () => {
            router.events.off("routeChangeStart", () => setAuthFalse);
            router.events.off("routeChangeComplete", checkAuth);
        };
    }, []);

    function checkAuth(url:string):void {
        const publicPath = ["/login"];
        const path = url.split("?")[0]

        if(token===null) {
            setAuthorized(false);
            router.push({
                pathname: "/login", 
                query: {returnUrl: router.asPath}
            });
        } else {
            setAuthorized(true)
            dispatch(getUser({_id,token}))
            router.push("/home")
        }
    };
    
    if(authorized || typeof window === "undefined") return children 
};