import gsap from "gsap"
import { useRef, useEffect} from "react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

const About = () => {

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const intoRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        // Title animation
        gsap.fromTo (
            titleRef.current,
            {y:100 , opacity:0},
            {
                y:-300,
                opacity:1,
                duration:0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 40%',
                    toggleActions: 'play none none reverse',
                }
            }
        )
        // Intro Animation
        gsap.fromTo(intoRef.current,
            { y:100, opacity:0, filter:'blur(10px)' },
            {
                y: -400,
                opacity:1,
                filter:'blur(0px)',
                duration:1.5,
                scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 40%',
                toggleActions: 'play none none reverse',
            }},
            )
    })

    return (
        <section
            ref={sectionRef}
            className="h-screen relative overflow-hidden">
            <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
            <h1
                ref={titleRef}
                className={'text-4xl md:text-6xl font-bold sm:mb-16 text-center text-white opacity-0 '}>About Me</h1>
            </div>
            <div ref={ intoRef }
                className={'absolute lg:bottom-[-20rem] md:bottom-[-10rem] bottom-[-20rem] left-0 w-full flex md:flex-row flex-col justify-between lg:ps-24 px-5 items-center opacity-0'}>
                <h3 className={'text-sm md:text-2xl font-bold text-slate-400 z-20 lg:max-w-[45rem] max-w-[27rem] tracking-wider md:mt-[-40rem] mt-[-32rem]'}>
                    I’m a web and app developer focused on building clean, responsive, and high-performance digital products.

                    I work with modern tools like React, Tailwind CSS, and JavaScript to turn ideas into real, usable applications. My approach is simple: keep things clear, efficient, and user-focused.

                    I care about the details that make a product feel right — smooth interactions, consistent design, and reliable performance.

                    Currently open to freelance opportunities and ready to deliver fast, well-structured work.

                </h3>
            </div>
            </section>
    )
}
export default About
