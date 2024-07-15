import React, { useContext, useEffect, useRef, useState } from 'react'
import {Routes , Route, useLocation, useNavigate} from 'react-router-dom'
import BodyHome from './BodyHome'
import DisplayAlbum from './DisplayAlbum'
import { PROXY_URL } from '../utils/constants'
import Sidebar from './Sidebar'
import Player from './Player'
import EditProfile from './EditProfile'
import Profile from './Profile'
import { PlayerContext } from '../utils/PlayerContext'
import AdminPanel from './admin/AdminPanel'

import AddSong from './admin/AddSong';
import ListSong from './admin/ListSong';
import AddAlbum from './admin/AddAlbum';
import ListAlbum from './admin/ListAlbum';
import Home from './admin/Home';
import EditAlbum from './admin/EditAlbum'
import EditSong from './admin/EditSong'
import Search from './Search'
import Playlist from './Playlist'
import DisplayPlaylist from './DisplayPlaylist'
import AddPlaylistSongs from './AddPlaylistSongs'
import EditPlaylist from './EditPlaylist'
import CreatePlaylist from './CreatePlaylist'

const Body = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const {displayRef} = useContext(PlayerContext);

  const location = useLocation();
  const isAlbum = location.pathname.includes('/admin');

  useEffect(() => {
    const getMe = async ()=>{
      const response = await fetch(`${PROXY_URL}/api/user/me` , {
        credentials : 'include',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
      }
      });
      const data = await response.json();
      // console.log(data);
      if (data.error) {
        navigate("/login");
        return;
      }
      setUser(data);
    }
    getMe();
  } , [])


  return (
    <>
    {!isAlbum && <Sidebar/>}
    <div ref={displayRef} className='col-span-6 py-10 px-2 min-h-screen'>
    <Routes>
        <Route path='/' element={<BodyHome User={user}/>}/> 
        <Route path='/profile' element={<Profile user={user}/>}/>
        <Route path='/update' element={<EditProfile/>}/> 
        <Route path='/playlist/update/:id' element={<EditPlaylist/>}/>
        <Route path='/create-playlist' element={<CreatePlaylist/>}/>
        <Route path='/album/:id' element={<DisplayAlbum/>}/> 
        <Route path='/playlist/:id' element={<DisplayPlaylist/>}/> 
        <Route path='/playlist/add-song/:id' element={<AddPlaylistSongs/>}/> 
        <Route path='/search' element={<Search/>}/> 
        <Route path='/playlists' element={<Playlist/>}/> 
        {user?.isAdmin && 
        <Route path="/admin" element={<AdminPanel/>}>
            <Route index path="/admin" element={<Home/>} />
            <Route path="/admin/add-song" element={<AddSong/>} />
            <Route path="/admin/list-songs" element={<ListSong/>} />
            <Route path="/admin/add-album" element={<AddAlbum/>} />
            <Route path="/admin/list-albums" element={<ListAlbum/>} />
            <Route path="/admin/edit-album/:id" element={<EditAlbum/>} />
            <Route path="/admin/edit-song/:id" element={<EditSong/>} />
      </Route>
        }

    </Routes>
    </div>
    { !isAlbum && <Player/>}
    </>
  )
}

export default Body