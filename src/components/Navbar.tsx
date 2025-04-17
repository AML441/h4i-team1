import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  return ( 
    <div className="w-full h-50 bg-[#C7A2D8] flex justify-center">
        <img src={logo} alt="Website Logo" className="object-contain h-full scale-120 mt-20"/>
    </div>
  )
}

export default Navbar