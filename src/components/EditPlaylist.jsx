import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/frontend-assets/assets'
import { useNavigate, useParams } from 'react-router-dom'
import NavbarHome from './NavbarHome';
import { PROXY_URL } from '../utils/constants';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const DisplayPlaylist = () => {

    const { id } = useParams();
    const [playlist, setPlaylist] = useState({});
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [image, setImage] = useState("");

    const navigate = useNavigate();

    const getPlaylist = async ()=>{
        try {
            setLoading(true);
            const response = await fetch(`${PROXY_URL}/api/playlist/single/${id}` , {
                credentials : 'include'
            });
            const data = await response.json();
            // console.log(data);
            if (data.error) {
                setLoading(false);
                toast(response.error);
                return;
            }
            if (data.message) {
                setLoading(false);
                setPlaylist(data.message);
                setName(data.message.name);
                setDesc(data.message.desc);
                const imgRes = await fetch(data.message.image);
                const blob = await imgRes.blob();
                setImage(blob);
            }

        } catch (error) {
            console.log(error);
        }
      }

    useEffect(() => {
      getPlaylist();
    }, [])

    const deletePlaylist = async ()=>{
        try {
            setLoading(true);
            const response = await fetch(`${PROXY_URL}/api/playlist/remove` , {
                method : 'POST',
                credentials : 'include', 
                body : JSON.stringify({id}), 
                headers : {'Content-Type' : 'application/json'},
            })

            const data = await response.json();

            if (data?.error) {
                setLoading(false);
                toast(data.error);
                return;
            }
            setLoading(false);
            toast(data.message);
            navigate("/profile");

        } catch (error) {
            console.log(error);
        }
    }

    const editPlaylist = async ()=>{
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("desc", desc);
            formData.append("image", image);
            formData.append("id" , id);
            const response = await fetch(`${PROXY_URL}/api/playlist/update` , {
                method : 'POST' , 
                credentials : 'include' , 
                body : formData
            })

            const data = await response.json();
            if (data?.error) {
                toast(data.error);
                setLoading(false);
                return;
            }
            setLoading(false);
            toast(data.message);
            console.log(data.message);
            navigate("/profile")

        } catch (error) {
            console.log(error);
        }
    }

    const removeSong = async (songId)=>{
        try {
            const response = await fetch(`${PROXY_URL}/api/playlist/remove-song/${id}` , {
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
            getPlaylist();
        } catch (error) {     
        }
    }
    

    return (
        <>
           {
            loading? <Spinner/> : <>
             <NavbarHome />
            <div className='mt-5 flex gap-8 px-3 flex-col'>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
        <label htmlFor="image">
        <img className='w-48 rounded cursor-pointer' src={image && URL.createObjectURL(image)} alt="profile-img" />
        </label>
                <div className='flex flex-col'>
                    <p>Playlist</p>

                    <input onChange={(e)=>{setName(e.target.value)}} type="text" className='p-3 bg-transparent text-white border border-slate-500 rounded-md w-full md:w-2/4 my-2' placeholder='name' value={name} />
                    <input onChange={(e)=>{setDesc(e.target.value)}} type="text" className='p-3 bg-transparent text-white border border-slate-500 rounded-md w-full md:w-2/4 mb-2' placeholder='description' value={desc} />
                    <button onClick={editPlaylist} className='bg-blue-500 hover:bg-blue-800 text-white rounded-md p-2 my-2 md:w-1/6'>Update Playlist</button>
                    <button onClick={deletePlaylist} className='bg-red-700 hover:bg-black text-white rounded-md p-2 my-2 md:w-1/6'>Delete Playlist</button>

                    <p className='mt-1 text-sm'><img className='inline-block w-5' src={assets.spotify_logo} alt="album-icon" /> <span className='space-x-2'><b>Spotify</b><b>• {playlist?.songs?.length} songs,</b>           
                     </span></p>
                </div>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b> Title</p>
                <p className='hidden sm:block'>Album</p>
                <p className='hidden sm:block'>Description</p>
                <p className='text-center'>Action</p>
            </div>
            <hr />
            {playlist?.songs?.length !== 0 ? playlist?.songs?.map((item, index) => {
                return (
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer' key={index}>
                        <p className='text-white flex items-center'>
                            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                            <img className='inline w-10 mr-5' src={item?.image} alt="" />
                            <span>{item?.name}</span>
                        </p>
                        <p className='text-[15px] hidden sm:block'>{item?.album}</p>
                        <p className='text-[15px] hidden sm:block'>{item?.desc}</p>
                        <button onClick={()=>{removeSong(item?._id)}} className='text-[15px] text-center mx-auto'><IoIosCloseCircleOutline className='text-xl hover:bg-black p-1 box-content rounded-md'/></button>
                    </div>
            )}) : <h1 className='text-center my-10 font-bold text-xl'>No Songs in Current Playlist </h1>
        }
            </>
           }
        </>
    )
}



export default DisplayPlaylist