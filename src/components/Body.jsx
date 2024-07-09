import React, { useEffect, useRef } from 'react'
import {Routes , Route, useLocation} from 'react-router-dom'
import BodyHome from './BodyHome'
import DisplayAlbum from './DisplayAlbum'
import { albumsData } from '../assets/frontend-assets/assets'

const Body = () => {

  const displayRef = useRef();
  const location = useLocation();
  let isAlbum = location.pathname.includes("album");
  let albumId = isAlbum ? location.pathname.slice(-1) : ""
  let bgColor = albumsData[Number(albumId)].bgColor;

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    }
    else {
      displayRef.current.style.background = "#121212";
    }
  })

  return (
    <div ref={displayRef} className='col-span-6 py-10 px-2'>
    <Routes>
        <Route path='/' element={<BodyHome/>}/> 
        <Route path='/album/:id' element={<DisplayAlbum/>}/> 
    </Routes>
    </div>
  )
}

export default Body