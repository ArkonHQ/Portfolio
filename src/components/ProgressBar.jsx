import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ProgressBar = () => {

    const progressRef = useRef(null);
    const progressFillRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(progressFillRef.current, {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3,
                onUpdate: (self) => {
                    const progress = self.progress.toFixed(2);

                    // Change color based on progress – using your page colors
                    if (progress > 0.75) {
                        gsap.to(progressFillRef.current, { backgroundColor: '#0f172a', duration: 0.5 }); // slate-900
                    } else if (progress > 0.5) {
                        gsap.to(progressFillRef.current, { backgroundColor: '#3b82f6', duration: 0.5 }); // blue-500
                    } else if (progress > 0.10) {
                        gsap.to(progressFillRef.current, { backgroundColor: '#06b6d4', duration: 0.5 }); // cyan-500
                    } else {
                        gsap.to(progressFillRef.current, { backgroundColor: '#64748b', duration: 0.5 }); // slate-500
                    }
                },
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((element) => {
                if (element.vars.trigger === document.body) {
                    element.kill();
                }
            });
        };
    }, []);

    return (
        <div
            ref={progressRef}
            className={'fixed top-0 left-0 w-full h-[5px] bg-white/40 z-50'}>
            <div
                ref={progressFillRef}
                className={'h-full w-0 transition-colors duration-300'}
                style={{ width: '0%' }} />
        </div>
    );
};

export default ProgressBar;