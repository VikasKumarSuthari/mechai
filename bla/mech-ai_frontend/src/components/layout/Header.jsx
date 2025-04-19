import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { CircleUser } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate=useNavigate();
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="./src/assets/LogoT.png" 
              alt="MechAI Logo" 
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-gray-900">MechAI</span>
          </Link>
          
          {/* Navigation */}
          <Navbar />
          <CircleUser onClick={()=>navigate("/profile")}/>
          
          {/* Auth Buttons */}
          {/*<div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign Up
            </Link>
          </div>*/}
        </div>
      </div>
    </header>
  );
};

export default Header;