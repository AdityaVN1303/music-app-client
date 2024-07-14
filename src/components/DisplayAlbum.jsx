import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/frontend-assets/assets'
import { useParams } from 'react-router-dom'
import NavbarHome from './NavbarHome';
import { PlayerContext } from '../utils/PlayerContext';
import { PROXY_URL } from '../utils/constants';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const DisplayAlbum = () => {

    const { id } = useParams();
    const [album, setAlbum] = useState({});
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [likeStatus, setLikeStatus] = useState(false);
    const [likeCount, setLikeCount] = useState(null);


    const {playWithId , displayRef} = useContext(PlayerContext);

    useEffect(() => {
      const getAlbum = async ()=>{
        try {
            setLoading(true);
            const response = await fetch(`${PROXY_URL}/api/album/single/${id}` , {
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
                displayRef.current.style.background = `linear-gradient(${data.message.bgColour},#121212)`
                setAlbum(data.message);
            }

            // console.log(album);
            for (let i=0; i<data.message?.likes?.length; i++) {
                if (data.message.likes[i] === data.userId) {
                    // console.log("done");
                  setLikeStatus(true);
                  return;
                }
              }
              setLikeStatus(false);

        } catch (error) {
            console.log(error);
        }
      }
      getAlbum();
    }, [])

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

    useEffect(() => {
        const getSongs = async ()=>{
          try {
              setLoading(true);
              const response = await fetch(`${PROXY_URL}/api/song/list` , {
                  credentials : 'include'
              });
              const data = await response.json();
            //   console.log(data);
              if (data.error) {
                  setLoading(false);
                  toast(response.error);
                  return;
              }
              if (data.message) {
                  setLoading(false);
              }
              const filteredSongs = data.message.filter((item)=>{ return item.album === album.name});
            //   console.log(filteredSongs);
              setSongs(filteredSongs);
              
  
          } catch (error) {
              console.log(error);
          }
        }
        getSongs();
      }, [album])



      const handleLikes = async ()=>{
        if (!likeStatus) {
          try {
            // const data = JSON.stringify({userId , id});
            // console.log(userId);
            const response = await fetch(`${PROXY_URL}/api/album/like/${album._id}` , {
              method : 'PUT',
              headers : {'Content-Type' : 'application/json'},
              credentials : 'include'
            })
            const answer = await response.json();
            if (answer.error) {
                toast(answer.error);
                return;
            }
            if (response.ok) {
                // console.log(answer);
                setLikeCount(answer.album.likes.length);
                setLikeStatus(true);
                toast("You Liked the Album !");
            }
      
          } catch (error) {
            console.log(error);
          }
        }
        else{
          try {
            // console.log(userId);
            const response = await fetch(`${PROXY_URL}/api/album/unlike/${album._id}` , {
              method : 'PUT',
              headers : {'Content-Type' : 'application/json'},
              credentials : 'include'
            })
            const answer = await response.json();
            if (answer.error) {
                toast(answer.error);
                return;
            }
            if (response.ok) {
                // console.log(answer);
                setLikeCount(answer.album.likes.length);
                setLikeStatus(false);
                toast("You Unliked the Album !");
            }
      
          } catch (error) {
            console.log(error);
          }
        }
      }
    

    return (
        <>
           {
            loading? <Spinner/> : <>
             <NavbarHome />
            <div className='mt-10 flex gap-8 px-3 flex-col md:flex-row md:items-end'>
                <img className='w-48 rounded' src={album?.image} alt="profile-img" />
                <div className='flex flex-col'>
                    <p>Playlist</p>
                    <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{album?.name}</h2>
                    <h4>{album?.desc}</h4>
                    <p className='mt-1 text-sm'><img className='inline-block w-5' src={assets.spotify_logo} alt="album-icon" /> <span className='space-x-2'><b>Spotify</b> <span>• <span className='inline-block w-2'>{likeCount}</span> likes</span> <b>• {songs.length} songs,</b>
                     
                       <span onClick={handleLikes}>
                        { likeStatus ? <FaHeart className='inline-block text-base'/>
                         :
                         <FaRegHeart className='inline-block text-base'/>}
                       </span>
                     
                     
                     </span></p>
                </div>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b> Title</p>
                <p className='hidden sm:block'>Album</p>
                <p className='hidden sm:block'>Description</p>
                <img className='m-auto w-4' src={assets.clock_icon} alt='' />
            </div>
            <hr />
            {songs.length !== 0 ? songs.map((item, index) => {
                return (
                    <div onClick={() => {handleClick(item._id)}} className='grid grid-cols-2 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer' key={index}>
                        <p className='text-white flex items-center'>
                            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                            <img className='inline w-10 mr-5' src={item?.image} alt="" />
                            <span>{item?.name}</span>
                        </p>
                        <p className='text-[15px] hidden sm:block'>{item?.album}</p>
                        <p className='text-[15px] hidden sm:block'>{item?.desc}</p>
                        <p className='text-[15px] text-center'>{item?.duration}</p>
                    </div>
            )}) : <h1 className='text-center my-10 font-bold text-xl'>No Songs in Current Album </h1>
        }
            </>
           }
        </>
    )
}



export default DisplayAlbum