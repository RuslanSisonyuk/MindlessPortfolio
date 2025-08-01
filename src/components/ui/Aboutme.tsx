import { RefObject } from "react";
import { Button } from "./button";

interface aboutMeProps{
  targetRef: RefObject<HTMLDivElement | null>
}

export default function Aboutme(props: aboutMeProps){

  const handleClick = () => {
    props.targetRef.current?.scrollIntoView({ behavior:'smooth' });
  }

  return(
      <section id="about" className='flex flex-col-reverse md:flex-row md:gap-0 justify-center content-center w-full m-0 p-0'>
          <img src="\assets\arthur_lanca.png" alt="ABOUTME_IMAGE" className='w-full hidden md:block md:max-w-[40%] max-h-[100%] object-cover rounded-sm shadow-[5px_3px_10px_rgba(0,0,0,0.35)] z-1'/>
          <div className='flex flex-col justify-start text-left md:max-w-[60%] gap-0 md:gap-3'>
            <span className='text-dark-text font-title text-[1.4rem] md:text-[1.6rem] lg:text-[2rem] ml-[40px]'>ABOUT ME</span>
            <img src="\assets\arthur_lanca.png" alt="ABOUTME_IMAGE" className='w-full md:hidden w-full max-h-[100%] object-cover rounded-t-sm shadow-[5px_3px_10px_rgba(0,0,0,0.35)] z-1'/>

            <p className='bg-[#5A4A4A] p-[25px] pl-[40px] rounded-[2px] text-[1rem]/7 md:text-[1.1]/7 font-light text-[#eee]'>Arthur Lança, professionally known as Mindless, is a creative 
            audio professional specializing in sound design, music, and audio production for games, animation, and digital media. Since beginning his career in 2020, he has worked on a range of projects, 
            starting as an Audio Editor for the Voices of Wynn project under Kmaxi. 
            Beyond this he worked for Valentim de Carvalho as a production assistant for various Portuguese TV Shows, such as Joker, Portugal's Got Talent & Cá Por Casa Com Herman José.
            Since then, Mindless has contributed to projects with YouTube creators, Roblox developers, and student animators, providing high-quality audio that elevates storytelling and interactive experiences. 
            With a focus on creativity, collaboration, and technical precision, he brings a versatile and professional approach to every production.
</p>
              <Button onClick={ handleClick }
              className="flex ml-[40px] mt-[10px] max-w-[10rem] py-6 rounded-[2px] bg-0 text-dark-text text-[1.4rem] font-title-light outline-solid outline-[2px] outline-bg-secondary hover:bg-bg-secondary hover:text-[#fff] hover:outline-[2px] cursor-pointer">CONTACT</Button>
          </div>
        </section>
  )
}