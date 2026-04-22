import { FiGithub, FiLinkedin } from "react-icons/fi";

const Footer = () => {
    return (
        <footer className="bg-[#CACBD1] text-black py-12 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Logo */}
                    <h2 className="text-3xl font-bold bg-linear-to-r from-slate-700 to-slate-400 bg-clip-text text-transparent">
                        Arkon
                    </h2>

                    {/* Connect links */}
                    <div className="text-center md:text-right">
                        <h3 className="text-xl font-semibold mb-3 text-slate-600">Connect</h3>
                        <div className="flex space-x-4 justify-center md:justify-end">
                            <a href="https://www.linkedin.com/in/arkon/" target="_blank" rel="noopener noreferrer"
                               className="text-gray-600 hover:text-slate-800 transition-colors duration-200 cursor-none">
                                <FiLinkedin className="w-5 h-5" />
                            </a>
                            <a href="https://github.com/ArkonHQ/Arkon" target="_blank" rel="noopener noreferrer"
                               className="text-gray-600 hover:text-slate-800 transition-colors duration-200 cursor-none">
                                <FiGithub className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-400 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">© 2026 Arkon. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-slate-500 hover:text-black text-sm transition cursor-none">Privacy Policy</a>
                        <a href="#" className="text-slate-500 hover:text-black text-sm transition cursor-none">Terms of Service</a>
                        <a href="#" className="text-slate-500 hover:text-black text-sm transition cursor-none">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;