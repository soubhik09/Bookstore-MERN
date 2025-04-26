import React, { useState } from 'react'
import axios from 'axios'
import Backbutton from '../components/Backbutton'
import { MoonLoader } from "react-spinners";
import { useNavigate, useParams } from 'react-router';

function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        console.log(error);
        alert('An error happened. Please chack console!')
      })
  }
  return (
    <div className='p-4 flex flex-col justify-center'>
      <Backbutton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading && <MoonLoader />}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure, want to delete this book?</h3>
      </div>
      <button className='p-4 bg-red-600 w-fit m-auto mt-10 text-white rounded-xl font-bold cursor-pointer ' onClick={handleDeleteBook}>Yes! delete it</button>
    </div>
  )
}

export default DeleteBook