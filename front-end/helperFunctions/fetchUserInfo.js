'client'
import { useAppDispatch } from '../hooks/reduxCustomHooks';
import { getUser } from '../features/authSlice';

export default async function getUserInfo() {
    const dispatch = useAppDispatch();
    const parameters = {};
    document.cookie.split(";").forEach((str) => {
        let splitted = str.split("=");
        console.log(splitted);
        if(splitted[0]==="token" || splitted[0]===" token")parameters.token = splitted[1]
        if(splitted[0]==="_id" || splitted[0]===" _id")parameters._id = splitted[1]
    })
    if(parameters.token) {
        let promise = new Promise((resolve) => {
            resolve(dispatch(getUser(parameters)))
        })
        return promise
    }
}