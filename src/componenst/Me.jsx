import React from 'react'
import { FaInstagram } from "react-icons/fa6";
import { FaGithub, FaLinkedin  } from "react-icons/fa";


const Me = () => {
  return (
    <>
        {/* <div className='relativ bg-black'>
            <div className='fixed bottom-0 right-0 h-[50%] w-16 mt-3'>
                
                <a href=""><FaGithub className='text-2xl'/></a>
                <FaInstagram className='text-2xl mt-3' />
                <a href=""></a>
                <a href="" target='_blank'><FaLinkedin className='text-2xl mt-3 ' /></a>
                

            </div>
        </div> */}
        <div className='flex justify-center'>
            <div className='flex'>
                <a className='m-2 text-gray-900 text-2xl' href="https://github.com/fajarrahmaat27" target='_blank'><FaGithub /></a>
                <a className='m-2 text-gray-900 text-2xl' href="https://instagram.com/_fajarrahmaat?igshid=NzZlODBkYWE4Ng==" target='_blank'><FaInstagram /></a>
                <a className='m-2 text-gray-900 text-2xl' href="https://www.linkedin.com/in/fajar-rahmat/" target='_blank'><FaLinkedin /></a>
            </div>
            
        </div>
        <h1 className='text-center text-gray-400 font-semibold'>Design And Build by Fajar Rahmat</h1>

    </>
    
  )
}

export default Me