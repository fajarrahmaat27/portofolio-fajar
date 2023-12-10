import React from 'react'
import Typed from 'react-typed';
import Fajar from '../images/fajar.jpg'
function Home() {
  return (
    <>
    <div id='home'>
    <div  className='md:px-12 p-4 w-full mx-auto mt-40 text-center flex-columns justify-center'>
        <Typed className='text-xl font-bold'
        strings={[
          "Halo I'm Fajar Rahmat",
          "Student Of University Riau",
          "Web Developer"
         ]}
         typeSpeed={150}
         backSpeed={100}
         loop/>
        <h1 className='text-xl font-semibold '>Student's Infromatics Engineering</h1>
        <p>Really love to learn and courius about new technology</p>

        <div className='flex justify-center mt-4'>
        <img className='rounded-full w-56 hover:ease-in duration-300 cursor-pointer' src={Fajar} alt="" />
        </div>
    </div>
    </div>
    
    </>
    
  )
}

export default Home