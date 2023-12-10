import { FaLink } from 'react-icons/fa';
import { useInView, animated } from '@react-spring/web'


import React from 'react';

export function CardList (props) {
    const [ref, springs] = useInView(
        () => ({
          from: {
            opacity: 0,
            x: -100,
          },
          to: {
            opacity: 1,
            x: 0,
          },
        }),
        {
          rootMargin: '-40% 0%',
        }
      )
    return(
        <animated.div  ref={ref} style={springs}>
            <div className='p-4 w-full mx-auto flex-col max-w-5xl flex flex-wrap'>
            <div key={props.id} className='relative bg-white font-semibold md:max-w-[20rem] md:max-h-[50rem] max-w-[15rem] max-h-[50rem] transition-[0.2s] m-4 hover:translate-y-[-0.5rem] hover:shadow-[0.5rem_0.75rem_1.5rem_#bbbbbb]'>
                <img src={props.image} alt="product-img" className='w-[100%] min-h-[50px] h-auto'/>
                <div className='m-4'>
                    <h3 className='md:text-lg text-sm'>{props.name}</h3>
                    <div className='justify-evenly mb-3'>
                        <button className='bg-black w-20 h-8 items-center justify-center text-white flex rounded-2xl mt-3'><FaLink className='mr-1 text-xs'/><a className='text-s' target='_blank' href={props.link}>Link</a></button>
                    </div>
                    <div className='text-black flex justify-between'>
                        {/* <p className='mb-10 flex justify-center'>{props.javascript}</p>
                        <p className='mb-10 flex justify-center'>{props.html}</p>
                        <p className='mb-10 flex justify-center'>{props.css}</p>
                        <p className='mb-10 flex justify-center'>{props.react}</p>
                        <p className='mb-10 flex justify-center'>{props.bootstrap}</p> */}
                    </div>
                </div>
            </div>
        </div>
        </animated.div>
    )
}
