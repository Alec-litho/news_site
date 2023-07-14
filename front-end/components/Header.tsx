'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Container, FormControl, Navbar, NavbarBrand} from "react-bootstrap"
import Link from 'next/link';
import Bell from '../public/svg_icons/Bell'
import Search from '../public/svg_icons/Search'
import '../styles/Header.css'
import { fetchNews, setSearchInfo } from '../features/searchSlice';
import {useEffect, useRef} from 'react'
import useRefresh from '../hooks/useRefresh'
import { useAppDispatch, useAppSelector } from '../hooks/reduxCustomHooks';

export default function Header() {
    let refresh = useRefresh()
    let dispatch = useAppDispatch()
    let inputSearch = useRef(null)
    let authData = useAppSelector(state => state.auth)
    //n
    if(authData._id === null) return <div></div>

    return (
            <Navbar className="navbar position-sticky" expand="md" variant='dark' style={{"height":"70px"}}>
                <Container>
                <NavbarBrand><img className="logo" style={{"width":"50px"}} src={authData.avatarUrl}></img></NavbarBrand>
                <Navbar.Collapse className='collapse'>
                    <Nav className='nav pe-5'>
                        <div className='navlink'>
                           <Link href="/home" className="link" onClick={refresh}>Home</Link>
                        </div>
                        <div className='navlink'>
                           <Link href="/video" className="link" onClick={refresh}>Video</Link>
                        </div>
                        <div className='navlink'>
                           <Link href="/account" className="link" onClick={refresh}>Profile</Link>
                        </div>
                        <div className='navlink'>
                           <Link href="/magazine" className="link" onClick={refresh}>Magazine</Link>
                        </div>
                    </Nav> 
                    <Nav className='nav-search d-flex'>
                        <Bell className='icon'/>
                        <FormControl ref={inputSearch}></FormControl>
                        <Search className='search' onClick={() => dispatch(fetchNews('data'))}></Search>
                        
                    </Nav>
                </Navbar.Collapse>
                
                </Container>
                
            </Navbar> 
    )
}

