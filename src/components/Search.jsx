import React, { useContext, useState } from 'react'
import {PROXY_URL} from '../utils/constants'
import {toast} from 'react-hot-toast'
import {PlayerContext} from '../utils/PlayerContext'
import { useNavigate } from 'react-router-dom';
import NavbarHome from './NavbarHome'

const Search = () => {

    const [search, setSearch] = useState("");
    const [totalData, setTotalData] = useState([]);
    const [loading, setLoading] = useState(false);

    const {playWithId } = useContext(PlayerContext);

    const navigate = useNavigate();

    const handleSearch = async ()=>{
        
        try {
            setLoading(true);
            const songResponse = await fetch(`${PROXY_URL}/api/song/search` , {
                method : 'POST' ,
                credentials : 'include',
                body : JSON.stringify({search}),
                headers : {'Content-Type' : 'application/json'},
            })


            const albumResponse = await fetch(`${PROXY_URL}/api/album/search` , {
                method : 'POST' ,
                credentials : 'include',
                body : JSON.stringify({search}),
                headers : {'Content-Type' : 'application/json'},
            })
            const songData = await songResponse.json();
            const albumData = await albumResponse.json();

            if (songData?.error) {
                setLoading(false);
                toast(songData.error);
                return;
              }
          
              if (albumData?.error) {
                setLoading(false);
                toast(albumData.error);
                return;
              }

              const combinedData = [...songData.message, ...albumData.message];
              setTotalData(combinedData);
              setLoading(false);


        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = async (id)=>{
        playWithId(id);
        try {
          const response = await fetch(`${PROXY_URL}/api/user/add-recent` , {
            method : 'POST' , 
            headers : {'Content-Type' : 'application/json'},
            credentials : 'include',
            body : JSON.stringify({id})
          })
    
          const data = await response.json();
          if (data?.error) {
            toast(data?.error);
            return;
          }
          // console.log(data.message);
    
    
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <div className="search max-w-6xl mx-auto">
        <NavbarHome/>
        <div className="box w-3/4 mx-auto flex items-center my-5">
        <input value={search} onChange={(e)=>{setSearch(e.target.value)}} type="text" className='p-2 w-full bg-transparent border border-slate-500' />
        <button onClick={handleSearch} className='p-2 bg-blue-600 text-white border border-blue-600'>search</button>
        </div>
        {
            loading ? <div className='grid place-items-center min-h-[80vh]'>
            <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
          </div> : <>
                     <div className='grid grid-cols-2 sm:grid-cols-3 text-left mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b> Title</p>
                <p className='hidden sm:block'>Description</p>
                <p className='text-center'>Type</p>
            </div>
            <hr />
            {totalData.length !== 0 ? totalData.map((item, index) => {
                return (
                    <div onClick={() => {
                        if (item?.album) {
                            handleClick(item._id)
                          } else {
                            // Navigate using useNavigate (assuming you have it imported)
                            navigate(`/album/${item?._id}`);
                          }
                    }} className='grid text-left grid-cols-2 sm:grid-cols-3  gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer' key={index}>
                        <p className='text-white flex items-center'>
                            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                            <img className='inline w-10 mr-5' src={item?.image} alt="" />
                            <span>{item?.name}</span>
                        </p>
                        <p className='text-[15px] hidden sm:block'>{item?.desc}</p>
                        <p className='text-[15px] text-center'>{item?.album ? "song" : "album"}</p>
                    </div>
            )}) : <h1 className='text-center my-10 font-bold text-xl'> Empty </h1>
        }
            </>
        }
    </div>
    
  )
}

export default Search