import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/Header";
import Hero from "./components/Hero.jsx";
import ParticlesBackground from "./components/ParticlesBackground.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import About from "./components/About.jsx";
import Projects from './components/Projects.jsx'

const App = () => {
    useEffect(() => {
        gsap.registerPlugin( ScrollTrigger )

        ScrollTrigger.refresh()

        return () => {
            ScrollTrigger.getAll().forEach( ( trigger ) => trigger.kill())
        }
    },[])
    return (
        <div className={'relative min-h-screen'}>
            <ParticlesBackground />
            <Header />
            <Hero />
            <About />
            <Projects />
            <CustomCursor />
        </div>
    );
};

export default App;