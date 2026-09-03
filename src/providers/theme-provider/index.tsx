/* eslint-disable react-refresh/only-export-components -- this file intentionally exports the provider hook alongside its provider. */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type ThemeMode = "dark" | "light";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "theme-mode";

export const useThemeMode = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeMode must be used inside ThemeProvider");
  }

  return context;
};

// Reads the persisted mode before first paint. Falls back to dark
// (the site's original default) if nothing is stored yet, storage is
// unavailable, or the value isn't one of the two valid modes.
const getInitialMode = (): ThemeMode => {
  if (typeof window === "undefined") return "dark";

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "dark";
  } catch {
    // Storage can throw in private-browsing / disabled-storage contexts.
    return "dark";
  }
};

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  // Keep localStorage in sync whenever the mode changes (including the
  // very first render, in case getInitialMode() had to fall back).
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Ignore write failures (e.g. storage disabled) — mode still
      // works for the current session, it just won't persist.
    }
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                // Original dark palette — unchanged.
                background: {
                  default: "#050714",
                  paper: "#0f172a",
                },
                text: {
                  primary: "#f8fafc",
                  secondary: "#94a3b8",
                },
                divider: "rgba(255, 255, 255, 0.08)",
                primary: {
                  // Neon cyan — reads great against the near-black
                  // background used in dark mode.
                  main: "#00f2fe",
                },
                secondary: {
                  main: "#4facfe",
                },
              }
            : {
                // Polished light palette: soft cool-gray surfaces instead
                // of stark white, and slate text for strong contrast.
                background: {
                  default: "#f4f6fb",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#0f172a",
                  secondary: "#475569",
                },
                divider: "rgba(15, 23, 42, 0.1)",
                primary: {
                  // The dark-mode neon cyan turns washed-out and low
                  // contrast on white, so light mode gets a deeper,
                  // more saturated teal-cyan (Tailwind cyan-600/700
                  // range) that stays legible on white and off-white
                  // surfaces while still reading as "the same brand".
                  main: "#0e7490",
                },
                secondary: {
                  main: "#0369a1",
                },
              }),
        },
        shape: {
          borderRadius: 10,
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((currentMode) => (currentMode === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}