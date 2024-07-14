import React, { useState } from 'react'
import {assets} from '../assets/frontend-assets/assets'
import { FaArrowCircleRight } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { RiLogoutBoxLine } from "react-icons/ri";
import {toast} from 'react-hot-toast'
import {PROXY_URL} from '../utils/constants'

const Sidebar = () => {

    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();

    const toggleSidebar = ()=>{
        setIsActive(!isActive);
    }

    const logout = async ()=>{
        const response = await fetch(`${PROXY_URL}/api/user/logout` , {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            credentials : 'include'
        })

        const data = await response.json();
        if (response.ok) {
            toast(data.message);
            navigate("/login");
        }
    }

  return (
   <>
   <button className='duration-500 fixed text-5xl mt-5 z-30' onClick={toggleSidebar}>
        {
            isActive ? <FaArrowCircleLeft/> : <FaArrowCircleRight/>
        }
        </button>
    <div className={`sidebar fixed top-0 bottom-0 left-0 z-10 bg-[#121212] ${isActive ? 'translate-x-[0px]' : 'translate-x-[-100px] duration-500 lg:translate-x-[-300px]'}`}>
        <div className={`space-y-5`}>
        <div className={`top space-y-5 p-4 lg:p-5 mt-20`}>
            <Link to="/" className='flex justify-start items-center cursor-pointer space-x-1 hover:bg-[#ffffff2b] rounded-md'>
                <img src={assets.home_icon} className='w-8' alt="home-icon" />
                <p className='hidden lg:block font-bold'>HOME</p>
            </Link>
            <Link to="/search" className='flex justify-start items-center space-x-1 hover:bg-[#ffffff2b] rounded-md'>
                <img src={assets.search_icon} className='w-8' alt="search-icon" />
                <p className='hidden lg:block font-bold'>SEARCH</p>
            </Link>
        </div>
        <div className="lib">
        <div className='p-4 lg:p-4 flex justify-between items-center'>
                <div className='flex justify-start items-center space-x-1 hover:bg-[#ffffff2b] rounded-md'>
                <img src={assets.stack_icon} className='w-8' alt="lib-icon" />
                <p className='hidden lg:block font-bold'>Your Library</p>
                </div>
                <img src={assets.arrow_icon} className='w-8 lg:block hidden hover:bg-[#ffffff2b] rounded-md p-1' alt="arrow-icon" />
            </div>
            <div className="add">
            <img src={assets.plus_icon} className='w-8 mx-auto lg:hidden my-5 bg-blue-400 p-2 text-xl rounded-full' alt="plus-icon" />
           <div className="subclass hidden lg:block bg-[#242424] rounded-md mt-5 mx-2 px-3 py-2 space-y-2">
           <h1 className='text-lg font-bold'>Create New Playlist</h1>
            <p className=''>Its easy , we will help you</p>
            <button className='bg-white rounded-md p-1 hover:bg-[#ffffff2b] hover:text-white text-black'>Create Playlist</button>
           </div>
            </div>

           <div onClick={logout} className='flex justify-start lg:p-4 mt-20  items-center space-x-1 hover:bg-[#ffffff2b] rounded-md'>
           <RiLogoutBoxLine className='text-3xl mx-auto lg:mx-0'/>
            <p className='hidden lg:block font-bold cursor-pointer'>LOGOUT</p>
            </div>

        </div>
    </div>
    </div>
   </>
  )
}

export default Sidebar