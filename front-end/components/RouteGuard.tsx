'use client'
import {useRouter} from 'next/router';
import {useState, useEffect, ReactNode} from 'react';
import React from 'react';


export const RouterGuard:React.FC<{children:ReactNode}> = function({children}):ReactNode {
    let token:string|null = null;
    if(typeof window !== "undefined") token = localStorage.getItem("token")
    
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
            router.push("/home")
        }
    };
    
    if(authorized || typeof window === "undefined") return children 
};