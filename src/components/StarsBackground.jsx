import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const StarsBackground = ({ triggerRef, orbColors = ["purple", "blue", "cyan"] }) => {
    const starsRef = useRef([]);
    const scrollTriggers = useRef([]);

    const addToStars = (element) => {
        if (element && !starsRef.current.includes(element)) {
            starsRef.current.push(element);
        }
    };

    // Generate random star positions only once (stable across re‑renders)
    const starsData = useMemo(() => {
        return [...Array(50)].map(() => ({
            size: 2 + Math.random() * 4,
            top: Math.random() * 100,
            left: Math.random() * 100,
            opacity: 0.2 + Math.random() * 0.5,
        }));
    }, []);

    useEffect(() => {
        if (!triggerRef?.current) return;

        gsap.registerPlugin(ScrollTrigger);

        // Star animations
        starsRef.current.forEach((star, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            const speed = 0.5 + Math.random() * 0.5;
            const animation = gsap.to(star, {
                x: direction * (150 + (index % 10) * 20),
                y: direction * (100 + (index % 8) * 15),
                rotate: direction * 360,
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: speed,
                },
            });
            // Store ScrollTrigger instance for cleanup
            if (animation.scrollTrigger) {
                scrollTriggers.current.push(animation.scrollTrigger);
            }
        });

        // Cleanup
        return () => {
            scrollTriggers.current.forEach((st) => st.kill());
            scrollTriggers.current = [];
        };
    }, [triggerRef]);

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            {/* Floating orbs */}
            <div
                className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-${orbColors[0]}-500/10 blur-3xl animate-[float_20s_ease-in-out_infinite]`}
            />
            <div
                className={`absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-${orbColors[1]}-500/10 blur-3xl animate-[float_25s_ease-in-out_infinite] delay-1000`}
            />
            <div
                className={`absolute top-3/4 left-1/2 w-56 h-56 rounded-full bg-${orbColors[2]}-500/10 blur-3xl animate-[float_18s_ease-in-out_infinite] delay-500`}
            />

            {/* Stars */}
            {starsData.map((star, i) => (
                <div
                    key={i}
                    ref={addToStars}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        top: `${star.top}%`,
                        left: `${star.left}%`,
                        opacity: star.opacity,
                        boxShadow:
                            star.size > 4 ? `0 0 ${star.size}px rgba(255,255,255,0.6)` : "none",
                    }}
                />
            ))}
        </div>
    );
};

export default StarsBackground;