import Header from "./components/Header";
import Hero from "./components/Hero.jsx";
import ParticlesBackground from "./components/ParticlesBackground.jsx";
import CustomCursor from "./components/CustomCursor.jsx";

const App = () => {
    return (
        <div className={'relative min-h-screen'}>
            <ParticlesBackground />
            <Header />
            <Hero />
            <CustomCursor />
        </div>
    );
};

export default App;