import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";


function WelcomePage() {

    const links = [
        { name: "Linkedin", url: "https://www.linkedin.com/in/sudip-ghara-b24865214/" },
        { name: "Github", url: "https://github.com/SudipGhara19" },
        { name: "Portfolio", url: "https://sudipghara19.github.io/Portfolio/" }
    ];

    useEffect(() => {
        // Register GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Select all elements with the 'about-us' class
        const aboutUsSections = document.querySelectorAll(".gsap-ani");

        // Create a GSAP timeline
        const timeline = gsap.timeline();

        // Add each section animation to the timeline sequentially
        aboutUsSections.forEach((section) => {
            timeline.fromTo(
                section,
                { opacity: 0, y: 30 }, // Initial state
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7, // Duration of each animation
                    ease: "power3.out",
                    onComplete: () => {
                        // Remove the animation on scroll for this section
                        const removeTransitionOnScroll = () => {
                            gsap.set(section, { clearProps: "all" }); // Remove inline styles set by GSAP
                            window.removeEventListener("scroll", removeTransitionOnScroll); // Clean up listener
                        };
                        window.addEventListener("scroll", removeTransitionOnScroll);
                    },
                }
            );
        });

        return () => {
            // Clean up ScrollTrigger instances and scroll listeners on component unmount
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            window.removeEventListener("scroll", () => { }); // Ensure no lingering scroll listeners
        };
    }, []);


    return (
        <div className='w-full h-full max-w-screen-xl mx-auto py-5'>
            {/* INFO */}
            <div className='py-10'>
                <h1 className='gsap-ani text-center text-5xl'><span className='font-medium text-sky-500'>Hi</span>, I'm <span className='font-semibold'>SUDIP GHARA</span></h1>
                <p className='text-xl text-center text-zinc-400 mb-3 gsap-ani'>MERN Stack Developer</p>
                <div className='mx-auto w-[30%] my-3 flex justify-between gsap-ani'>
                    {links.map((l, i) =>
                        <div className='flex items-center gap-3'>
                            <span style={{ boxShadow: "0 0 0.75em #17b4f1" }} className='h-[6px] w-[6px] rounded-full bg-[#17b4f1]'></span>
                            <Link className='text-zinc-400 hover:text-zinc-50' to={l.url}>
                                {l.name}
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Description */}
            <div className='gsap-ani w-[70%] flex flex-col items-center p-4 mx-auto justify-center border-[1px] border-zinc-400 rounded-lg'>    <div className='flex flex-col items-center p-4'>
                <h1 className='text-5xl '>Welcome</h1>
                <h2 className='text-2xl '>To</h2>
                <h3 className='text-3xl '><span className='text-sky-500'>Todo-List</span> Assignment for</h3>
            </div>
                <img className='w-[20%] py-7 ' src="/logo.png" alt="co-logo" />
                <div className='w-[50%] flex justify-center gap-5'>
                    <Link className='bg-sky-600 px-5 py-2 my-4 font-semibold text-zinc-200 hover:text-zinc-50 hover:bg-sky-800 hover:scale-105 transition-all ease-in-out duration-300 rounded' to='/todo-list' >
                        View Project
                    </Link>

                    <Link className='bg-transparent px-5 py-2 my-4 font-medium border-[1px] border-zinc-400 text-zinc-400 hover:text-zinc-200 hover:border-zinc-200 hover:scale-105 transition-all ease-in-out duration-300 rounded' to='https://github.com/SudipGhara19/todo-assignment' >
                        Github Respository
                    </Link>
                </div>
            </div>



        </div>
    )
}

export default WelcomePage