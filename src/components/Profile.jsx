import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegEdit, FaRegUser } from 'react-icons/fa'
import NavbarHome from './NavbarHome'
import { differenceInDays } from 'date-fns';
import LikedAlbums from './LikedAlbums';
import Playlist from './Playlist';
import { PROXY_URL } from '../utils/constants';
import {toast} from 'react-hot-toast'

const Profile = ({user}) => {

    const [playlist, setPlaylist] = useState([]);
    const [feedType, setFeedType] = useState("albums");

    // console.log(user);
    const timestamp = new Date(user?.createdAt);
    const today = new Date();
    const daysAgo = Math.floor(differenceInDays(today, timestamp));

    useEffect(() => {
      const getPlaylist = async ()=>{
        try {
            const response = await fetch(`${PROXY_URL}/api/playlist/list` , {
                credentials : 'include'
            })
            const data = await response.json();

            if (!response.ok) {
                // toast(data.error);
                return;
            }

            // console.log(data?.message);
            setPlaylist(data.message);

        } catch (error) {
            console.log(error);
        }
      }
      getPlaylist();
    }, []);

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
        <div className='mt-10'>
        <div className='top flex w-full border-b border-gray-700'>
					<div
						className={
							"flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
						}
						onClick={() => setFeedType("albums")}
					>
						LikedAlbums
						{feedType === "albums" && (
							<div className='absolute bottom-0 w-10  h-1 rounded-full bg-blue-500'></div>
						)}
					</div>
					<div
						className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative'
						onClick={() => setFeedType("playlists")}
					>
						My Playlists
						{feedType === "playlists" && (
							<div className='absolute bottom-0 w-10  h-1 rounded-full bg-blue-500'></div>
						)}
					</div>
		</div>
        <div className="bottom my-8">
            {
                feedType === "albums" ? <LikedAlbums user={user}/> : <Playlist playlist={playlist}/>
             }
        </div>

        </div>
    </div>
    </>
  )
}

export default Profile