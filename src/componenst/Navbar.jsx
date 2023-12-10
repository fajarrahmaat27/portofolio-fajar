import React from 'react'
import { useState } from 'react'
import {GrLanguage} from "react-icons/gr"
import {FaXmark} from "react-icons/fa6"
import { FaBarsStaggered } from "react-icons/fa6";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const navItems = [
        {link:"Home", path: "#home"},
        {link:"About", path: "#about"},
        {link:"Skill", path: "#skill"},
        {link:"Project", path: "#project"},
        {link:"Contact", path: "#contact"},
    ]
  return (
    // nav item
    <>
    <nav className='bg-[#F5ECD7] md:px-14 p-4 max-w-screen-2xl border-b mx-auto text-primary fixed top-0 right-0 left-0'>
        <div className='text-lg container mx-auto flex justify-between item-center font-medium'>
            <div className='flex space-x-14 items-center'>
                <a href="" className='text-2xl font-semibold  flex items-center space-x-3 text-black'> <img src="#" alt="" className='w-10 inline-block items-center' />FAJAR' R</a>
                {/* showing navitem using map */}
            </div>
            <ul className='md:flex space-x-12 hidden justify-end'>
                    {
                        navItems.map(({link,path })=> <a key={link} href={path} className='block hover:text-grey-300'>{link}</a>)
                    }
                </ul>
            {/* Menu btn. only display */}
            <div className='md:hidden'>
                    <button onClick={toggleMenu} className='text-white focus:outline-none focus:text-gray-300'>
                        {
                            isMenuOpen ? (<FaXmark  className='w-6 h-6 text-black  '/>) : (<FaBarsStaggered className='w-6 h-6 text-black'/>)
                        }
                    </button>
            </div>
        </div>
    </nav>

    <div className={`space-y-4 px-4 pt-24 pb-5 bg-grey-400 text-xl ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
            {               
                navItems.map(({link,path })=> <a key={link} href={path} className='block hover:text-grey-300'>{link}</a>)              
            } 
    </div>
    </>
  );
}

export default Navbar