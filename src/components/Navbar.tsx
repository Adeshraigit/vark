import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SignedIn, UserButton, useAuth } from '@clerk/clerk-react';

function Navbar() {
  const { isSignedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-emerald-900 text-emerald-50 py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">VARK</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg">
          <Link to="/" className="hover:text-white transition-all duration-300">Home</Link>
          <Link to="/about" className="hover:text-white transition-all duration-300">About</Link>
          <Link to="/resources" className="hover:text-white transition-all duration-300">Resources</Link>
          <Link to="/contact" className="hover:text-white transition-all duration-300">Contact</Link>
        </div>
        
        {/* Authentication & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <SignedIn>
              <UserButton />
            </SignedIn>
          ) : (
            <Link
              to="/sign-in"
              className="hidden md:block text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md transition duration-300"
            >
              Log In
            </Link>
          )}
          <button onClick={toggleMenu} className="md:hidden focus:outline-none">
            {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-emerald-800 py-4 transition-all duration-300 ease-in-out">
          <ul className="text-center space-y-4 text-lg">
            <li><Link to="/" onClick={closeMenu} className="block hover:text-white transition-all duration-300">Home</Link></li>
            <li><Link to="/about" onClick={closeMenu} className="block hover:text-white transition-all duration-300">About</Link></li>
            <li><Link to="/resources" onClick={closeMenu} className="block hover:text-white transition-all duration-300">Resources</Link></li>
            <li><Link to="/contact" onClick={closeMenu} className="block hover:text-white transition-all duration-300">Contact</Link></li>
            {!isSignedIn && (
              <li>
                <Link
                  to="/sign-in"
                  onClick={closeMenu}
                  className="block text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md transition duration-300"
                >
                  Log In
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;