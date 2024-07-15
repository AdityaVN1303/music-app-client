import React, { useState } from 'react'
import { assets } from '../assets/admin-assets/assets'
import { PROXY_URL } from '../utils/constants';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import NavbarHome from './NavbarHome'

const CreatePlaylist = () => {

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const navigate = useNavigate();

    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        try {


      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);

            const response = await fetch(`${PROXY_URL}/api/playlist/add` , {
                method : 'POST' , 
                credentials : 'include' , 
                body : formData
            })

            const data = await response.json();
            if (data?.error) {
                toast(data?.error);
                return;
            }
            console.log(data);
            toast(data.message);
            navigate("/");

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="create max-w-3xl mx-auto">
      <NavbarHome/>
    {
        loading ? <div className='grid place-items-center min-h-[80vh]'>
        <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
      </div> : <form onSubmit={onSubmitHandler} className='flex flex-col mt-10 items-center gap-8 text-gray-600'>

        <div className='flex gap-8'>
      <div className="flex flex-col gap-4">
        <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
        <label htmlFor="image">
          <img className='w-24 h-24 object-cover cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
        </label>
      </div>
        </div>
    
      <input className='bg-transparent text-white outline-green-600 border-2 border-gray-400 p-2.5 w-3/4' onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Title' required />
    
      <input className='bg-transparent text-white outline-green-600 border-2 border-gray-400 p-2.5 w-3/4' onChange={(e) => setDesc(e.target.value)} value={desc} type="text" placeholder='Description' required />
    
    <button className='text-base bg-black border border-slate-500 rounded-md hover:bg-slate-500 duration-50 text-white py-2.5 px-14 cursor-pointer' type='submit'>Create Playlist</button>
    </form>
    }
    </div>
  )
}

export default CreatePlaylist