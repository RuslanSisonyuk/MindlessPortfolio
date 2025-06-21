import { useRef } from 'react'
import './App.css'
import Aboutme from './components/ui/Aboutme'
import Reels from './components/Reels'
import LocalMusicGridComponent from './components/localplaylistgrid'
import { motion, useTransform, useScroll,useMotionTemplate } from 'framer-motion'
import Navbar from './components/ui/navbar'
import Footer from './components/ui/Footer'

// import { FetchTracks } from './components/Data/localTrackList'

function App() {
  const contactRef = useRef(null);

  return (
    <>
      <Navbar/>
      <Header/>
      

      <main className='flex flex-col w-full pt-[5rem] min-h-[100vh] pt-[10rem] gap-[18rem]'>
        <div className='flex flex-col justify-center self-center w-full max-w-[90%] md:max-w-[90%] lg:max-w-[75%] xl:max-w-[60%] gap-[5rem] gap-[20rem]'>
          <Reels/>
          <Aboutme targetRef={ contactRef }/>
        </div>
        
        <Testimonial/>
        
        <div id="portfolio" className='flex flex-col justify-center self-center w-full max-w-[90%] md:max-w-[90%] lg:max-w-[75%] xl:max-w-[60%] gap-[4rem] mb-[0rem] '>
          <section className='flex flex-col justify-center self-center'>
            <p className='font-title m-0 text-[1.4rem] md:text-[1.6rem] lg:text-[2rem] reels-title relative'>PORTFOLIO</p>
            <p className='text-[1rem]/7 md:text-[1.2rem]/7 font-light max-w-[30rem]'>Description of the work. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
          </section>
          <section className='flex flex-row justify-center content-center w-full m-0 p-0 pb-[4rem] bg-bg-background rounded-t-[4px] inset-shadow-bottom'>
            <LocalMusicGridComponent></LocalMusicGridComponent>
          </section>
        </div>
      </main>

      <Footer ref={ contactRef }/>
    </>
  )
}

const Header = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0,1], [0,800]); 
  const transform = useMotionTemplate`translateY(${y}px)`;

  return( 
    <header className='flex flex-row bg-bg-primary justify-center shadow-2xl border-t-1 border-t-text-light md:pt-[4rem]  overflow-hidden'>
      <div className=''>
        <motion.img src="/assets/BIG-LOGO-SD.png" alt="LOGO" className={` `} style = {{
            transform
            }
          }/>
      </div>
    </header>
  );
}

const Testimonial = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const y = useTransform(scrollYProgress, [0,1], [-400,600]); 
  const transform = useMotionTemplate`translateY(${y}px)`;

  return (
    <section className='flex flex-col justify-center w-full max-h-[60vh] md:max-h-[70vh] bg-bg-test min-h-[50vh] items-center overflow-hidden relative'>
      <motion.img src="\assets\music_background.jpeg" alt="" 
          className={`w-full min-h-[80vh] xl:min-h-[50vh] absolute z-[-1] object-cover`}
          style = {{
            transform
            }
          }
      />
      <div className='flex flex-col self-center max-w-[80%] lg:max-w-[50%]'>
        <p className='text-light-text font-thin italic text-[1.6rem]/7 lg:text-[2rem]/14 '>
          Eduardo is a gifted, inventive, and adaptable sound designer who has made himself essential to the project; his work has changed the way I think about my game.
        </p>
        <p className='text-light-text text-[1rem] md:text-[1.2rem] font-thin mt-4 italic'>Somuel r. Bloke, Grove Street</p>
      </div>
    </section>
  );
}

export default App