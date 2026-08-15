"use client";

import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
// import { ThemeContext } from "../../context/themeContext";
import {useAuth} from '../../context/authContext';
import ThemeToggle from "@/app/component/themeToggle/themeToggle";
import CartIcon from "@/app/component/CartIcon";
import AdminProduct from '@/app/adminProduct/page';
// import "../globals.css";
// import HeaderClient from './HeaderUsername';
// import { cookies } from "next/headers";
// import { getCookie} from '../../../lib/auth/auth';

const Header = () => {
  // const themeContext = useContext(ThemeContext);
  const authContext = useAuth();

  const [username, setUsername] = useState<string | null>(null);
  const { user, isAuthenticated, logout, userRole } = useAuth();
  // const username = getCookie('username');
  useEffect(() => {
    if (isAuthenticated && user) {
      setUsername(user.name);
      console.log('✅ Header updated with user:', user.name);
    } else {
      setUsername(null);
      console.log('👤 Header showing guest');
    }
  }, [isAuthenticated, user]);

  const handleLogout = () => {
    logout();
  };

  function burgerIcon(){
    const burgercontent = document.getElementById('burgercontent');
    if(burgercontent?.classList.contains('hidden')){
      burgercontent.classList.remove('hidden');
    } else {
      burgercontent?.classList.add('hidden');
    }
  }

    function RightIcon(){
    const rightcontent = document.getElementById('righticon');
    if(rightcontent?.classList.contains('hidden')){
      rightcontent.classList.remove('hidden');
    } else {
      rightcontent?.classList.add('hidden');
    }
  }

  return (
    <div  className='sticky relative top-0 z-[999] header text-black shadow h-[10vh] flex items-center justify-around font-medium'>
      <div className='hidden md:flex'>
        <span className='mr-10 cursor-p ointer hover:underline active:scale-95'><Link href="/">Home</Link></span>
        <span className='mr-10 cursor-pointer hover:underline active:scale-95'><Link href='/Products'>Product</Link></span>
        <span className='mr-10 cursor-pointer hover:underline active:scale-95'><Link href="/Photoshoot">Photoshoot</Link></span>
        <span className='mr-10 cursor-pointer hover:underline active:scale-95'><Link href="/Blog">Blog</Link></span>
        <span className='mr-10 cursor-pointer hover:underline active:scale-95'><Link href="/FAQ">FAQ</Link></span>
      </div> 
      <div className='flex md:hidden' onClick={burgerIcon}>
        <img className='w-6 h-6' src='/burger.png'/>
      </div>
      {/* Overlay for burger menu */}
      <div id='burgercontent-overlay' className='hidden fixed inset-0 z-40 bg-white/80'></div>
      <div id='burgercontent' className='hidden flex flex-col h-full w-full md:w-[60vw] md:max-w-md fixed top-0 left-0 z-50 bg-white border-r p-6 shadow-2xl'>
        <button onClick={burgerIcon} className='absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition'>
          <img src='/X.png' alt='Close' className='w-6 h-6'/>
        </button>

        <span className='mb-4 text-lg font-bold'>Menu</span>
        <span className='mb-2 cursor-pointer hover:underline active:scale-95'><Link href="/">Home</Link></span>
        <span className='mb-2 cursor-pointer hover:underline active:scale-95'><Link href='/Products'>Product</Link></span>
        <span className='mb-2 cursor-pointer hover:underline active:scale-95'><Link href="/Photoshoot">Photoshoot</Link></span>
        <span className='mb-2 cursor-pointer hover:underline active:scale-95'><Link href="/Blog">Blog</Link></span>
        <span className='mb-2 cursor-pointer hover:underline active:scale-95'><Link href="/FAQ">FAQ</Link></span>
      </div>
        <span className='flex justify-center items-end absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' style={{position: 'absolute', left: '50%', top: '100%', transform: 'translate(-50%, -50%)'}}>
          <Link href='/'>
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              unoptimized
              className='hover:scale-105 transition-transform cursor-pointer active:scale-95'
            />
          </Link>
        </span>

        <div className='flex md:hidden items-center justify-end ml-auto z-40 bg-white rounded-full shadow-lg p-4' onClick={RightIcon}>
          <img className='w-8 h-8' src='/rightIcon.png' alt='Open right menu'/>
        </div>


        {/* Overlay for right menu */}
        <div id='righticon-overlay' className='hidden fixed inset-0 z-50 bg-white/90'></div>
        <div id='righticon' className='hidden flex flex-col w-[60vw] max-w-lg h-full justify-start items-start fixed top-0 right-0 border-l p-6 bg-white shadow-2xl z-50'>
          <button onClick={RightIcon} className='absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition'>
            <img src='/X.png' alt='Close' className='w-6 h-6'/>
          </button>
          <div className='w-full mt-12 flex flex-col gap-4'>
            <Link href='/Contact/'>Contact Us</Link>
            <Link href='/user'>
              {username ? (
                <span className='mr-2 hover:underline'>Hello, {username}</span>
              ) : (
                <span className='mr-2 hover:underline'>Hello, Guest</span>
              )}
            </Link>
            <Link href='/AddToCart/'>
              <CartIcon className="ml-2" />
            </Link>
            {!isAuthenticated ? (
              <div>
                <span className='mr-4 cursor-pointer hover:underline active:scale-95'><Link href='/Signup'>Signup</Link></span>
                <span className='mr-4 cursor-pointer hover:underline active:scale-95'><Link href='/Login'>Login</Link></span>
              </div>
            ) : (
              <div>
                <span className='mr-4 cursor-pointer hover:underline active:scale-95' onClick={logout}>Logout</span>
              </div>
            )}
            {userRole === 'ADMIN' && (
              <span className='mr-4 cursor-pointer hover:underline active:scale-95'><Link href='/adminProduct'>Admin Dashboard</Link></span>
            )}
            <ThemeToggle />
          </div>
        </div>

        <div className='hidden md:flex md:items-center'>

          <span className='mr-10 cursor-pointer hover:underline active:scale-95'><Link href='/Contact/'>Contact Us</Link></span> 
            <Link href='/user'>
              {username ? (
                <span className='hidden md:inline mr-2 hover:underline'>Hello, {username}</span>
              ) : (
                <span className='hidden md:inline mr-2 hover:underline'>Hello, Guest</span>
              )}
            </Link>
              <Link href='/AddToCart/'>
              <CartIcon className="ml-2" />
            </Link>
            {/* <span className='mr-4 cursor-pointer hover:underline active:scale-95'><Link href='/Signup'>Signup</Link></span>  */}



            {!isAuthenticated ? 
              <div>
                <span className='mr-4 cursor-pointer hover:underline active:scale-95'><Link href='/Signup'>Signup</Link></span>
                <span className='mr-4 cursor-pointer hover:underline active:scale-95'><Link href='/Login'>Login</Link></span>
              </div>        
              :
              <div>
                <span className='mr-4 cursor-pointer hover:underline active:scale-95' onClick={logout}>Logout</span>
              </div>
            }
            {userRole === 'ADMIN' && (
              <span className='mr-10 cursor-pointer hover:underline active:scale-95'><Link href='/adminProduct'>Admin Dashboard</Link></span>
            )}

            <ThemeToggle></ThemeToggle>
        </div>
    </div>
  )
}

export default Header
