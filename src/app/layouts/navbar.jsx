'use client'
import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-[#0C0C0C] text-white">
      <div className="max-w-7xl  px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="w-2/12 hidden md:flex md:items-center">
            
          </div>

          <div className="hidden md:flex space-x-4">
            <Link href='/' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>Home</Link>

          </div>

          <div className="flex  gap-2">
            <Link href='/signup' className="bg-[#E60000] text-white font-bold py-2 px-7 rounded-3xl hidden md:block">
              signup
            </Link>
            <Link href='/login' className="bg-transparent text-white font-bold py-2 px-8 rounded-3xl hidden md:block border-2 border-[#E60000]">
              sign in
            </Link>
            <button className="md:hidden text-white" onClick={toggleMenu}>
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0C0C0C] text-white px-4 pt-4 pb-2">
          <div className="flex flex-col space-y-2">
            <Link href="/" className='block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700'>Home</Link>
            <Link href='/signup' className="w-full bg-[#E60000] text-white font-bold py-2 px-4 rounded">
              signup
            </Link>
            <Link href='/login' className="w-full bg-transparent border-2 border-[#E60000] text-white font-bold py-2 px-4 rounded">
              ورود
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
