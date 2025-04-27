import logo from '../assets/logo.png';
import user from '../assets/user.png';
import cart from '../assets/cart.png';
import home from '../assets/home.png';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true); // User is logged in
      } else {
        setLoggedIn(false); // No user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  return (
    <div className="w-full h-30 bg-[#C7A2D8] flex items-center px-6 relative">

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <img src={logo} alt="Website Logo" className="h-full object-contain scale-100 mt-30" />
      </div>

      {loggedIn && (
        <div className="ml-auto flex gap-6 items-center pt-4">
          <Link to="/client-profile"><img src={user} alt="User icon" className="h-8 object-contain" /> </Link>
          <img src={cart} alt="Cart icon" className="h-8 object-contain" />
          <img src={home} alt="Home icon" className="h-8 object-contain" />
        </div>
      )}
    </div>
  )
}

export default Navbar;