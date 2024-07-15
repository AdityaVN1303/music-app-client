import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'

const Playlist = ({playlist}) => {

    const navigate = useNavigate();

    const handleNavigate = (item)=>{
        navigate(`/playlist/${item?._id}`);
    }

  return (
    <div className="my-area space-y-10">
            {
             playlist?.length !== 0 ?  playlist?.map((item, index) => {
                return (
                    <div key={index} className='grid grid-cols-2 sm:grid-cols-3 text-center gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                        <p onClick={()=>{handleNavigate(item)}} className='text-white flex items-center'>
                            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                            <img className='inline w-10 h-10 object-cover mr-5' src={item?.image} alt="" />
                            {item?.name}
                        </p>
                        <p onClick={()=>{handleNavigate(item)}} className='text-[15px] hidden sm:block'>{item?.desc}</p>
                        <p className='text-[15px] flex items-center space-x-5 justify-center'>
                            <Link to={`/playlist/add-song/${item?._id}`}><IoMdAddCircleOutline className='text-xl hover:bg-black p-1 rounded-md box-content'/></Link>
                            <Link to={`/playlist/update/${item?._id}`}><FaRegEdit className='text-xl hover:bg-black p-1 rounded-md box-content'/></Link>
                        </p>
                    </div>
                )
            }) : <h1 className='text-center font-bold text-xl'>You do not have any Playlists !</h1>
        }
           
        </div>
  )
}

export default Playlist