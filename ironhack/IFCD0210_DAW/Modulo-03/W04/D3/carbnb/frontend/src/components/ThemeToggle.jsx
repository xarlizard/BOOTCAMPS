import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

export function ThemeToggle({ className = "", size = "sm" }) {
  const { toggleTheme, getThemeIcon, getThemeLabel, theme, THEMES } =
    useTheme();

  const sizeClasses = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  };

  return (
    <button
      onClick={toggleTheme}
      className={`btn btn-secondary ${sizeClasses[size]} theme-toggle ${className}`}
      aria-label={`Cambiar tema - ${getThemeLabel()}`}
      title={`Tema actual: ${getThemeLabel()}`}
      style={{
        minWidth: size === "sm" ? "2.5rem" : "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
      }}
    >
      <span style={{ fontSize: size === "sm" ? "1rem" : "1.25rem" }}>
        {(() => {
          const icon = getThemeIcon();
          if (React.isValidElement(icon)) return icon;
          // Fallback: if helper returns a string (legacy emoji), render proper icon
          return theme === THEMES.DARK ? (
            <FiMoon aria-hidden="true" />
          ) : (
            <FiSun aria-hidden="true" />
          );
        })()}
      </span>
      <span
        className="theme-label"
        style={{
          fontSize: "0.75rem",
          display: size === "sm" ? "none" : "inline",
        }}
      >
        {size !== "sm" && getThemeLabel()}
      </span>
    </button>
  );
}

export function ThemeSelector({ showLabel = false }) {
  const { theme, changeTheme, getThemeIcon, getThemeLabel, THEMES } =
    useTheme();

  const themes = [
    { key: THEMES.LIGHT, label: "Modo Claro" },
    { key: THEMES.DARK, label: "Modo Oscuro" },
  ];

  return (
    <div className="theme-selector">
      {showLabel && (
        <label className="theme-selector-label">Tema: {getThemeLabel()}</label>
      )}
      <select
        value={theme}
        onChange={(e) => changeTheme(e.target.value)}
        className="theme-select"
        aria-label="Seleccionar tema"
      >
        {themes.map(({ key, label }) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
