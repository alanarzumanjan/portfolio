import { useEffect, useState } from "react";

const themes = ["light", "dark", "choco", "dracula", "ocean", "sepia", "blush", "blush-dark", "evergreen", "midnight-aurora", "sunset-sorbet", "matrix"];

function ThemeSwitcher() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.body.classList.remove(...themes.map(t => `theme-${t}`));
        document.body.classList.add(`theme-${theme}`);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleChange = (e) => {
        setTheme(e.target.value);
    };

    return (
        <select onChange={handleChange} value={theme} className="theme-select">
            {themes.map(t => (
                <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
            ))}
        </select>
    );
}

export default ThemeSwitcher;
