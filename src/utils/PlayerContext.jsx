import { createContext, useEffect, useRef, useState } from "react";
import {PROXY_URL} from './constants'

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    
    

    const [track, setTrack] = useState({});
    const [songList, setSongList] = useState([]);
    const [playStatus, setPlayStatus] = useState(false);

    useEffect(() => {
      const getSongs = async ()=>{
        try {
            const response = await fetch(`${PROXY_URL}/api/song/list` , {
                credentials : 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                }
            })
            const data = await response.json();
            if (data?.error) {
                return;
            }
            // console.log(data);
            if (response.ok) {
             setSongList(data.message);  
             setTrack(data.message[0]) ;
            }
        } catch (error) {
            console.log(error);
        }
      }
      getSongs();
    }, [])
    

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const displayRef = useRef();
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = async () => {
        console.log(track);
        await audioRef.current.play();
        // audioRef.current.volume = 0.1;
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const previous = async () => {
        const currentIndex = songList.findIndex(obj => obj.name === track.name);
        if (currentIndex > 0) {

            const previousIndex = (currentIndex - 1 + songList.length) % songList.length;
            const previousSong = songList[previousIndex];
            setTrack(previousSong);
            const audioElement = audioRef.current;
            await audioElement.play();
            if (audioElement) {
                audioElement.play().then(() => {
                    setPlayStatus(true);
                }).catch((error) => {
                    console.error('Audio playback error:', error);
                });
            } else {
                console.error('Audio element not found');
            }
        }
    }

    const next = async () => {
        const currentIndex = songList.findIndex(obj => obj.name === track.name);
        if ( currentIndex < songList.length-1) {
            const nextIndex = (currentIndex + 1) % songList.length;
            const nextSong = songList[nextIndex];
            setTrack(nextSong);
            const audioElement = audioRef.current;
            await audioElement.play();
            if (audioElement) {
                audioElement.play().then(() => {
                    setPlayStatus(true);
                }).catch((error) => {
                    console.error('Audio playback error:', error);
                });
            } else {
                console.error('Audio element not found');
            }
        }
    }

    const playWithId = async (id) => {
        const response = await fetch(`${PROXY_URL}/api/song/single/${id}` , {
            credentials : 'include'
        })
        const data = await response.json();
        if (data?.error) {
            console.log(data.error);
            return;
        }
        setTrack(data.message);
        // console.log(data.message);
        seekBar.current.style.width = 0;
        const audioElement = audioRef.current;
        await audioElement.play();
        if (audioElement) {
            audioElement.play().then(() => {
                setPlayStatus(true);
            }).catch((error) => {
                console.error('Audio playback error:', error);
            });
        } else {
            console.error('Audio element not found');
        }
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    };

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = (e) => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime * 100 / audioRef.current.duration)) + "%";
                if (seekBar.current.style.width == "100%") {
                    seekBar.current.style.width = 0;
                    play();

                }
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }, 1000);
    }, [audioRef])

    const contextValue = {
        audioRef, track, setTrack, displayRef , playStatus, setPlayStatus, next, previous, play, pause, playWithId, songList , seekBar, seekBg, seekSong, time
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;