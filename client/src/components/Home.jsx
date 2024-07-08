import React, { useEffect, useRef, useState } from 'react'
import '../App.css'
import { AiFillDelete } from 'react-icons/ai';
import { MdModeEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [listTodo, setListTodo] = useState([]);
    const [todo, setTodo] = useState('')
    const [popUp, setpopUp] = useState(false)
    const [getData, setGetData] = useState('')
    const [currentId, setCurrentId] = useState("")
    const [editIconsVisible, setEditIconsVisible] = useState(Array(listTodo.length).fill(true));
    const navigate = useNavigate()

    let name = localStorage.getItem('User')
    let token = localStorage.getItem('Auth')
    name = JSON.parse(name)
    const userId = name._id

    const todoRef = useRef(null);

    const outPut = async () => {
        if (todo === '') {
            alert('Filed is Empty')
            return false
        }
        else {
            const data = await fetch('http://localhost:4120/todo', {
                method: 'post',
                body: JSON.stringify({ userId, todo }),
                headers: {
                    'content-Type': 'application/json',
                    authorization: `bearer ${JSON.parse(token)}`
                }
            })
            const result = await data.json()
            console.log(result)
            listWork()
            setTodo('')

            if (todoRef.current) {
                todoRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    const listWork = async () => {
        try {
            const data = await fetch(`http://localhost:4120/listTodo/${userId}`,{
                headers:{
                    authorization: `bearer ${JSON.parse(token)}`
                }
            })
            const result = await data.json()
            setListTodo(result)
            console.log(listTodo)
        } catch (error) {
            console.log(error)
        }

    }

    const deleteWork = async (id) => {
        const data = await fetch(`http://localhost:4120/delete/${id}`, {
            method: 'delete',
            headers: {
                'content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(token)}`
            }
        })
        listWork();
    }

    const getWrok = async (id) => {
        try {
            let data = await fetch(`http://localhost:4120/getWork/${id}`)
            data = await data.json()
            setGetData(data.todo)
            setCurrentId(data._id)
        }
        catch (error) {
            console.log(error)
        }
    }

    const updateWork = async () => {
        const data = await fetch(`http://localhost:4120/update/${currentId}`, {
            method: 'Put',
            body: JSON.stringify({ todo: getData }),
            headers: {
                'content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(token)}`
            }
        })
        const result = await data.json()
        listWork()
    }

    const toggleEditIconVisibility = (index) => {
        const newEditIconsVisible = [...editIconsVisible];
        newEditIconsVisible[index] = !newEditIconsVisible[index];
        setEditIconsVisible(newEditIconsVisible);
    };

    const Logout = () => {
        localStorage.removeItem('User')
        navigate('/')
    }

    useEffect(() => {
        listWork()
    }, [])


    return (
        <>
            <div className='w-100 h-screen flex flex-col gap-1 justify-center items-center bg-blue-400'>

                <div className='flex w-[40%] justify-between px-6'>
                    <h1 className='text-white text-2xl'>
                        welocme <span className='font-bold'>{" " + name.firstName + " " + name.lastName}</span>
                    </h1>
                    <button onClick={Logout} className='py-1 px-3 text-blue-600 rounded-md bg-white font-medium' >Logout</button>
                </div>

                <div className='w-[40%] h-[80%] bg-white rounded-2xl '>
                    <div className='pb-3 border-b-2 border-blue-500 '>
                        <h1 className='text-5xl text-center text-blue-900 font-bold'>Todo App</h1>
                    </div>
                    <div className='flex justify-center items-center py-4 gap-2'>
                        <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} className='border-blue-500 border-2 w-96 h-10 text-lg px-3' placeholder='Enter your Todo' name="" id="" />
                        <button onClick={outPut} className='border-2 border-orange-800 bg-orange-400 rounded-md px-2 py-1'>Add Todo</button>
                    </div>
                    <div className='flex flex-col items-center custom-scrollbar pt-4 w-full px-4'>
                        <ul className='flex divide-x-2 divide-blur-700 border-2 divide-blue-700 border-blue-700 w-full'>
                            <li className='px-2 w-[17%] text-lg text-center'>index</li>
                            <li className='px-2 w-[71%] text-lg text-center'>Todo</li>
                            <li className='px-2 w-[12%] text-lg text-center'>Done</li>
                        </ul>
                        {listTodo.length > 0 ?
                            listTodo.map((item, index) => (

                                <ul key={index} ref={index === listTodo.length - 1 ? todoRef : null} className='flex divide-x-2 divide-blue-700 border-t-0 border-2 border-blue-700 w-full'>
                                    <li className='px-2 w-[17%] text-lg text-center '>{index + 1}</li>
                                    <li className='px-2 w-[71%] flex  justify-between bg-inherit text-lg'>{item.todo}
                                        <div className='flex gap-1'>
                                            <button className={editIconsVisible[index] ? 'text-gray-400 pointer-events-none' : 'block'} onClick={() => { getWrok(item._id); setpopUp(true) }}><MdModeEdit /></button>
                                            <div className={popUp ? 'fixed inset-0 flex items-center justify-center z-50' : `fixed inset-0 hidden items-center justify-center z-50`}>
                                                <div className="fixed inset-0 bg-black opacity-5"></div>
                                                <div className="relative bg-white h-40 w-96 p-4 rounded-lg shadow-lg">
                                                    <button onClick={() => setpopUp(false)} className="absolute top-0 right-2 text-4xl text-gray-600 hover:text-gray-800">×</button>

                                                    <div className='flex flex-col gap-2'>
                                                        <input type='text' value={getData} onChange={(e) => { setGetData(e.target.value) }} className='mt-8 border-blue-500 border-2 px-2 rounded-sm' />
                                                        <button onClick={() => { updateWork(); setpopUp(false) }} className='border-2 border-orange-800 w-fit self-center bg-orange-400 rounded-md px-2'>Update</button>
                                                    </div>

                                                </div>
                                            </div>
                                            <button onClick={() => { deleteWork(item._id) }}><AiFillDelete /></button>
                                        </div>
                                    </li>
                                    <li className='px-2 w-[12%] flex justify-center text-lg'>
                                        <input type="checkbox" onClick={() => toggleEditIconVisibility(index)} className="rounded-checkbox cursor-pointer" name="" id="" />
                                    </li>
                                </ul>
                            ))
                            : <h1 className='text-3xl font-bold text-center mt-10'>No Todo Yet</h1>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home

