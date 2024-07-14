import React from 'react'
import { Outlet} from 'react-router-dom';
import Sidebar from './SideBar';
import Navbar from './Navbar';

const App = () => {
  return (
    <div className='flex items-start min-h-screen'>
      <Sidebar />
      <div className='flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]'>
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12 text-black">
          <Outlet/>
        </div>

      </div>

    </div>
  )
}

export default App
