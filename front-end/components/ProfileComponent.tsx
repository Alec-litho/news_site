


export default function ProfileComponent(props) {
    return (
        <div className="profile rounded py-3 px-3">
           <img className="rounded-circle w-25" src={props.avatarUrl}></img>
           <h6>{props.fullName}</h6>
        </div>
    )
}