import {useContext} from "react";
import {Moon, Sun} from "lucide-react";
import {ThemeContext} from "../../context/ThemeContext.jsx";

const HeroSection = ({openSignIn, openSignUp}) => {
    const {resolvedTheme, toggleTheme} = useContext(ThemeContext);

    return (
        <div className="landing-page-content relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-80 z-0 pointer-events-none dark:from-zinc-900 dark:to-zinc-950"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="pt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                        {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
                <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
                    <div className="text-center">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl dark:text-zinc-100">
                            <span className="block">Share Files Securely with</span>
                            <span className="block text-purple-500">FileShareX</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl dark:text-zinc-400">
                            Upload, manage, and share your files securely. Accessible anywhere, anytime.
                        </p>
                        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                                <button
                                    onClick={() => openSignUp()}
                                    className="flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 md:py-4 md:text-lg md:px-10 transition-all duration-200 shadow-lg hover:shadow-xl">Get Started</button>
                                <button
                                    onClick={() => openSignIn()}
                                    className="flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all duration-200 shadow-md hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800">Sign In</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border border-purple-100 bg-white/70 dark:bg-zinc-900/70 dark:border-zinc-800 shadow-xl p-8 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Secure. Fast. Simple.</h3>
                    <p className="mt-2 text-gray-600 dark:text-zinc-400">
                        Upload and share files with private links, activity tracking, and controlled access.
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <p className="mt-4 text-base text-gray-500 dark:text-zinc-400">
                        All your files are encrypted and stored securely with enterprise-grade security protocols.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;