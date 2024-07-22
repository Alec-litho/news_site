'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Container, FormControl, Navbar, NavbarBrand} from "react-bootstrap";
import Link from 'next/link';
import Image from 'next/image';
import Bell from '../public/svg_icons/Bell';
import Account from '../public/svg_icons/profile_menu/account.jsx';
import Settings from '../public/svg_icons/profile_menu/settings.jsx';
import Search from '../public/svg_icons/Search';
import { fetchNews, setSearchInfo } from '../features/searchSlice';
import {useEffect, useRef,useState} from 'react';
import useRefresh from '../hooks/useRefresh';
import { useAppDispatch, useAppSelector } from '../hooks/reduxCustomHooks';
import getUserInfo from "../helperFunctions/fetchUserInfo";



export default function Header() {
    let [showNavbar, setshowNavbar] = useState(true)
    useEffect(() => {
        window.addEventListener("resize", (e) => resizeNavbar(e))
        return window.removeEventListener("resize", (e) => resizeNavbar(e))
    },[])
    let refresh = useRefresh()
    let dispatch = useAppDispatch() 
    let inputSearch = useRef(null)
    let sideBarMenu = useRef<HTMLDivElement>(null!)
    let authData = useAppSelector(state => state.auth)
    let [showSidebar, setShowSidebar] = useState(false)
        let userData = useAppSelector((state)=> state.auth)
        if(userData.logedIn === false) getUserInfo()
    if(authData._id === null) return <div></div>
    function resizeNavbar(e) {
        if(e.target.innerWidth < 769) setshowNavbar(false)
        else setshowNavbar(true)
    }
    return (
            <Navbar className={"navbar"} expand="md"> 
                <Container className='d-flex align-items-center'>
                <NavbarBrand className="logo"><img  style={{"width":"50px"}} src="https://i.ibb.co/h73PKhM/logo.png"></img></NavbarBrand>
                {
                    showNavbar &&
                    <Navbar.Collapse className='collapse d-flex'>
                    <Nav className='navigation  d-flex justify-content-between'>
                        <div className='link active'>
                           <Link href="/home" onClick={refresh}>Home</Link>
                           <div className="line"></div>
                        </div> 
                        <div className='link'>
                           <Link href="/video"  onClick={refresh}>Videos</Link>
                           <div className="line"></div>
                        </div>
                        <div className='link'>
                           <Link href="/account"  onClick={refresh}>Account</Link>
                           <div className="line"></div>
                        </div>
                        <div className='link'>
                           <Link href="/magazine"  onClick={refresh}>Message</Link>
                           <div className="line"></div>
                        </div>
                    </Nav> 
                </Navbar.Collapse>
                }
                <Nav className="nav-tools d-flex align-items-center justify-content-between"> 
                        <Bell className="icon_A bell" />
                        <div className='search-box-parent position-relative d-flex'>
                            <input className="search-box" placeholder='Search' ref={inputSearch}></input>
                            <Search  className="icon_A search" onClick={() =>console.log()/* dispatch(fetchNews)*/}></Search>
                        </div>
                        {
                        <div className="sidebar-menu-parent" onClick={(e)=>{sideBarMenu.current.classList.add("show");setTimeout(()=>setShowSidebar(true),0)}} onMouseLeave={(e)=>setTimeout(()=>{if(!showSidebar) setShowSidebar(false)},200)}>
                            <img className="profile-picture" src={authData.avatarUrl}></img>
                            <div ref={sideBarMenu}  className={showSidebar? "sidebar-menu show active":"sidebar-menu"} onMouseEnter={(e)=> setShowSidebar(true)} onMouseLeave={(e)=>setShowSidebar(false)}>
                            <ul>
                                <li className='menu-option'>
                                    <Account className="icon_A"/>
                                    <Link href="/account"  onClick={refresh}><h4>account</h4></Link>
                                </li>
                                <li  className='menu-option'>
                                    <Settings className="icon_A"/>
                                    <Link href="/settings"  onClick={refresh}><h4>settings</h4></Link>
                                </li>
                            </ul>
                        </div>
                        </div>
                        }
                        
                </Nav>
                </Container>
                
            </Navbar> 
    )
}

