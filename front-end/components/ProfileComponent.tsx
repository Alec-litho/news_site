
import ProfileArrow from '../public/svg_icons/home/ProfileArrow';

export default function ProfileComponent(props) {
    const data = {avatarUrl:"https://i.ibb.co/Bqm8N2r/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg",
                  fullName:"Oleg Opal",
                  backgroundImg:"https://i.ibb.co/xhFK9yz/visdev8.jpg",
                  description:"спустя пару часов я наконец код работать так, как мне нужно..."
            }
    return (
        <div className="profile position-relative">
             <img className="backgroundImg" src={data.backgroundImg}/>
           <img className="profilePicture rounded-circle" src={data.avatarUrl}></img>
           <div className="info-block">
           <h6>{data.fullName}</h6>
           <p className="desc">{data.description}</p>
           <div className='show-profile'>
             <p>show profile</p>
             <ProfileArrow className="icon_A"/>
           </div>
           </div>
           
        </div>
    )
} 