import {useContext, useEffect, useState} from "react";
import {Menu, Moon, Share2, Sun, X} from "lucide-react";
import {Link} from "react-router-dom";
import {SignedIn, UserButton} from "@clerk/clerk-react";
import SideMenu from "./SideMenu.jsx";
import CreditsDisplay from "./CreditsDisplay.jsx";
import {UserCreditsContext} from "../context/UserCreditsContext.jsx";
import {ThemeContext} from "../context/ThemeContext.jsx";

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const {credits, fetchUserCredits} = useContext(UserCreditsContext);
    const {resolvedTheme, toggleTheme} = useContext(ThemeContext);

    useEffect(() => {
        fetchUserCredits();
    }, [fetchUserCredits]);

    return (
        <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30 dark:bg-zinc-950 dark:border-zinc-800">
            {/* Left side - menu button and title*/}
            <div className="flex items-center gap-5">
                <button
                    onClick={() => setOpenSideMenu(!openSideMenu)}
                    className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors dark:text-zinc-100 dark:hover:bg-zinc-900">
                    {openSideMenu ? (
                        <X className="text-2xl" />
                    ): (
                        <Menu className="text-2xl" />
                    )}
                </button>

                <div className="flex items-center gap-2">
                    <Share2 className="text-blue-600" />
                    <span className="text-lg font-medium text-black truncate dark:text-zinc-100">
                        FileShareX
                    </span>
                </div>
            </div>

            {/* Right side - credits and user button*/}
            <SignedIn>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    >
                        {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <Link to="/subscriptions">
                        <CreditsDisplay credits={credits} />
                    </Link>
                    <div className="relative">
                        <UserButton />
                    </div>
                </div>
            </SignedIn>

            {/* Mobile side menu */}
            {openSideMenu && (
                <div className="fixed top-[73px] left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 dark:bg-zinc-950 dark:border-zinc-800">
                    {/* Side menu bar */}
                    <SideMenu activeMenu={activeMenu}/>
                </div>
            )}
        </div>
    )
}

export default Navbar;