import React, { useState } from 'react'
import axios from 'axios'
import { MoonLoader } from "react-spinners";
import Backbutton from '../components/Backbutton'
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

function EditBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    setLoading(true)
    axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then((res) => {
        setTitle(res.data.title)
        setAuthor(res.data.author)
        setPublishYear(res.data.publishYear)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        alert('An error happende. Please chack console!')
        console.log(error);
      })
  }, [])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    if (!data.title, !data.author, !data.publishYear) {
      alert("Input fields are missing!")
      setLoading(false);
      return
    } else {
      setLoading(true);
      axios.put(`${import.meta.env.VITE_API_URL}/books/${id}`, data)
        .then((res) => {
          setLoading(false);
          navigate('/')
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          alert('An error happened. Please chack console!')
        })
    }

  }

  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3xl my-4 text-center'>Edit Book</h1>
      {loading && <MoonLoader />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 mt-4 mx-30 cursor-pointer' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook;