
import {useForm, SubmitHandler} from 'react-hook-form'
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../hooks/reduxCustomHooks';
import { fetchData } from '../features/authSlice';
import router from "next/router";
import Email  from '../public/svg_icons/login/email' 
import Lock  from '../public/svg_icons/login/lock' 
import Link from 'next/link';
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

     const onSubmit: SubmitHandler<IForm> =  (data) => {
        dispatch(fetchData(data)).then(() => router.push("home"))
    }

    return (
        <div className='d-flex w-100'>
            <div className="left_container d-flex justify-content-center align-items-center w-50">
                <div className="w-75">
                   <h1>Adventure starts here</h1>
                   <h3 className='text-white w-50'>Join our lovely community right now</h3>
                </div>
  
            </div>
            <div className="right_container w-50 d-flex justify-content-center align-items-center flex-direction-column">
                <form method="post" className="model w-50" onSubmit={handleSubmit(onSubmit)}>
                <h4 className="text-center mb-4">Hello! Welcome back!</h4>
                <div className="inputContainer ">
                    <div className="email_container d-flex  position-relative mb-3">
                        <Email className="icon_A"/>
                        <label>
                            Email
                        <input className="email" type="email" placeholder="Enter your email address" {...register('email', {required:true})}/>
                        {errors.email && <p className='error'>email is required</p>}
                        </label>
                    </div>
                    <div className="password_container d-flex  position-relative">
                        <Lock className="icon_A"/>
                        <label>
                            Password
                        <input className="password" type="write password" placeholder="Enter your password" {...register("password", {required: true})}/>
                        {errors.password && <p className='error'>password is required</p>}
                        </label>
                    </div>
                    
                </div>
                <div className='d-flex mb-4 mt-2'>
                    <div className='d-flex w-100 align-items-center '>
                        <input type='checkbox'/>
                        <h6 className='remember color-orange'>remember me</h6>
                    </div>
                    <a href="#" className='forgotPass'>reset password?</a>
                </div>
                <input className='login' type="submit" ></input>
                <div className='border d-flex align-items-center justify-content-between mt-4 mb-2'>
                    <div className='line'></div>
                    <p>or</p>
                    <div className='line'></div>
                </div>
                <div className='wrapper d-flex w-100 justify-content-center'>
                <div className=' icons w-50  d-flex justify-content-between'>
                    <div className='icon'>
                        <Image src={'/../public/vk.png'} alt="icon" width={50} height={50}/>
                    </div>
                    <div className='icon'>
                        <Image src={'/../public/google.png'} alt="icon" width={40} height={40}/>
                    </div>
                    <div className='icon'>
                        <Image src={'/../public/facebook.png'} alt="icon" width={50} height={50}/>
                    </div>
                </div>
                </div>
                <div className='wrapper d-flex w-100 justify-content-center mt-2'>
                    <div className='d-flex align-items-center'>
                        <h6 className='mb-0'>Don't have account?</h6>
                        <Link href="/register"><span className="create">Create Account</span></Link>
                    </div>
                </div>
                
                </form>
            </div>
            
        </div>
    )
}


export default Login