// src/components/ParticlesText.jsx
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const ParticlesText = ({ className = "", enableZoom = true, scale = 1.5 }) => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const controlsRef = useRef(null);
    const particleSystemRef = useRef(null);
    const animationIdRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) {
            setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
            return;
        }

        // --- Scene with transparent background ---
        const scene = new THREE.Scene();
        scene.background = null;
        sceneRef.current = scene;

        // --- Camera ---
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 1.2, 10);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // --- Renderer with alpha (transparent) ---
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // --- Controls: zoom only on non‑touch devices (or as per prop) ---
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = false;
        controls.enableZoom = enableZoom && !isTouchDevice;  // only zoom on mouse devices
        controls.enablePan = false;
        controls.target.set(0, 0.3, 0);
        controlsRef.current = controls;

        // --- Generate particles from canvas text "ARKON" ---
        const textStr = "ARKON";
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 300;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'Bold 110px "Inter", system-ui';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(textStr, canvas.width / 2, canvas.height / 2);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const particlePositions2D = [];
        const step = 2;

        for (let y = 0; y < canvas.height; y += step) {
            for (let x = 0; x < canvas.width; x += step) {
                const idx = (y * canvas.width + x) * 4;
                if (data[idx] > 200) {
                    const px = (x / canvas.width) * 5.5 - 2.75;
                    const py = -(y / canvas.height) * 2.8 + 1.4;
                    particlePositions2D.push({ x: px, y: py });
                }
            }
        }

        const particleCount = particlePositions2D.length;
        const geometry = new THREE.BufferGeometry();
        const originalPositions = new Float32Array(particleCount * 3);
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const velocities = [];

        // Gray/silver color palette
        const silver = new THREE.Color(0xc0c0c0);
        const lightGray = new THREE.Color(0x9ca3af);

        for (let i = 0; i < particleCount; i++) {
            const pos2D = particlePositions2D[i];
            const z = (Math.random() - 0.5) * 0.4;
            originalPositions[i * 3] = pos2D.x;
            originalPositions[i * 3 + 1] = pos2D.y;
            originalPositions[i * 3 + 2] = z;
            positions[i * 3] = pos2D.x;
            positions[i * 3 + 1] = pos2D.y;
            positions[i * 3 + 2] = z;

            const mixFactor = (pos2D.x + 2.75) / 5.5;
            const color = silver.clone().lerp(lightGray, mixFactor);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            velocities.push({
                vx: (Math.random() - 0.5) * 0.06,
                vy: (Math.random() - 0.5) * 0.06,
                vz: (Math.random() - 0.5) * 0.04,
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.09,
            vertexColors: true,
            transparent: true,
            opacity: 0.95,
            blending: THREE.AdditiveBlending,
        });
        const particleSystem = new THREE.Points(geometry, particleMaterial);
        scene.add(particleSystem);
        particleSystemRef.current = particleSystem;

        // Apply the scale prop to make the entire text bigger
        particleSystem.scale.set(scale, scale, scale);

        // --- Mouse interaction (3D repulsion) ---
        const mouse = new THREE.Vector2();
        const mouse3D = new THREE.Vector3();
        const raycaster = new THREE.Raycaster();

        const onMouseMove = (event) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
            const targetPoint = new THREE.Vector3();
            if (raycaster.ray.intersectPlane(plane, targetPoint)) {
                mouse3D.copy(targetPoint);
            } else {
                mouse3D.set(0, 0, 0);
            }
        };
        window.addEventListener('mousemove', onMouseMove);

        // --- Animation: spring + mouse repulsion ---
        const springStrength = 0.045;
        const mouseForce = 0.9;

        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate);
            const positionAttribute = particleSystem.geometry.attributes.position;
            const array = positionAttribute.array;

            for (let i = 0; i < particleCount; i++) {
                const ix = i * 3;
                const iy = i * 3 + 1;
                const iz = i * 3 + 2;

                let px = array[ix];
                let py = array[iy];
                let pz = array[iz];

                const ox = originalPositions[ix];
                const oy = originalPositions[iy];
                const oz = originalPositions[iz];

                let fx = (ox - px) * springStrength;
                let fy = (oy - py) * springStrength;
                let fz = (oz - pz) * springStrength;

                const dx = px - mouse3D.x;
                const dy = py - mouse3D.y;
                const dz = pz - mouse3D.z;
                const distSq = dx * dx + dy * dy + dz * dz;
                const radius = 1.2;
                if (distSq < radius * radius && distSq > 0.01) {
                    const dist = Math.sqrt(distSq);
                    const force = (1 - dist / radius) * mouseForce;
                    const normX = dx / dist;
                    const normY = dy / dist;
                    const normZ = dz / dist;
                    fx += normX * force;
                    fy += normY * force;
                    fz += normZ * force;
                }

                velocities[i].vx += fx * 0.1;
                velocities[i].vy += fy * 0.1;
                velocities[i].vz += fz * 0.1;
                velocities[i].vx *= 0.94;
                velocities[i].vy *= 0.94;
                velocities[i].vz *= 0.94;

                array[ix] += velocities[i].vx;
                array[iy] += velocities[i].vy;
                array[iz] += velocities[i].vz;
            }
            positionAttribute.needsUpdate = true;

            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // --- Resize handler ---
        const handleResize = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            if (w === 0 || h === 0) return;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        // --- Cleanup ---
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);
            if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
            renderer.dispose();
            if (container && renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [scale, enableZoom]);

    return <div ref={containerRef} className={`w-full h-full ${className}`} style={{ background: 'transparent', touchAction: 'pan-x pan-y' }} />;
};

export default ParticlesText;