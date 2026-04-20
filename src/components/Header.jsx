import { motion, AnimatePresence } from 'framer-motion'
import { a } from 'framer-motion/client'
import { FiGithub, FiLinkedin, FiMenu, FiX } from 'react-icons/fi'
import { useState } from "react";
import { navContent }  from '../constants/index.js';


const Header = () => {
    // Toggle the Menu open/close
   const [isOpen, setIsOpen] = useState(false);
   const toggleMenu = () => setIsOpen(!isOpen);

   // State to track if the contact form is open
    const [contactFormOpen, setContactFormOpen] = useState(false);
    const openContactForm = () => setContactFormOpen(true);
    const closeContactForm = () => setContactFormOpen(false);


    return (
        <header className={'absolute w-full z-20 transition-all duration-300'}>

            <div className={'container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20'}>

                {/*LOGO*/}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 100,
                        damping: 25,
                        delay: 0.3,
                        duration: 1.2,
                    }}
                    className={'flex items-center'}>
                <div className={'flex items-center bg-linear-to-r from-gray-500 to-gray-100 text-black h-10 w-10 justify-center rounded-xl font-bold text-xl mr-3'}>
                    A
                </div>
                <span className={'text-xl font-bold bg-linear-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent'}>
                    Arkon
                </span>
                </motion.div>

                {/*Desktop Navigation*/}
                <nav className={'lg:flex hidden space-x-8'}>
                    {navContent.map((item, i) => (
                        <motion.a
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 100,
                                damping: 20,
                                delay: 0.7 + i * 0.2,
                                duration: 1.2,
                            }}
                        key={item}
                        className={'relative text-gray-800 dark:text-gray-200 hover:text-slate-600 transition-colors duration-300 font-medium group'}
                        href={'/'}>
                            {item}
                            <span className={'absolute bottom-0 left-0 w-0 h-0.5 bg-slate-500 group-hover:w-full transition-all duration-300'}></span>
                        </motion.a>
                    ))}
                </nav>

                {/*Social icons - Desktop */}
                <div className={'md:flex hidden items-center space-x-4'}>
                    <motion.a
                        initial={{ opacity: 0, scale: 0.5}}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            duration: 0.8,
                            delay: 1.3,
                        }}
                        className={'text-gray-700 dark:text-gray-300 hover:text-slate-600 dark:hover:slate-400 transition-colors duration-300 '} href={'/'}>
                        <FiGithub className={'w-5 h-5 '} />
                    </motion.a>
                    <motion.a
                        initial={{ opacity: 0, scale: 0.5}}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            duration: 0.8,
                            delay: 1.3,
                        }}
                        className={'text-gray-700 dark:text-gray-300 hover:text-slate-600 dark:hover:slate-400 transition-colors duration-300 '} href={'/'}>
                        <FiLinkedin className={'w-5 h-5 '} />
                    </motion.a>

                {/*Hire Me Button */}
                <motion.button
                    onClick={openContactForm}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 100,
                        damping: 15,
                        duration: 0.9,
                        delay: 1.6,
                    }}
                    className={'ml-4 px-4 py-2 rounded-xl bg-linear-to-r from-gray-400 to-gray-100 text-slate-600 font-bold hover:from-slate-600 hover:to-gray-800 hover:text-white transition-all duration-500 cursor-pointer'}>
                    Hire Me
                </motion.button>
                </div>

            {/* Mobile Menu Button */}
                <div
                    className={'md:hidden flex items-center'}>
                    <motion.button
                        whileTap={{ scale: 0.7 }}
                        onClick={toggleMenu}
                        className={'text-slate-600'}>
                        {isOpen ? <FiX className={'h-6 w-6'} /> : <FiMenu className={'h-6 w-6'} />}
                    </motion.button>
                </div>
            </div>
                {/*Mobile Menu */}
            <motion.div
                initial={{ opacity: 0, height: 0}}
                animate={{
                    opacity : isOpen ? 1 : 0, height: isOpen ? 'auto' : 0,
                }}
                transition={{ duration: 0.5 }}
                className={'md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg px-4 py-5 space-y-5'}>
                <nav className={'flex flex-col space-y-3'} >
                    {navContent.map((item) => (
                        <a  onClick={toggleMenu}
                            className={'text-gray-300 font-medium py-2'} key={item}
                           href={'/'} >{item}</a>
                    ))}
                </nav>
                <div className={'pt-4 border-t border-gray-200 dark:border-gray-700'}>
                    <div className={'flex space-x-5'} >
                    <a
                        href={'/'}> <FiGithub className={'w-5 h-5 text-gray-300'} />
                    </a>
                    <a
                        href={'/'}> <FiLinkedin className={'w-5 h-5 text-gray-300'} />
                    </a>
                    </div>
                    <button onClick={ () => {
                        toggleMenu()
                        openContactForm()
                    }} className={'mt-4 block w-full px-4 py-2 rounded-lg bg-linear-to-r from-gray-400 to-gray-100 text-slate-600 font-bold hover:from-slate-600 hover:to-gray-800 hover:text-white transition-all duration-500 cursor-pointer'}>
                        Contact With Me
                    </button>
                </div>
            </motion.div>
        {/*  Contact Form  */}
            <AnimatePresence>
            {contactFormOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={ { opacity: 1}}
                    exit={{ opacity: 0 }}
                    transition={{duration: 0.5}}
                    className={'fixed inset-0 bg-black/50 backdrop-blur-xl z-20 flex items-center justify-center p-4'}

                >
                <motion.div
                    initial={{ scale:0.8, opacity: 0, y:30 }}
                    animate={ { opacity: 1, scale: 1, y:0 }}
                    exit={{ scale: 0.8, opacity: 0, y:30 }}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        duration: 0.9,
                        damping: 30,
                    }}
                    className={'bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6'}>
                    <div className={'flex justify-between items-center mb-4 '}>
                    <h1 className={'text-2xl font-bold text-gray-300'}>Get In Touch
                    </h1>
                    <button onClick={closeContactForm} > <FiX className={'w-5 h-5 text-gray-300 font-extrabold'}/>
                    </button>
                </div>

                {/*  Input Forms  */}
                    <form className={'space-y-4'}>
                        <div >
                            <label htmlFor='name' className={'block text-sm font-medium text-gray-300 mb-1'}>Name
                            </label>
                            <input type='text' id='name' placeholder='Your Name' className={'w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-slate600 bg-gray-700'}/>
                        </div>
                        <div >
                            <label htmlFor='email' className={'block text-sm font-medium text-gray-300 mb-1'}>Email
                            </label>
                            <input type='email' id='email' placeholder='Your Email' className={'w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-slate600 bg-gray-700'}/>
                        </div>
                        <div >
                            <label htmlFor='message' className={'block text-sm font-medium text-gray-300 mb-1'}>Name
                            </label>
                            <textarea rows='4' id='message' placeholder='How can we help you?' className={'w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-600 focus:border-slate600 bg-gray-700'}/>
                        </div>
                        <motion.button
                            type='submit'
                            whileHover={{ scale:1.03 }}
                            whileTap={{ scale: 0.96 }}
                            className={'w-full px-4 py-2 bg-linear-to-r from-slate-600 to-slate-200 hover:from-slate-700 hover:to-gray-700 transition-all duration-300 rounded-lg shadow-md hover:shadow-slate-600/50 text-slate-300 hover:text-white'} >Send Message</motion.button>
                    </form>

                </motion.div>
                </motion.div>
            )}
            </AnimatePresence>
        </header>
    )
}
export default Header
