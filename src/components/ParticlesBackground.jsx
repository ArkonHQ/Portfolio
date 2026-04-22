import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParticleBackground = () => {
    const containerRef = useRef(null);
    const particlesRef = useRef([]);
    const animationRef = useRef(null);

    useEffect(() => {
        const createParticles = (container, count, sizeRange, opacityRange, speedFactor) => {
            const particles = [];
            const w = window.innerWidth;
            const h = window.innerHeight;
            for (let i = 0; i < count; i++) {
                const size = sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]);
                const div = document.createElement('div');
                div.classList.add('particle');
                div.style.width = `${size}px`;
                div.style.height = `${size}px`;
                div.style.left = `${Math.random() * w}px`;
                div.style.top = `${Math.random() * h}px`;
                div.style.opacity = opacityRange[0] + Math.random() * (opacityRange[1] - opacityRange[0]);
                container.appendChild(div);
                particles.push({
                    dom: div,
                    startX: parseFloat(div.style.left),
                    startY: parseFloat(div.style.top),
                    moveRangeX: (Math.random() - 0.5) * 120 * speedFactor,
                    moveRangeY: (Math.random() - 0.5) * 160 * speedFactor,
                    speed: speedFactor,
                });
            }
            return particles;
        };

        const layerFg = document.getElementById('particle-layer-fg');
        const layerMid = document.getElementById('particle-layer-mid');
        const layerBg = document.getElementById('particle-layer-bg');

        if (!layerFg || !layerMid || !layerBg) return;

        const fgParticles = createParticles(layerFg, 80, [2, 5], [0.4, 0.7], 1.2);
        const midParticles = createParticles(layerMid, 60, [3, 7], [0.3, 0.6], 0.8);
        const bgParticles = createParticles(layerBg, 40, [4, 8], [0.2, 0.5], 0.4);
        const allParticles = [...fgParticles, ...midParticles, ...bgParticles];
        particlesRef.current = allParticles;

        let scrollProgress = 0;
        const scrollTrigger = ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            onUpdate: (self) => {
                scrollProgress = self.progress;
                allParticles.forEach((p) => {
                    const dx = p.moveRangeX * scrollProgress;
                    const dy = p.moveRangeY * scrollProgress;
                    p.dom.style.transform = `translate(${dx}px, ${dy}px)`;
                });
            },
        });

        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;
        const handleMouseMove = (e) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 30;
            targetY = (e.clientY / window.innerHeight - 0.5) * 20;
        };
        window.addEventListener('mousemove', handleMouseMove);

        const animateMouse = () => {
            mouseX += (targetX - mouseX) * 0.08;
            mouseY += (targetY - mouseY) * 0.08;
            allParticles.forEach((p) => {
                const mouseShiftX = mouseX * p.speed * 0.5;
                const mouseShiftY = mouseY * p.speed * 0.5;
                const scrollX = p.moveRangeX * scrollProgress;
                const scrollY = p.moveRangeY * scrollProgress;
                p.dom.style.transform = `translate(${scrollX + mouseShiftX}px, ${scrollY + mouseShiftY}px)`;
            });
            animationRef.current = requestAnimationFrame(animateMouse);
        };
        animateMouse();

        const handleResize = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            allParticles.forEach((p) => {
                if (!p.origRelX) {
                    p.origRelX = p.startX / window.innerWidth;
                    p.origRelY = p.startY / window.innerHeight;
                }
                p.startX = p.origRelX * w;
                p.startY = p.origRelY * h;
                p.dom.style.left = `${p.startX}px`;
                p.dom.style.top = `${p.startY}px`;
                p.dom.style.transform = `translate(0px, 0px)`;
            });
            if (scrollTrigger) scrollTrigger.update();
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (scrollTrigger) scrollTrigger.kill();
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            allParticles.forEach((p) => {
                if (p.dom && p.dom.parentNode) p.dom.parentNode.removeChild(p.dom);
            });
        };
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none -z-10">

            <div className="absolute inset-0 bg-linear-to-br from-gray-900/90 via-slate-900 to-black -z-20" />
            <div className="absolute inset-0 bg-black/60 -z-10" />

            <div id="particle-layer-fg" className="particle-layer layer-fg" />
            <div id="particle-layer-mid" className="particle-layer layer-mid" />
            <div id="particle-layer-bg" className="particle-layer layer-bg" />
        </div>
    );
};

export default ParticleBackground;