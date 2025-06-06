import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { useEffect } from 'react';
import { MdOutlineAddBox } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { MoonLoader } from "react-spinners";

function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            axios.get(`${import.meta.env.VITE_API_URL}/books`)
                .then((res) => {
                    setBooks(res.data.data)
                    setLoading(false);

                }).catch((error) => {
                    console.log(error);
                    setLoading(false);
                    alert('An error happened. Please chack console!')
                })
        }, 700)
        return () => clearTimeout(timer);
    }, [])

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {
                loading ? (<div className='w-full flex justify-center items-center'>
                    <MoonLoader className='mt-50' size={100} />
                </div>) : (<table className='w-full border-separate border-spacing-2 '>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Title</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
                            <th className='border border-slate-600 rounded-md'>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {book.title}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {book.author}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {book.publishYear}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/books/details/${book._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800' />
                                        </Link>
                                        <Link to={`/books/edit/${book._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                                        </Link>
                                        <Link to={`/books/delete/${book._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600 ' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>)
            }
        </div>
    )
}

export default Home

// to={`/books/delete/${book._id}`}