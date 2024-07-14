import React, { useEffect, useState } from 'react'
import NavbarHome from './NavbarHome'
import SongItem from './SongItem'
import AlbumItem from './AlbumItem'
import { songsData } from '../assets/frontend-assets/assets'
import { PROXY_URL } from '../utils/constants'
import {toast} from 'react-hot-toast'
import Spinner from './Spinner'


const BodyHome = ({User}) => {

  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getSongs = async ()=>{
      try {
        setloading(true);
        const response = await fetch(`${PROXY_URL}/api/song/list` , {
          credentials : 'include'
        })
        const data = await response.json();
        // console.log(data.message);

        if (data?.error) {
          setloading(false);
          toast("Cannot Get Songs Right Now !");
          return;
        }

        if (data.message) {
          setloading(false);
          setSongs(data.message);
        }

      } catch (error) {
        console.log(error);
      }
    }
    getSongs();
  }, [])

  useEffect(() => {
    const getAlbums = async ()=>{
      try {
        setloading(true);
        const response = await fetch(`${PROXY_URL}/api/album/list` , {
          credentials : 'include'
        })
        const data = await response.json();
        // console.log(data.message);

        if (data?.error) {
          setloading(false);
          toast("Cannot Get Albums Right Now !");
          return;
        }

        if (data.message) {
          setloading(false);
          setAlbums(data.message);
        }

      } catch (error) {
        console.log(error);
      }
    }
    getAlbums();
  }, [])
  
  
  return (
    <>
    {
      loading ? <Spinner/> : <>
      <NavbarHome/>
      { User?.recentSongs.length !== 0 &&
        <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Recently Played</h1>
        <div className='flex overflow-auto'>
            {User?.recentSongs?.slice().reverse().map((item, index) => (<SongItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />))}
        </div>
</div>
      }

    <div className='mb-4'>
                <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
                <div className='flex overflow-auto'>
                    {albums.map((item, index) => (<AlbumItem key={index} name={item.name} desc={item.desc} image={item.image} id={item._id} />))}
                </div>
    </div>
    <div className='mb-4'>
                <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
                <div className='flex overflow-auto'>
                    {songs.map((item, index) => (<SongItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />))}
                </div>
    </div>
      </>
    }
    </>
  )
}

export default BodyHome