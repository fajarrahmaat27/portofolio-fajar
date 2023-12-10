import React from 'react'
import Sertificate1 from '../certificate/sertifikat1.webp'
import Sertificate2 from '../certificate/sertifikat2.webp'
import Sertificate3 from '../certificate/sertifikat3.webp'
import Sertificate4 from '../certificate/sertifikat4.webp'
import Sertificate5 from '../certificate/sertifikat5.webp'
import Sertificate6 from '../certificate/sertifikat6.webp'
import Sertificate7 from '../certificate/sertifikat7.webp'
import Sertificate8 from '../certificate/sertifikat8.webp'
import Sertificate9 from '../certificate/sertifikat9.webp'

function About() {
  return (
    <div id='about' className='p-4 w-full mx-auto mt-40 flex-col max-w-5xl flex overflow-hidden'>
        <div className='grid gap-2 md:gap-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-center'>About Me</h1>
          <p className='text-base text-justify md:text-xl'>Fajar Rahmat, a tech-savvy student from Universitas Riau, brings a dynamic blend of creativity and technical expertise to the field of web development. Proficient in JavaScript, React.js, Node.js, Express.js, C#, C++, and Java, Fajar is not just a coder but a digital architect. His portfolio showcases visually appealing and seamlessly functional websites, reflecting his problem-solving prowess and commitment to staying at the forefront of technology. As a student, Fajar embodies the perfect fusion of creativity and technology, turning each project into a canvas for his innovative touch.</p>
          <div>
            <h1 className='text-3xl md:text-4xl mt-5 font-semibold text-center'>Certificate</h1>
            <div className='h-80 overflow-y-scroll mt-5'>
              <div className='mr-2 ml-2 grid gap-6 md:grid-cols-3 grid-cols-1'> 
              <img src={Sertificate1} alt="" />
              <img src={Sertificate2} alt="" />
              <img src={Sertificate3} alt="" />
              <img src={Sertificate4} alt="" />
              <img src={Sertificate5} alt="" />
              <img src={Sertificate6} alt="" />
              <img src={Sertificate7} alt="" />
              <img src={Sertificate8} alt="" />
              <img src={Sertificate9} alt="" />
              </div>
            </div>
          </div>
        </div>
       
    </div>
  )
}

export default About