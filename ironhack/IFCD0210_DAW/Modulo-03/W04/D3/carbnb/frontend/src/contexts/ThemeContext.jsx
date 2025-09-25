import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

// Solo dos temas: LIGHT y DARK
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Leer tema guardado del localStorage
    const savedTheme = localStorage.getItem("carbnb-theme");

    // Si hay un tema guardado, usarlo
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
      return savedTheme;
    }

    // Si no hay tema guardado, usar el del sistema
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? THEMES.DARK
      : THEMES.LIGHT;
  });

  // Aplicar tema al DOM
  useEffect(() => {
    const root = document.documentElement;

    // Remover todas las clases de tema existentes
    root.classList.remove("theme-light", "theme-dark");

    // Aplicar la clase del tema actual
    root.classList.add(`theme-${theme}`);

    // Guardar en localStorage
    localStorage.setItem("carbnb-theme", theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
    );
  };

  const getThemeIcon = () => {
    return theme === THEMES.LIGHT ? "☀️" : "🌙";
  };

  const getThemeLabel = () => {
    return theme === THEMES.LIGHT ? "Modo Claro" : "Modo Oscuro";
  };

  const value = {
    theme,
    changeTheme,
    toggleTheme,
    getThemeIcon,
    getThemeLabel,
    THEMES,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
