import React from 'react'
import { assets } from '../../assets/admin-assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { RiLogoutBoxLine } from "react-icons/ri";
import toast from 'react-hot-toast';
import { PROXY_URL } from '../../utils/constants';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const navigate = useNavigate();

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
        <div className='bg-[#003A10] min-h-screen pl-[4vw]'>

            <Link to="/"><img src={assets.logo}  alt="" className="mt-5 w-[max(10vw,100px)] hidden sm:block" /></Link>
            <Link to="/"><img src={assets.logo_small} alt="" className="mt-5 w-[max(5vw,40px)] mr-5 sm:hidden block" /></Link>

            <div className="flex flex-col gap-5 mt-10">

                <NavLink to='/admin/add-song' className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium">
                    <img className='w-5' src={assets.add_song} alt="" />
                    <p className='hidden sm:block'>Add Song</p>
                </NavLink>

                <NavLink to='/admin/list-songs' className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium">
                    <img className='w-5' src={assets.song_icon} alt="" />
                    <p className='hidden sm:block'>List Songs</p>
                </NavLink>

                <NavLink to='/admin/add-album' className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium">
                    <img className='w-5' src={assets.add_album} alt="" />
                    <p className='hidden sm:block'>Add Album</p>
                </NavLink>

                <NavLink to='/admin/list-albums' className="flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium">
                    <img className='w-5' src={assets.album_icon} alt="" />
                    <p className='hidden sm:block'>List Album</p>
                </NavLink>

                <NavLink onClick={logout} className="flex mt-52 items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium">
                    <RiLogoutBoxLine className='text-xl'/>
                    <p className='hidden sm:block'>Logout</p>
                </NavLink>

            </div>
        </div>
    )
}

export default Sidebar