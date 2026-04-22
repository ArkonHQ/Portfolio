import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./components/Header";
import Hero from "./components/Hero.jsx";
import ParticlesBackground from "./components/ParticlesBackground.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import About from "./components/About.jsx";
import Projects from './components/Projects.jsx'
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ProgressBar from "./components/ProgressBar.jsx";

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
            <Projects />
            <About />
            <Contact />
            <Footer />
            <CustomCursor />
            <ProgressBar />
        </div>
    );
};

export default App;