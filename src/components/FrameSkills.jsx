import React from "react";
import {skillsInner, skillsOuter} from "../constants/index.js";

const FramerSkills = () => {
    return (
        <div className="relative w-full h-full overflow-hidden rounded-2xl bg-white/5 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-sm">
            {/* The orbiting stage */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 -mr-[260px] w-[520px] h-[520px]">
                // Inside the orbiting stage, before the outer orbit:
                <div className="absolute top-1/2 right-1/2 w-[400px] h-[400px] -mr-[200px] -mt-[200px] rounded-full border border-white/10 pointer-events-none" />
                <div className="absolute top-1/2 right-1/2 w-[260px] h-[260px] -mr-[130px] -mt-[130px] rounded-full border border-white/10 pointer-events-none" />
                {/* Outer orbit */}
                <div className="absolute top-1/2 right-1/2 w-[400px] h-[400px] -mr-[200px] -mt-[200px] animate-[spin_24s_linear_infinite]">
                    {skillsOuter.map((skill, idx) => {
                        const angle = (360 / skillsOuter.length) * idx;
                        return (
                            <div
                                key={skill.name}
                                className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 rounded-full bg-gray-800/80 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 hover:bg-linear-to-br hover:bg-white/20 hover:backdrop-blur-md hover:shadow-lg hover:shadow-gray-400/30 group"
                                style={{
                                    transform: `rotate(${angle}deg) translateX(200px) rotate(-${angle}deg)`,
                                }}
                            >
                                <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded-full bg-gray-900 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-20">
                  {skill.name}
                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Inner orbit */}
                <div className="absolute top-1/2 right-1/2 w-[260px] h-[260px] -mr-[130px] -mt-[130px] animate-[spin-reverse_18s_linear_infinite]">
                    {skillsInner.map((skill, idx) => {
                        const angle = (360 / skillsInner.length) * idx;
                        return (
                            <div
                                key={skill.name}
                                className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 rounded-full bg-gray-800/80 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 hover:bg-linear-to-br hover:bg-white/20 hover:backdrop-blur-md hover:shadow-lg hover:shadow-gray-400/30 group"
                                style={{
                                    transform: `rotate(${angle}deg) translateX(130px) rotate(-${angle}deg)`,
                                }}
                            >
                                <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" />
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded-full bg-gray-900 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
                  {skill.name}
                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FramerSkills;