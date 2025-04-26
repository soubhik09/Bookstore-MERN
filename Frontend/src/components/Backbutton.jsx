import React from 'react'
import { FaAnglesLeft } from "react-icons/fa6";
import { Link } from 'react-router';

function Backbutton({ destination = '/' }) {
    return (
        <div className='flex'>
        <Link to={destination} className='bg-sky-300 text-white px-4 py-1 rounded-full w-fit'><FaAnglesLeft className='text-2xl' /></Link>
        </div>
    )
}

export default Backbutton