import { motion } from 'framer-motion';
import ParticlesText from "./ParticlesText.jsx";
import { useState } from "react";

const Hero = () => {
    return (
        <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-12 gap-12 overflow-hidden">
            {/* Left Text Section */}
            <div className="flex-1 max-w-2xl text-center lg:text-left z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 50, damping: 25, delay: 1.3 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                >
                    I build web and app experiences that people actually enjoy using.
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 50, damping: 25, delay: 1.8 }}
                    className="text-base sm:text-lg md:text-xl text-slate-400 p-3 space-y-4 mt-4 w-150 h-28 backdrop-blur-3xl rounded-2xl border-2 border-gray-500 bg-white/10 "
                >
                    <p>
                        From concept to execution, I focus on creating fast, intuitive, and scalable products with a strong attention to detail and user experience.
                    </p>
                </motion.div>
            </div>

            {/* Right Side – 3D Particle Text*/}
            <div className="flex-1 w-full lg:w-1/2 h-100 md:h-125 lg:h-150">
                <ParticlesText className="w-full h-full" enableZoom={false} scale={2} />
            </div>
        </section>
    );
};

export default Hero;