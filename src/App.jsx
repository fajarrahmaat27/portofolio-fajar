import { useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import TerminalIntro from './components/Terminal/TerminalIntro'
import Cursor from './components/Cursor/Cursor'
import About from './components/About/About'
import Timeline from './components/Timeline/Timeline'
import Work from './components/Work/Work'


function App() {
  //check if user already visited
  const alreadyVisited = localStorage.getItem('visitorName')
  const [visitorName, setVisitorName] = useState(alreadyVisited || null )

  const handleIntroComplete = (name) =>   {
    setVisitorName(name)
  }
  return(
    <>
    <Cursor/>
    {!visitorName && (
      <TerminalIntro onComplete={handleIntroComplete} />
    )}
    {visitorName && (
      <>
        <Navbar/>
        <main>
           <Hero visitorName={visitorName}/>
           <About visitorName={visitorName} />
           <Timeline />
           <Work />
        </main>
      </>
    )}
    </>
  )
}

export default App
