import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PROXY_URL } from '../utils/constants';
import {toast} from 'react-hot-toast'
import { assets } from '../assets/admin-assets/assets';
import Spinner from './Spinner';

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [file, setFile] = useState(false);
    const [loading, setloading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      const getMe = async ()=>{
        const response = await fetch(`${PROXY_URL}/api/user/me` , {
          credentials : 'include'
        });
        const data = await response.json();
        // console.log(data);
  
        if (!data.error) {
          navigate("/");
        }
      }
      getMe();
    } , [])

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        const formData = new FormData(); // Create a FormData object
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('fullname', fullname);
        formData.append('image', file);
    

        try {
          setloading(true);
          if (!username || !email || !password || !file || !fullname) {
            toast("Fill all the fields !");
            return;
          }
          const response = await fetch(`${PROXY_URL}/api/user/signup`, {
            method: 'POST',
            body: formData,
          });

          const responseData = await response.json();
    
          if (responseData.error) {
            setloading(false);
            toast(responseData.error);
            return;
          }

          if (responseData.message) {
            setloading(false);
            toast(responseData.message);
            navigate("/login");
          }



          console.log(responseData);
        } catch (error) {
          console.error('Error:', error); // Handle errors
        }
      };

  return (
   <>
   {
    loading ? <Spinner/> :  <div class="p-10 text-black">
    <h1 class="mb-8 font-extrabold text-4xl text-white">Register</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen">

        <form onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
        
        <div className="flex flex-col gap-4 text-white my-5">
        <p>Upload Image</p>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" id='image' accept='image/*' hidden />
        <label htmlFor="image">
          <img className='w-24 h-24 cursor-pointer' src={file ? URL.createObjectURL(file) : assets.upload_area} alt="" />
        </label>
        </div>

            <div>
                <label class="block text-white font-semibold" for="username">Username</label>
                <input onChange={(e)=>{setUsername(e.target.value)}} class="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1" id="username" type="text" name="username" required="required" autofocus="autofocus"/>
            </div>

            <div class="mt-4">
                <label class="block text-white font-semibold" for="email">Email</label>
                <input onChange={(e)=>{setEmail(e.target.value)}} class="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1" id="email" type="email" name="email" required="required"/>
            </div>
            <div class="mt-4">
                <label class="block text-white font-semibold" for="fullname">Fullname</label>
                <input onChange={(e)=>{setFullname(e.target.value)}} class="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1" id="fullname" type="text" name="fullname" required="required"/>
            </div>

            <div class="mt-4">
                <label class="block text-white font-semibold" for="password">Password</label>
                <input onChange={(e)=>{setPassword(e.target.value)}} class="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1" id="password" type="password" name="password" required="required" autocomplete="new-password"/>
            </div>

            <div class="flex items-center justify-between mt-8 space-x-2">
                <button type="submit" class="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">Register</button>
                <Link to="/login" class="font-semibold cursor-pointer text-white">
                    Already registered? Login Here
                </Link>
            </div>
        </form>

        <aside class="">
            <div class="bg-gray-100 text-black p-8 rounded">
                <h2 class="font-bold text-2xl">Instructions</h2>
                <ul class="list-disc mt-4 list-inside">
                    <li>All users must provide a valid email address and password to create an account.</li>
                    <li>Users must not use offensive, vulgar, or otherwise inappropriate language in their username or profile information</li>
                    <li>Users must not create multiple accounts for the same person.</li>
                </ul>
            </div>
        </aside>

    </div>
</div>
   }
   </>
  )
}

export default Register