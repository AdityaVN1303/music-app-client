import Body from "./components/Body"
import Register from './components/Register'
import Login from './components/Login'
import { useContext} from "react"
import { PlayerContext } from "./utils/PlayerContext"
import { Route , Routes } from "react-router-dom"
import {Toaster} from 'react-hot-toast'

function App() {

  const {audioRef , track , songList} = useContext(PlayerContext);

  return (
   <>
   {
    songList?.length !== 0 && 
    <>
    <div className='app bg-black font-abc text-white'>
    <Routes>
        <Route path='/*' element={<Body/>}/> 
        <Route path='/signup' element={<Register/>}/> 
        <Route path='/login' element={<Login/>}/>
    </Routes>
   </div>
   <audio ref={audioRef} src={track ? track.file : ""} preload="auto"></audio>
   <Toaster/>
    </>
  
   }
   </>
  )
}

export default App
