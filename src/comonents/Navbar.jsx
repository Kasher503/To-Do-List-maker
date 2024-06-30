import React from 'react'
import { MdAddTask } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-purple-600 text-white p-2">
    <div className="logo flex">
        <span className="font-bold text-xl ml-8">iTask</span>
        <MdAddTask className="font-bold text-xl mx-1 mt-1 " />
    </div>
       
    </nav>
  )
}

export default Navbar