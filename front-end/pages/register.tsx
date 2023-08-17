
import {useForm, SubmitHandler} from 'react-hook-form'
import Image from 'next/image';
import { MouseEvent, FocusEvent, FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxCustomHooks';
import { loginUser } from '../features/authSlice';
import router from "next/router";
import Email  from '../public/svg_icons/login/email' 
import Lock  from '../public/svg_icons/login/lock' 
import User from '../public/svg_icons/login/user'
import RepeatPassword from '../public/svg_icons/login/repeat_password'
import Link from 'next/link';
import axios from 'axios';
type IregisterForm = {
    email: string,
    password: string,
    name: string,
    gender: string
    birthDate: string
};

function Register() {
    const dispatch = useAppDispatch();
    
    const {
        register,
        formState: {errors},
        handleSubmit,
        
     } = useForm<IregisterForm>();

     const onSubmit: SubmitHandler<IregisterForm> =  (data) => {  
        dispatch(loginUser(data)).then(() => router.push("home"))
    }

    function changeIconColor(element:HTMLLabelElement ) {
        console.log({...register});
        element.classList.add("active")
    }
    function setDefIconColor(element:HTMLInputElement) {
        if(!element.value)  {
            let label = element.parentNode as HTMLLabelElement
            console.log(label);
            
            if(label)label.classList.remove("active") 
        }
       
    }
    return (
        <div className='d-flex w-100'>
            <div className="left_container_register d-flex justify-content-center align-items-center w-50">
                <div className="w-75">
                   <h1>Adventure starts here</h1>
                   <h3 className='text-white w-50'>Join our lovely community right now</h3>
                </div>
  
            </div>
            <div className="right_container w-50 d-flex justify-content-center align-items-center flex-direction-column">
                <form method="post" className="model w-50" onSubmit={handleSubmit(onSubmit)}>
                <div className="inputContainer ">
                    <div className="email_container d-flex  position-relative mb-3">
                        <label className='label'>Email
                        <Email className="icon_A"/>
                        <input className="email" type="email" placeholder="Write your email address" {...register('email', {required:true})}
                         onFocus={(e:FocusEvent)=> changeIconColor(e.target.parentNode as HTMLLabelElement)}
                         onBlur={(e) => setDefIconColor(e.target)}
                         />
                        {errors.email && <p className='error'>email is required</p>}
                        </label>
                    </div>
                    <div className="name_container d-flex  position-relative mb-3">
                        <label className='label'>Name
                        <User className="icon_A"/>
                        <input className="name" type="email" placeholder="Write your full name" {...register('name', {required:true})}
                         onFocus={(e:FocusEvent)=> changeIconColor(e.target.parentNode as HTMLLabelElement)}
                         onBlur={(e) => setDefIconColor(e.target)}
                         />
                        {errors.name && <p className='error'>name is required</p>}
                        </label>
                    </div>
                    <div className="additional_info d-flex w-100 mb-3">
                        <div className='gender_container'>
                            <label>Gender:</label>
                            <div className='male d-flex align-items-center justify-content-between '>
                                <input className="male" type="radio" {...register('gender', {required:true})}/>
                                <h5 className='mb-0'>Male</h5>
                            </div>
                            <div className='female d-flex align-items-center justify-content-between'>
                                <input className="female" type="radio" {...register('gender', {required:true})}/>
                                <h5 className='mb-0'>Female</h5>
                            </div>
                        </div>
                        <div>
                            <label>Birthday:</label>
                            <input type="date" id="birthday" name="birthday"/>
                        </div>
                    </div>
                    <div className="password_container d-flex  position-relative mb-3">
                        <label className='label'>Password
                        <Lock className="icon_A"/>
                        <input className="password" type="write password" placeholder="Write your password" {...register("password", {required: true})}
                        onFocus={(e:FocusEvent)=> changeIconColor(e.target.parentNode as HTMLLabelElement)}
                        onBlur={(e) => setDefIconColor(e.target)}
                        />
                        {errors.password && <p className='error'>password is required</p>}
                        </label>
                    </div>
                    <div className="repeat_password_container d-flex  position-relative">
                        <label className='label'>Repeat password
                        <RepeatPassword className="icon_A"/>
                        <input className="password" type="write password" placeholder="Repeat your password" {...register("password", {required: true})}
                         onFocus={(e:FocusEvent)=> changeIconColor(e.target.parentNode as HTMLLabelElement)}
                         onBlur={(e) => setDefIconColor(e.target)}
                         />
                        {errors.password && <p className='error'>password is required</p>}
                        </label>
                    </div>
                    
                </div>
                <input className='login mt-5' type="submit" value="Register"></input>
                <div className='border d-flex align-items-center justify-content-between mt-4 mb-2'>
                    <div className='line'></div>
                    <p>or</p>
                    <div className='line'></div>
                </div>
                <div className='wrapper d-flex w-100 justify-content-center'>
                <div className=' icons w-50  d-flex justify-content-between'>
                    <div className='icon'>
                        <a role='button'>
                           <Image src={'/../public/vk.png'} alt="icon" width={50} height={50}/>
                        </a>
                    </div>
                    <div className='icon'>
                        <a href="http://localhost:3001/auth" >
                            <Image src={'/../public/google.png'} alt="icon" width={40} height={40}/>
                        </a>
                        
                    </div>
                    <div className='icon'>
                        <Image src={'/../public/facebook.png'} alt="icon" width={50} height={50}/>
                    </div>
                </div>
                </div>
                <div className='wrapper d-flex w-100 justify-content-center mt-2'>
                    <div className='d-flex align-items-center'>
                        <h6 className='mb-0'>Already have account?</h6>
                        <Link href="/login"><span className="create"> Log in</span></Link>
                    </div>
                </div>
                
                </form>
            </div>
            
        </div>
    )
}


export default Register

/*
1015608676012-0nddm7jredi2ecik5cd98ajqi8pn5jh4.apps.googleusercontent.com
*/