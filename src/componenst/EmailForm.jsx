import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const EmailForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_bnagrbl', 'template_umvarfr', form.current, '2L_mJ3FeCQoKVKSxI')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div id='contact' className='p-4 w-full mx-auto flex-row max-w-5xl'>
      <h1 className='text-4xl font-bold'>Contact</h1>
      <form ref={form} className='flex flex-col p-1 gap-1 md:gap-3' onSubmit={sendEmail}>
        <div className='flex flex-col'>
            <label className='text-2xl font-semibold'>Name</label>
            <input type="text" name="user_name" className='rounded-sm h-7 md:h-8 lg:h-10 p-3 text-black focus:outline-none focus:border-b-4 border-yellow-800'/>    
        </div>
        <div className='flex flex-col'>
            <label className='text-2xl font-semibold'>Email</label>
            <input type="email" name="user_email" className='rounded-sm h-7 md:h-8 lg:h-10 p-3 text-black focus:outline-none focus:border-b-4 border-yellow-800'/>
        </div>
        <div className='flex flex-col'>   
            <label className='text-2xl font-semibold'>Message</label>
            <textarea name="message" style={{ resize: "none"}} className='rounded-sm h-14 md:h-28 lg:h-32 p-3 text-black focus:outline-none focus:border-b-4 border-yellow-800'/>
        </div>
        <div className='text-center w-[150px] h-9 md:w-[200px] md:h-12 border justify-end border-yellow-800'>
            <button className='w-full h-full text-yellow-800 hover:text-black text-sm md:text-lg' type="submit" value="Send" >
              Send Message</button>
        </div>
    </form>
    </div>
    
  );
};