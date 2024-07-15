import React from 'react'
import { Link } from 'react-router-dom'

const LikedAlbums = ({user}) => {
  return (
    <div className="my-area space-y-10">
            {
             user?.likedPosts.length !== 0 ?  user?.likedPosts?.map((item, index) => {
                return (
                    <Link to={`/album/${item?._id}`} className='grid grid-cols-2 sm:grid-cols-2 text-center gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer' key={index}>
                        <p className='text-white flex items-center'>
                            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                            <img className='inline w-10 h-10 object-cover mr-5' src={item?.image} alt="" />
                            {item?.name}
                        </p>
                        <p className='text-[15px]'>{item?.desc}</p>
                    </Link>
                )
            }) : <h1 className='text-center font-bold text-xl'>You haven't Liked Any Albums</h1>
        }
           
        </div>
  )
}

export default LikedAlbums