import { useContext } from "react"
import { PlayerContext } from "../utils/PlayerContext"
import { PROXY_URL } from "../utils/constants";
import toast from "react-hot-toast";

const SongItem = ({ name, image, desc, id }) => {

  const {playWithId} = useContext(PlayerContext);

  const handleClick = async ()=>{
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

  return (
    <div onClick={handleClick} className=' min-w-[180px]  hover:bg-[#ffffff26] p-2 px-3 rounded cursor-pointer'>
      <img className='rounded object-cover w-[250px] h-[200px]' src={image} alt=""  />
      <p className=' font-bold mt-2 mb-1'>{name}</p>
      <p className=' text-slate-200 text-sm'>{desc}</p>
    </div>
  )
}

export default SongItem