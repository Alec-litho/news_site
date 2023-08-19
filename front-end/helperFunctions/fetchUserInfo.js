'client'
import { useAppDispatch } from '../hooks/reduxCustomHooks';
import { getUser } from '../features/authSlice';
import parsedCookie from './parsedCookie';

export default async function getUserInfo() {
    const dispatch = useAppDispatch();
    const parameters = parsedCookie(document.cookie)
    if(parameters.token) {
        let promise = new Promise((resolve) => {
            resolve(dispatch(getUser(parameters)))
        })
        return promise
    }
}