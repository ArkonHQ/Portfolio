import { motion } from 'framer-motion';
import ParticlesText from "./ParticlesText.jsx";
import { useState, useEffect } from "react";

const Hero = () => {
    const [particleScale, setParticleScale] = useState(2.5);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) setParticleScale(2.0);
            else if (width < 768) setParticleScale(2.2);
            else if (width < 1024) setParticleScale(2.5);
            else setParticleScale(2.2);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section
            id={'home'}
            className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-5 sm:px-8 md:px-12 lg:px-24 py-8 sm:py-12 gap-8 lg:gap-12 overflow-hidden">
            {/* Left Text Section */}
            <div className="flex-1 max-lg:mt-20 max-w-2xl text-center lg:text-left z-10 w-full">
                <motion.h1
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 50, damping: 25, delay: 1.3 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
                >
                    I build web and app experiences that people actually enjoy using.
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 50, damping: 25, delay: 1.8 }}
                    className="backdrop-blur-3xl rounded-2xl border border-white/20 bg-white/5 p-5 sm:p-6 shadow-lg w-full max-w-md lg:max-w-none mx-auto lg:mx-0"
                >
                    <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
                        From concept to execution, I focus on creating fast, intuitive, and scalable products with a strong attention to detail and user experience.
                    </p>
                </motion.div>
            </div>

            {/* Right Side – 3D Particle Text */}
            <div className="flex-1 w-full lg:w-1/2 mt-6 lg:mt-0">
                <div className="h-56 sm:h-64 md:h-80 lg:h-[500px]">
                    <ParticlesText
                        className="w-full h-full"
                        enableZoom={false}
                        scale={particleScale}
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;