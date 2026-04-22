import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectImage } from "../constants/index.js";
import { SlShareAlt } from "react-icons/sl";
import StarsBackground from "./StarsBackground.jsx";

const Projects = () => {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const titleLineRef = useRef(null)
    const horizontalRef = useRef(null)
    const triggerRef = useRef(null)


    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        // title animation
        gsap.fromTo(
            titleRef.current,
            {
                y: 100,
                opacity: 0,
            }, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: 'play none none reverse'
            }
        }
        )

        // Title line animation
        gsap.fromTo(
            titleLineRef.current,
            {
                opacity: 0,
                width: '0%',
            }, {
            width: '100%',
            opacity: 1,
            duration: 1.5,
            ease: 'power3.inOut',
            delay: 0.3,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: 'play none none reverse',
            }
        }
        )

        // Section entrance
        gsap.fromTo(
            triggerRef.current,
            {
                opacity: 0,
                y: 100,
                rotationX: 20,
            }, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: 'power3.inOut',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: 'play none none reverse',
            }
        }
        )

        // Parallax effect for the section
        gsap.fromTo(
            sectionRef.current,
            {
                backgroundPosition: '50% 0%',
            }, {
            backgroundPosition: '50% 100%',
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: 'bottom top',
                scrub: true,
            }
        }
        )


        //Horizontal Scrolling animation
        const horizontalScroll = gsap.to('.panel', {
            xPercent: -100 * (projectImage.length - 1),
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${horizontalRef.current.offsetWidth}`,
                pin: true,
                scrub: 1,
                snap: {
                    snapTo: 1 / (projectImage.length - 1),
                    duration: { min: 0.2, max: 0.3 },
                    delay: 0.1,
                },
                invalidateOnRefresh: true,
            }
        })

        // Image Animation
        const panels = gsap.utils.toArray('.panel')
        panels.forEach((panel) => {
            const image = panel.querySelector('.project-image')
            const projectInfo = panel.querySelector('.project-info')

            // Timeline for each panel
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: panel,
                    containerAnimation: horizontalScroll,
                    start: 'left right',
                    end: 'right left',
                    scrub: true,
                }
            })

            // Image scale and opacity
            tl.fromTo(image,
                { scale: 0.8, rotate: -20 },
                { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(0.5)" }
            );
            // Info text animation
            if (projectInfo) {
                tl.fromTo(projectInfo, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, 0.2)
            }
        })
    }, [projectImage.length]);

    return (
        <section
            id={'projects'}
            className={'relative w-full overflow-hidden py-20 '}
            ref={sectionRef}>

            <StarsBackground triggerRef={sectionRef} orbColors={["slate", "gray", "zinc"]} />

            {/*  Section Title  */}
            <div className={'container mx-auto px-4 mb-16 relative z-10'}>
                <h2 ref={titleRef} className={'text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center opacity-0 mb-4'}>My Projects</h2>
                <div ref={titleLineRef} className={"w-0 h-1 bg-linear-to-r from-slate-900/80 to-gray-700/80 mx-auto opacity-0"}></div>
            </div>

            {/*  Horizontal Scroll Section  */}
            <div ref={triggerRef} className={'overflow-hidden opacity-0'}>
                <div ref={horizontalRef} className={'flex md:w-[400%] w-[420%] horizontal-section'}>
                    {projectImage.map((project) => (
                        <div loading="true" key={project.id} className={'panel relative flex items-center justify-center'}>
                            {/* Project Info */}
                            <div className={'project-info absolute top-8 left-8 md:top-16 md:left-16 z-30 max-w-xs md:max-w-md'}>
                                <h2 className={'flex items-center gap-3 text-2xl md:text-4xl font-bold text-white mb-3 hover:text-gray-400 transition-colors duration-200 cursor-none'}>
                                    {project.title} <SlShareAlt className="text-xl md:text-2xl" />
                                </h2>
                                <p className={'text-gray-300 text-sm md:text-base leading-relaxed '}>
                                    {project.description}
                                </p>
                            </div>

                            <div className={'relative w-full h-full flex flex-col justify-start items-center p-4 pt-32 sm:p-8 sm:pt-40 md:p-12 md:pt-40'}>
                                <img
                                    className={'project-image w-[85vw] md:w-[65vw] lg:w-[55vw] max-h-[60vh] md:max-h-[75vh] rounded-2xl object-cover shadow-2xl'}
                                    src={project.imageSrc}
                                    alt={project.title} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default Projects
