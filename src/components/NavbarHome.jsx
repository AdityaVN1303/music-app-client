import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/frontend-assets/assets';
import { PROXY_URL } from '../utils/constants';

const DisplayNav = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    
  useEffect(() => {
    const getMe = async ()=>{
      const response = await fetch(`${PROXY_URL}/api/user/me` , {
        credentials : 'include'
      });
      const data = await response.json();
      // console.log(data);
      if (response.ok) {
        setUser(data);
      }

      if (data.error) {
        navigate("/login");
      }

    }
    getMe();
  }, [])

    return (
        <>
            <div className='w-full  flex justify-center space-x-10 items-center font-semibold px-5'>
                <div className='flex items-center gap-2'>
                    <img onClick={() => navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="left-img" />
                    <img onClick={() => navigate(1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="right-img" />
                </div>
                <div className='flex items-center gap-4'>
                    <Link to="/profile" className='bg-purple-500 text-black cursor-pointer w-10 h-10 rounded-full flex items-center justify-center'><img className='w-full h-full object-cover rounded-full' src={user?.profileImg ? user?.profileImg : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="profile-img" /></Link>
                </div>
            </div>
        </>
    )
}

export default DisplayNav