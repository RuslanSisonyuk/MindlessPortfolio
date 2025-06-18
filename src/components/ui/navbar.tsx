export default function Navbar(){
    return(
        <nav className='text-[1rem] md:text-[1.1rem] lg:text-[1.1rem] 2xl:text-[1.3rem] gap-10 md:gap-25 lg:gap-50 p-3 font-title-light text-light-text w-full border-b border-bg-background flex flex-row md:fixed z-10 bg-bg-primary justify-center'>
            <div className='flex flex-row justify-around gap-[1rem] md:gap-[5rem]'>
              <a href="#reels"><p className=''>REELS</p></a>
              <a href="#about"><p className=''>ABOUT ME</p></a>
            </div>
            <div className='flex flex-row justify-around gap-[1rem] md:gap-[5rem]'>
              <a href="#portfolio"><p className=''>PORTFOLIO</p></a>
              <a href="#contact"><p className=''>CONTACT</p></a>
  
            </div>
        </nav>
    )
}