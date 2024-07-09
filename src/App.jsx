import Sidebar from "./components/Sidebar"
import Body from "./components/Body"
import Player from "./components/Player"
import { useContext } from "react"
import { PlayerContext } from "./utils/PlayerContext"

function App() {

  const {audioRef , track} = useContext(PlayerContext);

  return (
   <>
   <div className='app bg-black font-abc text-white'>
    <Sidebar/>
    <Body/>
   </div>
   <Player/>
   <audio ref={audioRef} src={track.file} preload="auto"></audio>
   </>
  )
}

export default App
