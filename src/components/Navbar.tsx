import React from 'react'
import logo from '../assets/logo.png'
import user from '../assets/user.png'
import cart from '../assets/cart.png'
import home from '../assets/home.png'

const Navbar = () => {
  const loggedIn = false

  return (
    <div className="w-full h-40 bg-[#C7A2D8] flex items-center px-6 relative">
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <img src={logo} alt="Website Logo" className="h-full object-contain scale-150 mt-30" />
      </div>

      {loggedIn && (
        <div className="ml-auto flex gap-6 items-center pt-4">
          <img src={user} alt="User icon" className="h-8 object-contain" />
          <img src={cart} alt="Cart icon" className="h-8 object-contain" />
          <img src={home} alt="Home icon" className="h-8 object-contain" />
        </div>
      )}
    </div>
  )
}

export default Navbar