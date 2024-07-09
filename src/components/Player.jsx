import { useContext } from 'react'
import { assets } from '../assets/frontend-assets/assets'
import { PlayerContext } from '../utils/PlayerContext'

const Player = () => {

    const {play , pause , playStatus , track , time , seekBar , seekBg , previous , next , seekSong} = useContext(PlayerContext);

    return (
        <div className='sticky bottom-0 left-0 right-0 py-3 bg-black flex justify-between items-center text-white px-4'>
            <div className='hidden items-center gap-4 lg:flex'>
                <img className='w-12' src={track.image} alt="song-img" />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0, 12)}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className='flex gap-4'>
                    <img className='w-5 cursor-pointer' src={assets.shuffle_icon} alt="" />
                    <img onClick={previous} className='w-5 cursor-pointer' src={assets.prev_icon} alt="" />
                     { !playStatus ?
                        <img onClick={play} className='w-5 cursor-pointer' src={assets.play_icon} alt="" /> :
                     <img onClick={pause} className='w-5 cursor-pointer' src={assets.pause_icon} alt="" />
                     }
                    <img onClick={next} className='w-5 cursor-pointer' src={assets.next_icon} alt="" />
                    <img className='w-5 cursor-pointer' src={assets.loop_icon} alt="" />
                </div>
                <div className='flex items-center gap-3 text-sm'>
                    <p>{time.currentTime.minute} : {time.currentTime.second}</p>
                    <div onClick={seekSong} ref={seekBg} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                        <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
                    </div>
                    <p>{time.totalTime.minute} : {time.totalTime.second}</p>
                </div>
            </div>
            <div className='hidden items-center gap-2 opacity-75 lg:flex'>
                <img className='w-4' src={assets.plays_icon} alt="" />
                <img className='w-4' src={assets.mic_icon} alt="" />
                <img className='w-4' src={assets.queue_icon} alt="" />
                <img className='w-4' src={assets.speaker_icon} alt="" />
                <img className='w-4' src={assets.volume_icon} alt="" />
                <div className='w-20 bg-slate-50'>
                    <hr className='h-1 bg-slate-50 rounded' />
                </div>
                <img className='w-4' src={assets.mini_player_icon} alt="" />
                <img className='w-4' src={assets.zoom_icon} alt="" />
            </div>
        </div>
    )
}

export default Player