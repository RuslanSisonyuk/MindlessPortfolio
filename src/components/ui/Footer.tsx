import { Ref } from "react";
import EmailForm from "../EmailForm";

interface FooterProps{
    ref?: Ref<HTMLDivElement>;
}

export default function Footer(props: FooterProps){
    
    return(
        <footer { ...props } className='flex flex-col justify-center items-center w-full bg-bg-dark py-[3rem] text-light-text gap-[3rem] md:gap-[5rem]'>
            <section className='flex flex-col justify-center self-center font-title'>
                <p className='text-[1.4rem] font-medium footer-title relative mb-[0.7rem]'>LET'S MAKE SOME NOISE</p>
                <p className='text-[1.2rem]/7 font-thin'>Send me a message and<br/> let's discuss things!</p>
            </section> 

            <section id="contact"  className='flex flex-col-reverse md:flex-row gap-[2rem] md:gap-[6rem] lg:gap-[12rem] max-w-[80%]'>
                
                <EmailForm/>

                <div className='flex flex-col text-left gap-[2rem] text-[1rem]/6 w-full md:max-w-[50%] pt-[1.6rem]'>
                    <p>
                    I love getting involved and helping other developers create new and exciting games.<br/> So lets have a chat and see how I can help you and your team achieve your creative vision and more!
                    </p>

                    <p>Email: I.am.Mindless@gmail.com</p>

                    <p>+777 777 777</p>
                </div>
            </section>

            <section className='flex flex-row gap-[2rem]'>
                <a href="https://www.instagram.com" target="_blank">
                    <img src="\assets\instagram-icon.svg" alt="" className='max-w-[30px]'/>
                </a>
                <a href="https://www.x.com" target="_blank">
                    <img src="\assets\twitter-x-icon.svg" alt="" className='max-w-[30px]'/>
                </a>
                <a href="https://www.discord.com" target="_blank">
                    <img src="\assets\discord-icon.svg" alt="" className='max-w-[30px]'/>
                </a>
            </section>
        </footer>
    )
}