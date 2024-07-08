import React from 'react'
import { Link } from 'react-router-dom'

const Welcom = () => {
    return (
        <>
            <div className='w-full h-screen bg-blue-500 flex flex-col justify-center items-center gap-12'>
                <h1 className='text-[5rem] text-center text-white font-extrabold pt-5' >Welcom Todo App</h1>
                <div className='flex flex-col gap-5'>
                    <Link to='/logIn'>
                        <button className='bg-white text-blue-800 w-60 py-4 text-2xl font-bold rounded-lg hover:bg-blue-400 hover:text-white '>Login</button>
                    </Link>
                    <Link to='/signUp'>
                        <button className='bg-white text-blue-800 w-60 py-4 text-2xl font-bold rounded-lg hover:bg-blue-400 hover:text-white '>SignUp</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Welcom
