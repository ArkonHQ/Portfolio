import { motion, AnimatePresence } from 'framer-motion' 
import { FiGithub, FiLinkedin, FiMenu, FiX, FiSend } from 'react-icons/fi' 
import { useState, useEffect } from "react" 
import { navContent } from '../constants/index.js' 
import { Link as ScrollLink } from 'react-scroll' 

const Header = () => {
    const [isOpen, setIsOpen] = useState(false) 
    const [contactFormOpen, setContactFormOpen] = useState(false) 
    const [scrolled, setScrolled] = useState(false) 
    const [activeSection, setActiveSection] = useState('home') 
    const [formStatus, setFormStatus] = useState({ type: '', message: '' }) 
    const [isSubmitting, setIsSubmitting] = useState(false) 

    const toggleMenu = () => setIsOpen(!isOpen) 
    const openContactForm = () => setContactFormOpen(true) 
    const closeContactForm = () => setContactFormOpen(false) 

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20) 

            const sections = ['home', 'about', 'projects', 'contact'] 
            const scrollPos = window.scrollY + 100 
            for (const section of sections) {
                const element = document.getElementById(section) 
                if (element) {
                    const offsetTop = element.offsetTop 
                    const offsetBottom = offsetTop + element.offsetHeight 
                    if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
                        setActiveSection(section) 
                        break 
                    }
                }
            }
        } 
        window.addEventListener('scroll', handleScroll) 
        return () => window.removeEventListener('scroll', handleScroll) 
    }, []) 

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault() 
        setIsSubmitting(true) 
        setFormStatus({ type: '', message: '' }) 

        // Simulate API call
        setTimeout(() => {
            setFormStatus({ type: 'success', message: 'Message sent! I’ll get back to you soon.' }) 
            setIsSubmitting(false) 
            setTimeout(() => {
                setFormStatus({ type: '', message: '' }) 
                closeContactForm() 
            }, 2000) 
        }, 1500) 
    } 

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                    scrolled
                        ? 'bg-black/80 backdrop-blur-md shadow-lg border-b border-white/10'
                        : 'bg-transparent'
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between cursor-none h-16 md:h-20">
                    {/* LOGO */}
                    <motion.div
                        initial={{opacity: 0, x: -50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{type: "spring", stiffness: 100, damping: 25, delay: 0.3}}
                        className="flex items-center cursor-none group"
                        whileHover={{scale: 1.02}}
                    >
                        <div
                            className="text-2xl font-bold tracking-tighter bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent cursor-none">Arkon
                        </div>
                    </motion.div>

                    {/* DESKTOP NAVIGATION – Underline + Glow */}
                    <nav className="hidden lg:flex space-x-8">
                        {navContent.map((item) => (
                            <ScrollLink
                                key={item}
                                to={item.toLowerCase()}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onSetActive={() => setActiveSection(item.toLowerCase())}
                                className={`relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group cursor- none ${
                                    activeSection === item.toLowerCase() ? 'text-white' : ''
                                }`}
                            >
                                {item}
                                <span className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r  from-slate-800/80 to-gray-600/80 transition-all duration-300 ${
                                    activeSection === item.toLowerCase()
                                        ? 'w-full'
                                        : 'w-0 group-hover:w-full'
                                }`} />
                            </ScrollLink>
                        ))}
                    </nav>

                    {/* DESKTOP SOCIAL + HIRE BUTTON */}
                    <div className="hidden md:flex items-center space-x-4">
                        <motion.a
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.3 }}
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white cursor-none transition-colors duration-300"
                            whileHover={{ y: -2 }}
                        >
                            <FiGithub className="w-5 h-5" />
                        </motion.a>
                        <motion.a
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.4 }}
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white cursor-none transition-colors duration-300"
                            whileHover={{ y: -2 }}
                        >
                            <FiLinkedin className="w-5 h-5" />
                        </motion.a>
                        <motion.button
                            onClick={openContactForm}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.6 }}
                            className="px-5 py-2 rounded-full bg-linear-to-r cursor-none from-slate-700/50 to-gray-400 text-white font-semibold shadow-lg hover:shadow-white/30 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Hire Me
                        </motion.button>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <div className="md:hidden flex items-center">
                        <motion.button
                            whileTap={{ scale: 0.7 }}
                            onClick={toggleMenu}
                            className="text-gray-300 p-2 rounded-lg backdrop-blur-sm bg-white/5"
                        >
                            {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                        </motion.button>
                    </div>
                </div>

                {/* MOBILE MENU (slide-in from right) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-16 right-0 bottom-0 w-64 bg-black/90 backdrop-blur-2xl shadow-2xl z-50 p-6 flex flex-col gap-6 border-l border-white/10"
                        >
                            <nav className="flex flex-col gap-4">
                                {navContent.map((item) => (
                                    <ScrollLink
                                        key={item}
                                        to={item.toLowerCase()}
                                        spy={true}
                                        smooth={true}
                                        offset={-70}
                                        duration={500}
                                        onClick={toggleMenu}
                                        className="text-gray-300 hover:text-white text-lg font-medium py-2 border-b border-white/10 hover:border-cyan-400 transition-all"
                                    >
                                        {item}
                                    </ScrollLink>
                                ))}
                            </nav>
                            <div className="flex gap-5 pt-4 border-t border-white/20">
                                <a href="https://github.com" target="_blank" className="text-gray-400 hover:text-white">
                                    <FiGithub className="w-5 h-5" />
                                </a>
                                <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-white">
                                    <FiLinkedin className="w-5 h-5" />
                                </a>
                            </div>
                            <button
                                onClick={() => {
                                    toggleMenu() 
                                    openContactForm() 
                                }}
                                className="mt-2 w-full px-4 py-2 rounded-full bg-linear-to-r from-slate-400 to-slate-800 text-white font-semibold transition-all hover:shadow-lg"
                            >
                                Contact Me
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* CONTACT FORM MODAL (unchanged, but improved styling) */}
            <AnimatePresence>
                {contactFormOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
                        onClick={closeContactForm}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 30 }}
                            transition={{ type: "spring", stiffness: 200, damping: 30 }}
                            className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                    Get In Touch
                                </h2>
                                <button onClick={closeContactForm} className="text-gray-400 hover:text-white">
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your name"
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                                    <textarea
                                        rows="4"
                                        required
                                        placeholder="How can I help you?"
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                                    />
                                </div>
                                {formStatus.message && (
                                    <div className={`text-sm p-2 rounded ${formStatus.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {formStatus.message}
                                    </div>
                                )}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-cyan-500/30 transition-all disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            Send Message <FiSend className="w-4 h-4" />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    ) 
} 

export default Header 