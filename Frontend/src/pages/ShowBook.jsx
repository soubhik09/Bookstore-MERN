import React, { useState } from 'react'
import { useParams } from "react-router"
import axios from 'axios'
import Backbutton from '../components/Backbutton'
import { useEffect } from 'react'
import { MoonLoader } from "react-spinners";

function ShowBook() {
    const [book, setBook] = useState({})
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        setLoading(true)

        const timer = setTimeout(() => {
            axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`)
                .then((res) => {
                    setBook(res.data)
                    setLoading(false)
                }).catch((error) => {
                    console.log(error);
                    setLoading(false)
                    alert('An error happened. Please chack console!')
                })
        }, 700)

        return () => clearTimeout(timer);
    }, [])


    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl my-4 mt-20 border-2 border-sky-400 rounded-xl px-5 py-1'>Show Book</h1>
            {loading ? (<MoonLoader className='mt-20' size={70} />) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-10'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 bg-yellow-300 py-1 px-5 rounded-xl'>Id</span>
                        <span>{book._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 bg-green-300 py-1 px-5 rounded-xl'>Title</span>
                        <span>{book.title}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 bg-pink-300 py-1 px-5 rounded-xl'>Author</span>
                        <span>{book.author}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 bg-red-300 py-1 px-5 rounded-xl'>Publish Year</span>
                        <span>{book.publishYear}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 bg-orange-300 py-1 px-5 rounded-xl'>Create Time</span>
                        <span>{new Date(book.createdAt).toString()} ✅</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500 bg-teal-300 py-1 px-5 rounded-xl'>Last Update Time</span>
                        <span>{new Date(book.updatedAt).toString()} ✅</span>
                    </div>
                </div>
            )}
            <div className='mt-6'>
                {loading ? null : <Backbutton />}
            </div>
        </div>
    )
}

export default ShowBook