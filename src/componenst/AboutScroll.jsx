import { useInView, animated } from '@react-spring/web'
import About from './About'

function AboutScroll() {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        x: 100,
      },
      to: {
        opacity: 1,
        x: 0,
      },
    }),
    {
      rootMargin: '-40% 0%',
      once : true,
    }
  )

  return (
    <animated.div  ref={ref} style={springs}>
      <About />
    </animated.div>
  )
}

export default AboutScroll
