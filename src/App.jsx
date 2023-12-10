import { useState } from 'react'
import './App.css'
import './index.css'
import Navbar from './componenst/Navbar'
import Home from './componenst/Home'
import About from './componenst/About'
import Skills from './componenst/Skills'
import Card from './componenst/Card'
import CardTitle from './componenst/CardTitle'
import { EmailForm } from './componenst/EmailForm'
import PreLoader from './componenst/PreLoader'
import { useSpring, animated, useInView } from 'react-spring'
import AboutScroll from './componenst/AboutScroll'
import Me from './componenst/Me'
import { CardList } from './componenst/CardList'

function App() {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        y: 50,
        delay:0,
      },
      to: {
        delay:6500,
        opacity: 1,
        y: 0,
        once:true,
      },
    }),
  
    {
      rootMargin: '-40% 0%',
    },
    {
      once : true,
    }
  )

  return (
    <div className="animated overflow-hidden">
      <PreLoader />
      <Navbar />
      <animated.div ref={ref} style={springs}>
        <Home />
        <AboutScroll />
        <Skills />
        <CardTitle />
        <Card />
        <EmailForm />
        <Me />
      </animated.div>
        
    </div>
  )
}

export default App
