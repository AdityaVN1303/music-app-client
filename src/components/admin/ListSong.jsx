import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { PROXY_URL } from '../../utils/constants';
import { MdDeleteOutline } from "react-icons/md";
import Spinner from '../Spinner'
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ListSong = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSongs = async () => {
    try {

      const response = await fetch(`${PROXY_URL}/api/song/list` , {
        credentials : 'include'
      });

      const data = await response.json();
      // console.log(data);

      if (data?.message) {
        setData(data?.message);
      }
      else{
        toast(data?.error);
        return;
      }

    } catch (error) {
      toast.error("Error occur");
    }
  }

  const removeSong = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${PROXY_URL}/api/song/remove`, {
        method : 'POST', 
        body : JSON.stringify({id}) , 
        credentials : 'include',
        headers : {'Content-Type' : 'application/json'},
        });

        const data = await response.json();
        console.log(data);
      if (data?.message) {
        setLoading(false);
        toast(data?.message);
        fetchSongs();
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
    fetchSongs();
  }, [])

  return (
   <>
   {
    loading ? <Spinner/> :  <div>
    <p>All Songs List</p>
    <br />
    <div>
      <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
        <b>Image</b>
        <b>Name</b>
        <b>Album</b>
        <b>Duration</b>
        <b>Action</b>
      </div>
      {data.map((item, index) => {
        return (
          <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
            <img className='w-12 h-12 object-cover' src={item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.album}</p>
            <p>{item.duration}</p>
            <div className='flex items-center space-x-2'>
            <p className='cursor-pointer' onClick={()=>removeSong(item._id)}><MdDeleteOutline className='bg-red-800 text-white text-xl p-1 box-content rounded-md'/></p>
            <Link to={`/admin/edit-song/${item._id}`} className='cursor-pointer'><FaRegEdit className='bg-red-800 text-white text-xl p-1 box-content rounded-md'/></Link>
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

export default ListSong
