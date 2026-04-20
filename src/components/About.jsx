import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FramerSkills from "./FrameSkills.jsx";
import { focus } from '../constants/index.js';

const About = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const skillsOrbitRef = useRef(null);
    const focusRef = useRef(null);
    const badgeRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(textRef.current,
            { y: 60, opacity: 0, filter: "blur(8px)" },
            {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        gsap.fromTo(skillsOrbitRef.current,
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(0.5)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        gsap.fromTo(focusRef.current,
            { x: 40, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        gsap.fromTo(badgeRef.current,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                delay: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-white dark:bg-gray-950 overflow-hidden"
        >
            {/* ========== Animated stars ========== */}
            <div className="absolute inset-0 pointer-events-none z-0">

                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl animate-[float_20s_ease-in-out_infinite]" />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-[float_25s_ease-in-out_infinite] delay-1000" />
                <div className="absolute top-3/4 left-1/2 w-56 h-56 rounded-full bg-cyan-500/10 blur-3xl animate-[float_18s_ease-in-out_infinite] delay-500" />

                {/* Animated stars Background */}
                {[...Array(50)].map((_, i) => {
                    const size = 2 + Math.random() * 4;
                    const duration = 15 + Math.random() * 20;
                    const delay = Math.random() * 10;
                    const top = Math.random() * 100;
                    const left = Math.random() * 100;
                    const opacity = 0.2 + Math.random() * 0.5;
                    return (
                        <div
                            key={i}
                            className="absolute rounded-full bg-white"
                            style={{
                                width: `${size}px`,
                                height: `${size}px`,
                                top: `${top}%`,
                                left: `${left}%`,
                                opacity: opacity,
                                animation: `drift ${duration}s linear infinite`,
                                animationDelay: `${delay}s`,
                                boxShadow: size > 4 ? `0 0 ${size}px rgba(255,255,255,0.6)` : 'none',
                            }}
                        />
                    );
                })}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
                {/* LEFT SIDE – About text */}
                <div ref={textRef} className="flex-1 space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        About Me
                    </h2>
                    <div className="space-y-5 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                        <p>
                            I’m a web and app developer focused on building clean, responsive, and high-performance digital products.
                        </p>
                        <p>
                            I work with modern tools like React, Tailwind CSS, and JavaScript to turn ideas into real, usable applications. My approach is simple: keep things clear, efficient, and user-focused.
                        </p>
                        <p>
                            I care about the details that make a product feel right — smooth interactions, consistent design, and reliable performance.
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                            Currently open to freelance opportunities and ready to deliver fast, well-structured work.
                        </p>
                    </div>
                    <div ref={badgeRef} className="flex justify-start">
                        <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-5 py-2 rounded-full text-sm font-semibold">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            Available for freelance
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE – Skills Orbit + Focus + Badge */}
                <div className="flex-1 flex flex-col gap-8">
                    <div ref={skillsOrbitRef} className="w-full h-80 rounded-2xl overflow-hidden">
                        <FramerSkills />
                    </div>

                    <div ref={focusRef} className="glass-card rounded-3xl p-8">
                        <h2 className="text-2xl font-semibold text-white mb-6 border-l-4 border-rose-500 pl-3">
                            What I focus on
                        </h2>
                        <div className="space-y-6 max-w-2xl mx-auto">
                            {focus.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="group relative pl-8 border-l-2 border-white/20 hover:border-white/50 transition-all duration-300"
                                >
                                    <div className="absolute -left-3 top-1 w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/50 transition-all"></div>
                                    <h3 className="text-xl font-semibold text-white group-hover:translate-x-1 transition-transform">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-1">
                                        {item.description}
                                    </p>
                                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-white/50 to-transparent group-hover:w-full transition-all duration-500"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;