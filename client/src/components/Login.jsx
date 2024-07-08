import React, { useState } from 'react'
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleVisible = () => {
        setVisible((prev) => !prev)
    }

   const logIn = async() => {
    const findUser = await fetch('http://localhost:4120/login',{
        method:'Post',
        body:JSON.stringify({email, password}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    const result = await findUser.json()
    if(result.auth){
        localStorage.setItem('User', JSON.stringify(result.dataFind))
        localStorage.setItem('Auth', JSON.stringify(result.auth))
        navigate('/home')
    }
    else{
        alert('Email or Password incorrect')
    }
   }

    return (
        <>
            <div className='w-full h-screen bg-blue-500 flex justify-center items-center'>
                <div className='w-[45%] h-[85%] rounded-xl bg-white px-6 flex flex-col items-center gap-3 justify-between py-6' >
                    <div className='w-[80%] flex flex-col items-center gap-6 pt-12'>
                        
                        <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email}  className='border-2 border-blue-500 rounded-lg outline-none text-xl px-2 h-12 w-full' placeholder='Enter Your Email' name="" id="" />
                        
                        <div className='relative w-full'>
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} type={visible ? "text" : "password"} className='border-2 border-blue-500 rounded-lg outline-none text-xl px-2 h-12 w-full' placeholder='Enter Your Password' name="" id="" />
                            <button onClick={handleVisible} className='text-lg absolute right-4 top-4'>
                                {
                                    visible ? <AiFillEye /> : <AiFillEyeInvisible />
                                }
                            </button>
                        </div>
                    </div>
                    <div>
                        <button onClick={logIn} className='w-96 bg-blue-400 text-white py-3 text-xl font-medium rounded-xl hover:bg-blue-800'>Login</button>
                        <p className='text-center w-full'>Already have account? <Link to="/SignUp" className='text-lg font-bold text-blue-700'>SignUp</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
