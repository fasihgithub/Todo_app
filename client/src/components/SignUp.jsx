import React, { useState } from 'react'
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

export const SignUp = () => {

    const [firstName, setFname] = useState('')
    const [lastName, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()


    const signUp = async () => {
        const err = !firstName || !lastName || !email || !password;

        if (err) {
            setError(true);
            return false;
        } else {
            const data = await fetch('http://localhost:4120/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            if (data.status === 200) {
                const result = await data.json();
                localStorage.setItem('User', JSON.stringify(result.finalResult));
                localStorage.setItem('Auth', JSON.stringify(result.auth))
                navigate('/home');
            }
            else {
                if (data.status === 409) {
                    alert("Email Already Exist...")
                    setError(true);
                } else {
                    alert('Something is Wrong....');
                }
            }
        }
    };


    const handleVisible = () => {
        setVisible((prev) => !prev)
    }



    return (
        <>
            <div className='w-full h-screen bg-blue-500 flex justify-center items-center'>
                <div className='w-[45%] h-[85%] rounded-xl bg-white px-6 flex flex-col items-center justify-between py-6' >
                    <div className='w-[80%] flex flex-col items-center gap-6'>
                        <div className='flex flex-col gap-0 w-full'>
                            <input value={firstName} onChange={(e) => setFname(e.target.value)} type="text" className='border-2 border-blue-500 rounded-lg outline-none text-xl px-2 h-12 w-full' placeholder='Enter First Name' name="" id="" />
                            {error && !firstName && <p className='text-sm text-red text-red-600'>Field is Empty</p>}
                        </div>
                        <div className='flex flex-col gap-0 w-full'>
                            <input value={lastName} onChange={(e) => setLname(e.target.value)} type="text" className='border-2 border-blue-500 rounded-lg outline-none text-xl px-2 h-12 w-full' placeholder='Enter Last Name' name="" id="" />
                            {error && !lastName && <p className='text-sm text-red text-red-600'>Field is Empty</p>}
                        </div>
                        <div className='flex flex-col gap-0 w-full'>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='border-2 border-blue-500 rounded-lg outline-none text-xl px-2 h-12 w-full' placeholder='Enter Your Email' name="" id="" />
                            {error && !email && <p className='text-sm text-red text-red-600'>Field is Empty</p>}
                        </div>

                        <div className='relative w-full'>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type={visible ? "text" : "password"} className='border-2 border-blue-500 rounded-lg outline-none text-xl px-2 h-12 w-full' placeholder='Enter Your Password' name="" id="" />
                            {error && !password && <p className='text-sm text-red text-red-600'>Field is Empty</p>}
                            <button onClick={handleVisible} className='text-lg absolute right-4 top-4'>
                                {
                                    visible ? <AiFillEye /> : <AiFillEyeInvisible />
                                }
                            </button>
                        </div>

                    </div>
                    <div>
                        <button onClick={signUp} className='w-96 bg-blue-400 text-white py-3 text-xl font-medium rounded-xl hover:bg-blue-800'>SignUp</button>
                        <p className='text-center w-full'>Already have account? <Link to="/logIn" className='text-lg font-bold text-blue-700'>Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}
