import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorBorderRef = useRef(null);

    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return null;

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorBorder = cursorBorderRef.current;
        if (!cursor || !cursorBorder) return;

        // Initial position off-screen
        gsap.set([cursor, cursorBorder], {
            xPercent: -50,
            yPercent: -50,
        });

        // Store current mouse coordinates
        let mouseX = 0, mouseY = 0;

        // Move dot INSTANTLY
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // Dot follows mouse instantly
            gsap.set(cursor, { x: mouseX, y: mouseY });
        };

        // Border follows the dot's position with a delay
        const xToBorder = gsap.quickTo(cursorBorder, 'x', { duration: 0.4, ease: 'power3.out' });
        const yToBorder = gsap.quickTo(cursorBorder, 'y', { duration: 0.4, ease: 'power3.out' });

        // Continuously update border to follow the dot's current position
        const updateBorder = () => {
            xToBorder(mouseX);
            yToBorder(mouseY);
            requestAnimationFrame(updateBorder);
        };
        const frameId = requestAnimationFrame(updateBorder);

        // Adding hover effects
        const handleMouseOver = () => {
            gsap.to(cursorBorder, { scale: 1.6, duration: 0.25, ease: 'back.out(1)' });
            gsap.to(cursor, { scale: 1.3, backgroundColor: '#ffffff', duration: 0.2 });
        };
        const handleMouseOut = () => {
            gsap.to(cursorBorder, { scale: 1, duration: 0.3, ease: 'power2.out' });
            gsap.to(cursor, { scale: 1, backgroundColor: '#ffffff', duration: 0.2 });
        };

        // Adding click animation
        document.addEventListener('mousedown', () => {
            gsap.to([cursor, cursorBorder], {
                scale: 0.6,
                duration: 0.2,
            });
        });
        document.addEventListener('mouseup', () => {
            gsap.to([cursor, cursorBorder], {
                scale: 1,
                duration: 0.2,
            })
        });

        // Attach listeners
        const interactiveElements = document.querySelectorAll('button, a, [role="button"], .cursor-pointer');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseOver);
            el.addEventListener('mouseleave', handleMouseOut);
        });

        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseOver);
                el.removeEventListener('mouseleave', handleMouseOut);
            });
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <>
            {/* Glow trail particles container */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]">
                {/* Main dot */}
                <div
                    ref={cursorRef}
                    className="absolute w-[12px] h-[12px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    style={{ willChange: 'transform' }}
                />
                {/* Outer ring */}
                <div
                    ref={cursorBorderRef}
                    className="absolute w-8 h-8 border-2 border-white/60 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    style={{ willChange: 'transform' }}
                />
            </div>
        </>
    );
};

export default CustomCursor;