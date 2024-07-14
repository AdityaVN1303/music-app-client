import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast'
import {PROXY_URL} from '../../utils/constants'
import { MdDeleteOutline } from "react-icons/md";
import Spinner from '../Spinner';
import { FaHeart, FaRegEdit } from 'react-icons/fa';
import {Link} from 'react-router-dom'

const ListAlbum = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAlbums = async () => {
    try {

      const response = await fetch(`${PROXY_URL}/api/album/list` , {
        credentials : 'include'
      });

      const data = await response.json();

      if (data?.message) {
        setData(data.message);
      }
      else{
        toast(data?.error);
        return;
      }

    } catch (error) {
      toast.error("Error occur");
    }
  }

  const removeAlbum = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${PROXY_URL}/api/album/remove`, {
        method : 'POST' ,
        body : JSON.stringify({id}) ,
        headers : {'Content-Type' : 'application/json'},
        credentials : 'include'

      });

      const data = await response.json();
      if (data?.message) {
        setLoading(false);
        toast.success(response.data.message);
        fetchAlbums();
      }
      else{
        setLoading(false);
        toast(data?.error);
        return;
      }

    } catch (error) {
      toast.error("Error occur")
    }
  }

  useEffect(() => {
    fetchAlbums();
  }, [])

  return (
   <>
   {
    loading ? <Spinner/> :  <div>
    <p>All Albums List</p>
    <br />
    <div className=''>
      <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
        <b>Image</b>
        <b>Name</b>
        <b>Likes</b>
        <b>Album Colour</b>
        <b>Action</b>
      </div>
      {data.map((item, index) => {
        return (
          <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
            <img className='w-12 h-12 object-cover' src={item.image} alt="" />
            <p>{item.name}</p>
            <p className='flex space-x-2 items-center'><span>{item.likes.length}</span> <FaHeart/></p>
            <input type="color" value={item.bgColour} />
            <div className='flex items-center space-x-2'>
            <p className='cursor-pointer' onClick={() => removeAlbum(item._id)}><MdDeleteOutline className='bg-red-800 text-white text-xl p-1 box-content rounded-md'/></p>
            <Link to={`/admin/edit-album/${item._id}`} className='cursor-pointer'><FaRegEdit className='bg-red-800 text-white text-xl p-1 box-content rounded-md'/></Link>
            </div>
            
          </div>
        )
      })}
    </div>
  </div>
   }
   </>
  )
}

export default ListAlbum
