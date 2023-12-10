import React from 'react'
import logo1 from '../skill/skill1.png'
import logo2 from '../skill/skill2.png'
import logo3 from '../skill/skill3.png'
import logo4 from '../skill/skill4.png'
import logo5 from '../skill/skill5.png'
import logo6 from '../skill/skill6.png'
import logo7 from '../skill/skill7.png'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

function Skills() {
  useEffect(()=> {
    Aos.init();
  }, [])
  return (
    <div id='skill' className='p-4 w-full mx-auto mt-40 flex-col max-w-5xl flex flex-wrap'>
        <div className='flex flex-wrap grid-cols-2 justify-between'>
            <div className='flex items-center'>
            <h1 className='text-3xl md:text-4xl font-bold' data-aos = "fade-right">Skills</h1>
            </div>
            <div className=' max-w-4xl gap-10 grid md:grid-cols-3 grid-cols-2'>
                <img className='h-[80px] justify-self-center duration-500'  data-aos = "fade-right" src={logo1} alt="" />
                <img className='h-[80px] justify-self-center duration-500'  data-aos = "fade-down" src={logo2} alt="" />
                <img className='h-[80px] justify-self-center duration-500'  data-aos = "fade-left" src={logo3} alt="" />
                <img className='h-[80px] justify-self-center duration-500'  data-aos = "fade-right" src={logo4} alt="" />
                <img className='h-[80px] justify-self-center duration-500'  data-aos = "fade" src={logo5} alt="" />
                <img className='h-[80px] justify-self-center duration-500'  data-aos = "fade-left" src={logo6} alt="" />
                <img className='h-[80px] justify-self-center md:col-start-2 duration-500'  data-aos = "fade-up" src={logo7} alt="" />
            </div>
        </div>
    </div> 
  )
}

export default Skills