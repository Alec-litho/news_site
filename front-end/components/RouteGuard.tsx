'use client'
import {useRouter} from 'next/router';
import {useState, useEffect, ReactNode} from 'react';
import React from 'react';
import {useAppSelector } from '../hooks/reduxCustomHooks';

export const RouterGuard:React.FC<{children:ReactNode}> = function({children}):ReactNode {
    const user = useAppSelector(state => state.auth._id);
    const router = useRouter();
    let [authorized, setAuthorized] = useState(false);

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

        if(user===null && !publicPath.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: "/login", 
                query: {returnUrl: router.asPath}
            });
        } else {
            setAuthorized(true)
        }
    };
    if(authorized) return children 
};