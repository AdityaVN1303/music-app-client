import React, { useState } from 'react'
import {PROXY_URL} from '../utils/constants'
import {toast} from 'react-hot-toast'
import NavbarHome from './NavbarHome'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { useParams } from 'react-router-dom'

const addPlaylistSongs = () => {

    const {id} = useParams();

    const [search, setSearch] = useState("");
    const [totalData, setTotalData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async ()=>{
        
        try {
            setLoading(true);
            const songResponse = await fetch(`${PROXY_URL}/api/song/search` , {
                method : 'POST' ,
                credentials : 'include',
                body : JSON.stringify({search}),
                headers : {'Content-Type' : 'application/json'},
            })

            const songData = await songResponse.json();

            if (songData?.error) {
                setLoading(false);
                toast(songData.error);
                return;
              }

              setTotalData(songData.message);
              setLoading(false);


        } catch (error) {
            console.log(error);
        }
    }
    
    const addSong = async (songId)=>{
        try {
            const response = await fetch(`${PROXY_URL}/api/playlist/add-song/${id}` , {
                method : 'PUT' , 
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({id : songId}),
                credentials : 'include'
            })
            const data = await response.json();
            if(data?.error){
                toast(data.error);
                return;
            }
            // console.log(data.message);
            toast(data.message);
        } catch (error) {
            
        }
    }

  return (
    <div className="search max-w-6xl mx-auto text-center">
        <NavbarHome/>
        <div className="box w-3/4 mx-auto flex items-center my-5">
        <input value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder='search songs to add' type="text" className='p-2 w-full bg-transparent border border-slate-500' />
        <button onClick={handleSearch} className='p-2 bg-blue-600 text-white border border-blue-600'>search</button>
        </div>
        {
            loading ? <div className='grid place-items-center min-h-[80vh]'>
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
          </div> : <>
                     <div className='grid grid-cols-2 sm:grid-cols-3 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b> Title</p>
                <p className='hidden sm:block'>Description</p>
                <p className=''>Action</p>
            </div>
            <hr />
            {totalData.length !== 0 ? totalData.map((item, index) => {
                return (
                    <div className='grid justify-center grid-cols-2 sm:grid-cols-3  gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer' key={index}>
                        <p className='text-white flex items-center text-center mx-auto'>
                            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                            <img className='inline w-10 mr-5' src={item?.image} alt="" />
                            <span>{item?.name}</span>
                        </p>
                        <p className='text-[15px] hidden sm:block'>{item?.desc}</p>
                        <button onClick={()=>{addSong(item?._id)}} className='text-[15px] mx-auto '><IoMdAddCircleOutline className='text-xl'/></button>
                    </div>
            )}) : <h1 className='text-center my-10 font-bold text-xl'> Empty </h1>
        }
            </>
        }
    </div>
    
  )
}

export default addPlaylistSongs