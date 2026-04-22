import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const Contact = () => {

    const circleRef = useRef(null)
    const sectionRef = useRef(null)
    const initialTextRef = useRef(null)
    const finalTextRef = useRef(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const cleanup = () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === sectionRef.current){
                    trigger.kill(true)
                }
            })
        }

        // Clean up any existing ScrollTrigger
        cleanup()

        // set initial states
        gsap.set(circleRef.current, { scale:1, backgroundColor: 'black' })
        gsap.set(initialTextRef.current, { opacity: 1 })
        gsap.set(finalTextRef.current, { opacity: 0 })

        // Create the main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: "+=200%",
                pin: true,
                scrub:0.5 ,
                anticipate: 1,
                fastScrollEnd: true,
                preventOverlaps: true,
                invalidateOnRefresh: true,
            }
        })

        // initial state to mid-zoom (0 - 50% )
        tl.to (
            circleRef.current,{
                scale: 5,
                backgroundColor: '#0F172B',
                ease: 'power1.inOut',
                duration: 0.5,
            },0
        )

        // Fade out initial text during first half
        tl.to (
            initialTextRef.current,{
                opacity: 0,
                ease: 'power1.inOut',
                duration: 0.2,
            }, 0.1,
        )

        // Mid-zoom to final state (50% - 100%)
        tl.to (
            circleRef.current,{
                scale: 17,
                backgroundColor: '#636363',
                boxShadow: '0 0 50px 20px rgba(0, 0, 0, 0.5)',
                ease: 'power2.inOut',
                duration: 0.5,
            }, 0.5,
        )

        // Fade in final text during second half
        tl.to (
            finalTextRef.current,{
                opacity: 1,
                ease: 'power2.inOut',
                duration: 0.2,
            },0.7,
        )

        return cleanup
    })



    return (
        <section
            ref={sectionRef}
            id={'contact'}
            className={'relative h-screen flex items-center justify-center overflow-hidden bg-[#CACBD1]'}
            style={{ overscrollBehavior: 'none'}}>

        {/*  Simple circle  */}
            <div
                 ref={circleRef}
                 className={'w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full flex justify-center items-center relative transition-shadow duration-1000 shadow-slate-400/50 shadow-lg bg-linear-to-r from-slate-900/80 to-gray-700/80'}>
            {/*    Initial Text */}
                <p ref={initialTextRef}
                   className={'text-white font-bold text-base sm:text-lg md:text-xl absolute inset-0 flex items-center text-center'}>
                SCROLL DOWN
                </p>
            {/*   final text  */}
                <div ref={finalTextRef}
                     className={'text-center relative flex flex-col items-center justify-center opacity-0'}>
                    <h1 className={'text-white md:w-[10rem] w-[20rem] lg:scale-[0.4] sm:scale-[0.25] scale-[0.07] md:font-bold text-sm sm:text-base leading-none mb-5'}>
                        Let’s build your next web interface.
                    </h1>
                    <p className={'text-white lg:w-[40rem] w-[20rem] absolute sm:mt-3 mt-1 md:scale-[0.1] scale-[0.068]'}>
                        I design and develop clean, responsive, and user-friendly web experiences using modern frontend tools. Fast delivery, clear communication, and reliable results.
                    </p>

                    <button className={'px-10 py-2 max-sm:mt-6 rounded-xl bg-white hover:bg-black hover:text-white transition-all duration-500 scale-[0.1] absolute sm:mt-9 mt07 text-nowrap text-black cursor-none'}>
                        Contact me
                    </button>
                </div>
            </div>
        </section>
    )
}
export default Contact
