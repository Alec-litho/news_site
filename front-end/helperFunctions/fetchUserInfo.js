'client'
import { useAppDispatch } from '../hooks/reduxCustomHooks';
import { getUser } from '../features/authSlice';

export default function getUserInfo() {
    const dispatch = useAppDispatch();
    const parameters = {};
    document.cookie.split(";").forEach((str) => {
        let splitted = str.split("=")
        if(splitted[0]===" token")parameters.token = splitted[1]
        if(splitted[0]==="_id")parameters._id = splitted[1]
    })
    if(parameters) {
        console.log(parameters);
        
        dispatch(getUser(parameters))
    }
}