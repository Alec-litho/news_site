'use client'
import {useForm, SubmitHandler} from 'react-hook-form'
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks/reduxCustomHooks';
import { fetchData } from '../features/authSlice';
type IForm = {
    email: string,
    password: string,
};

  
function Login() {
    const dispatch = useAppDispatch();
    const {
        register,
        formState: {errors},
        handleSubmit
     } = useForm<IForm>();
     const onSubmit: SubmitHandler<IForm> =  (data) => dispatch(fetchData(data));

    return (
        <div className='container'>
            <form className="model" onSubmit={handleSubmit(onSubmit)}>
            <img src="https://i.ibb.co/Bqm8N2r/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg" className='profile-picture'></img>
            <div className="inputContainer">
                <div className="d-flex">
                    <svg className="input icon"></svg>
                    <label>
                        Email
                    <input className="email" type="email" placeholder="write email" {...register('email', {required:true})}/>
                    {errors.email && <p className='error'>email is required</p>}
                    </label>
                  
                </div>
                <div className="d-flex">
                    <svg className="input icon"></svg>
                    <label>
                        Password
                    <input className="password" type="write password" placeholder="Password" {...register("password", {required: true})}/>
                    {errors.password && <p className='error'>password is required</p>}
                    </label>
                </div>
                
            </div>
            <div className='d-flex'>
                <div className='d-flex align-items-center'>
                    <input type='checkbox'/>
                    <h6 className='remember'>remember me</h6>
                </div>
                <a href="#" className='forgotPass'>Forgot password?</a>
            </div>
            <input className='login' type="submit"></input>
            </form>
        </div>
    )
}


export default Login