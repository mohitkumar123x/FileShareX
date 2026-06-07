import {createContext, useCallback, useEffect, useMemo, useState} from "react";

const THEME_KEY = "filesharex-theme"; // "light" | "dark" | "system"

function getSystemTheme() {
    if (typeof window === "undefined") return "light";
    return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

function applyThemeClass(theme) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    // Helps native inputs/scrollbars match the theme in supporting browsers
    root.style.colorScheme = theme;
}

export const ThemeContext = createContext({
    theme: "system",
    resolvedTheme: "light",
    setTheme: () => {},
    toggleTheme: () => {},
});

export function ThemeProvider({children}) {
    const [theme, setThemeState] = useState(() => {
        try {
            return localStorage.getItem(THEME_KEY) || "system";
        } catch {
            return "system";
        }
    });

    const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

    const setTheme = useCallback((nextTheme) => {
        setThemeState(nextTheme);
        try {
            localStorage.setItem(THEME_KEY, nextTheme);
        } catch {
            // ignore
        }
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }, [resolvedTheme, setTheme]);

    useEffect(() => {
        applyThemeClass(resolvedTheme);
    }, [resolvedTheme]);

    useEffect(() => {
        if (typeof window === "undefined" || theme !== "system") return;

        const media = window.matchMedia?.("(prefers-color-scheme: dark)");
        if (!media) return;

        const handler = () => applyThemeClass(getSystemTheme());
        // addEventListener is supported in modern browsers; fall back for older ones
        if (media.addEventListener) media.addEventListener("change", handler);
        else media.addListener(handler);

        return () => {
            if (media.removeEventListener) media.removeEventListener("change", handler);
            else media.removeListener(handler);
        };
    }, [theme]);

    const value = useMemo(() => ({theme, resolvedTheme, setTheme, toggleTheme}), [theme, resolvedTheme, setTheme, toggleTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

