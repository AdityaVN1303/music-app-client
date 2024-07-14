import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegEdit, FaRegUser } from 'react-icons/fa'
import NavbarHome from './NavbarHome'
import { differenceInDays } from 'date-fns';

const Profile = ({user}) => {

    // console.log(user);
    const timestamp = new Date(user.createdAt);
    const today = new Date();
    const daysAgo = Math.floor(differenceInDays(today, timestamp));

  return (
    <>
    <NavbarHome/>
    <div className="dashboard max-w-5xl mx-auto my-10 px-5">
        {
            user && <div className="info flex justify-center space-x-10 items-center">
            <img src={user?.profileImg ?  user?.profileImg : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="user-img" className='w-20 h-20 object-cover rounded-full' />
            <div className="user-info">
                <h1 className='font-bold text-xl'>{user?.username} {user?.isAdmin && <span className='bg-yellow-500 text-white px-1 text-sm mx-3'>Admin</span> }</h1>
                <h2 className='font-semibold text-lg'>{user?.email}</h2>
                <p className='text-sm'>Joined {daysAgo} days ago</p>
                <div className='flex items-center justify-between space-x-3'>
                <button className='bg-blue-500 text-white px-1 mt-2 '><Link className='flex space-x-1 items-center' to="/update"><FaRegEdit className='cursor-pointer'/><span>Edit Profile</span></Link></button>
                {
                    user?.isAdmin && <button className='bg-blue-500 text-white px-1 mt-2 '><Link className='flex space-x-1 items-center' to="/admin"><FaRegUser className='cursor-pointer'/><span>Admin Panel</span></Link></button>
                }
                </div>
            </div>
        </div>
        }
        <div className="my-blogs mt-10 space-y-10">
            <h1 className='font-bold text-3xl mb-10'>My Liked Albums</h1>
            {
             user?.likedPosts.length !== 0 ?  user?.likedPosts?.map((item, index) => {
                return (
                    <Link to={`/album/${item?._id}`} className='grid grid-cols-3 sm:grid-cols-2 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer' key={index}>
                        <p className='text-white'>
                            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                            <img className='inline w-10 mr-5' src={item?.image} alt="" />
                            {item?.name}
                        </p>
                        <p className='text-[15px]'>{item?.desc}</p>
                    </Link>
                )
            }) : <h1 className='text-center font-bold text-xl'>You haven't Liked Any Albums</h1>
        }
           
        </div>
    </div>
    </>
  )
}

export default Profile