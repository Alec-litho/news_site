'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Container, FormControl, Navbar, NavbarBrand} from "react-bootstrap";
import Link from 'next/link';
import Bell from '../public/svg_icons/Bell';
import Account from '../public/svg_icons/profile_menu/account.jsx';
import Settings from '../public/svg_icons/profile_menu/settings.jsx';
import Search from '../public/svg_icons/Search';
import { fetchNews, setSearchInfo } from '../features/searchSlice';
import {useEffect, useRef} from 'react';
import useRefresh from '../hooks/useRefresh';
import { useAppDispatch, useAppSelector } from '../hooks/reduxCustomHooks';

export default function Header() {
    let refresh = useRefresh()
    let dispatch = useAppDispatch()
    let inputSearch = useRef(null)
    let authData = useAppSelector(state => state.auth)

    if(authData._id === null) return <div></div>

    return (
            <Navbar className={"navbar position-sticky"} expand="md"> 
                <Container className='d-flex align-items-center'>
                <NavbarBrand className="logo"><img  style={{"width":"50px"}} src="https://i.ibb.co/h73PKhM/logo.png"></img></NavbarBrand>
                <Navbar.Collapse className='collapse d-flex'>
                    <Nav className='navigation w-50  d-flex justify-content-between'>
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
                <Nav className="nav-tools d-flex align-items-center justify-content-between">
                        <Bell className="icon_A bell" />
                        <input className="search-box" placeholder='Search' ref={inputSearch}></input>
                        <Search  className="icon_A search" onClick={() =>console.log()/* dispatch(fetchNews)*/}></Search>
                        <div>
                            <img className="profile-picture" src={authData.avatarUrl}></img>
                        </div>
                        <div className='profile-menu'>
                            <ul>
                                <li><Link href="/account"  onClick={refresh}>Account</Link></li>
                                <Account className="icon_A"/>
                            </ul>
                            <ul>
                                <li><Link href="/account"  onClick={refresh}>Account</Link></li>
                                <Settings className="icon_A"/>
                            </ul>
                        </div>
                </Nav>
                </Container>
                
            </Navbar> 
    )
}

