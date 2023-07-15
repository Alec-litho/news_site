import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap"
import '../styles/accountStyle.css'
import {useState, useRef} from 'react'
import ArrowRight from '../public/svg_icons/ArrowRight'
import ArrowLeft from '../public/svg_icons/ArrowLeft'
import ProfileIcon from '../public/svg_icons/profile'
import Bell from '../public/svg_icons/Bell'
import Header from "../components/Header"
import Edit from '../public/svg_icons/Edit'


export default function Account() {
  let [sidebarStatus, setSidebar] = useState(false)
  let [route, setRoute] = useState('Profile')

  
  let sidebar = useRef<HTMLDivElement>(null)

  function moveSidebar() {
    if(!sidebar.current) return
    if(sidebarStatus) {
      sidebar.current.style.left = '-200px'
      setSidebar(false)
    }
    else {
      sidebar.current.style.left = '0'
      setSidebar(true)
    }
  }
  function routeSet(e: React.MouseEvent<Element, MouseEvent>) {
    let target = e.target as HTMLDivElement
    if(target.parentNode===null||target.parentNode.parentNode===null)return
    let parentNodeEl = target.parentNode as HTMLElement
    if(target.nodeName === "DIV") {
      for (const node of target.parentNode.childNodes) {
        let nodeEl = node as HTMLElement
        nodeEl.className = 'cell'
      }
      target.className = 'cell hover'
      let titleOfRoute = target.childNodes[1] as HTMLElement
      setRoute(titleOfRoute.innerText)
    }
    else if(target.nodeName === "H6"){
      for (const node of target.parentNode.parentNode.childNodes) {
        let nodeEl = node as HTMLElement
        nodeEl.className = 'cell'
      }
      parentNodeEl.className = 'cell hover'
      setRoute(target.innerText)
    }

  }
  function hoverCell(e: React.MouseEvent<Element, MouseEvent>) {
    let target = e.target as HTMLDivElement
    target.className = "hover"
  }
  function unhoverCell(e: React.MouseEvent<Element, MouseEvent>) {
    let target = e.target as HTMLDivElement//typescript knows that e.target returns some HTMLElement but it doesnt know exactly so we should specify thta it returns div
    //its called type assertions

    if(target.className === route) return
    if(target.nodeName == "H6" || target.nodeName === "path") return 
    target.className = "cell" 
  }
    return (
        <div className="account">
           <div ref={sidebar} className="sidebar" onMouseEnter={() => moveSidebar()} onMouseLeave={() => moveSidebar()}>
              <div>
                {sidebarStatus? <ArrowRight className="arrow"/> : <ArrowLeft className="arrow"/>}
              </div>
              <div className="mt-4">
                <div className="cell d-flex" onMouseEnter={(e) => hoverCell(e)} onMouseLeave={(e) => unhoverCell(e)} onClick={e => routeSet(e)}>
                  <ProfileIcon className="icon-acc"/>
                  <h6>Profile</h6>
                </div>
                <div className="cell d-flex" onMouseEnter={(e) => hoverCell(e)} onMouseLeave={(e) => unhoverCell(e)} onClick={e => routeSet(e)}>
                  <Edit  className="icon-acc"/>
                  <h6>Edit profile</h6>
                </div>
                <div className="cell d-flex" onMouseEnter={(e) => hoverCell(e)} onMouseLeave={(e) => unhoverCell(e)} onClick={e => routeSet(e)}>
                  <Bell className="icon-acc"/>
                  <h6>Notifications</h6>
                </div>
              </div>
           </div> 
           <Container className="mainContent rounded">
           {(() => {
            return route === 'Profile'? <Profile/> : route === 'Edit profile'? <ProfileEdit/> : <img src="/bell.svg"></img>
           })()}
           </Container>
        </div>
    )
}

function Profile() {
  return (
    <div>
      <div className="header d-flex align-items-center h-25">
        <img></img>
        <h2>David O'Brien</h2>
      </div>
      <div className="info">
        <h5>member since:</h5>
        <h5>email:</h5>
        <h5>age:</h5>
      </div>
      <div className="subscriptions">
        <div className="channel">channel 1</div>
        <div className="channel">channel 2</div>
        <div className="channel">channel 3</div>
      </div>
      <div className="readLater">
        <div className="rl-block">
          <h5>The incident happend in Massachusetts court...</h5>
          <p>25 minuts ago</p>
          <img className="rl-img"></img>
        </div>
      </div>
    </div>
  )
}

function ProfileEdit() {
  return (
    <div>
      <div className="header d-flex align-items-center h-25">
        <img></img>
        <h2>David O'Brien</h2>

      </div>
    </div>
  )
}

function Notifications() {
  return (
    <div>
    </div>
  )
}