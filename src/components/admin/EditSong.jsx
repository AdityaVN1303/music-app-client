import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/admin-assets/assets'
import {toast} from 'react-hot-toast'
import { PROXY_URL } from '../../utils/constants';
import { useParams } from 'react-router-dom';

const EditSong = () => {

  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);

  const [albums, setAlbums] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    const getSong = async ()=>{
      const response = await fetch(`${PROXY_URL}/api/song/single/${id}` , {
        credentials : 'include'
      })

      const data = await response.json();
      if (data?.error) {
        toast(data.error);
        return;
      }
      // console.log(data.message);
      setName(data.message.name);
      setAlbum(data.message.album);
      setDesc(data.message.desc);
      const imgRes = await fetch(data.message.image);
      const blob = await imgRes.blob();
      setImage(blob);
      setSong(data.message.file);

    }
    getSong();
  }, [id])
  

  useEffect(() => {
    const getAlbums = async ()=>{
      try {
        setLoading(true);
        const response = await fetch(`${PROXY_URL}/api/album/list` , {
          credentials : 'include'
        })
        const data = await response.json();
        // console.log(data.message);

        if (data?.error) {
          setLoading(false);
          toast("Cannot Get Albums Right Now !");
          return;
        }

        if (data.message) {
          setLoading(false);
          setAlbums(data.message);
        }

      } catch (error) {
        console.log(error);
      }
    }
    getAlbums();
  }, [])

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("audio", song);
      formData.append("album", album);
      formData.append("id" , id);

      const response = await fetch(`${PROXY_URL}/api/song/update`, {
        method : 'POST', 
        credentials : 'include', 
        body : formData
      });

      const data = await response.json();

      if (data?.message) {
        toast.success("Song Updated !");
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(false);
        setSong(false);
        setLoading(false);
      }
      else {
        toast.error(data?.error);
        setLoading(false);
        return;
      }

    } catch (error) {

      toast.error("Error occured");
      setLoading(false);

    }

  }

  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>

      <div className='flex gap-8'>
        <div className="flex flex-col gap-4">
          <p>Upload song</p>
          <input onChange={(e) => setSong(e.target.files[0])} type="file" id='song' accept='audio/*' hidden />
          <label htmlFor="song">
            <img className='w-24 cursor-pointer' src={song ? assets.upload_added : assets.upload_song} alt="" />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
          <label htmlFor="image">
            <img className='w-24 cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song name</p>
        <input className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Type here' required />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song description</p>
        <input className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' onChange={(e) => setDesc(e.target.value)} value={desc} type="text" placeholder='Type here' required />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]' onChange={(e) => setAlbum(e.target.value)} value={album}>
          <option value="none">None</option>
          {albums.map((item, index) => (<option key={index} value={item.name}>{item.name}</option>))}
        </select>
      </div>

      <button className='text-base bg-black text-white py-2.5 px-14 cursor-pointer' type='submit'>UPDATE</button>
    </form>
  )
}

export default EditSong
