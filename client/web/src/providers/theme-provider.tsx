import { ConfigProvider, theme as Theme } from "antd";
import React, { createContext, useContext, useState } from "react";

type Theme = "dark" | "light";
type ThemeContext = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const ThemeContext = createContext<ThemeContext | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("light");
    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        headerBg: theme === "light" ? "#b6dffa" : "#181818",
                        bodyBg: theme === "light" ? "#ebf7ff" : "#282828",
                    },
                },
                algorithm:
                    theme === "dark"
                        ? Theme.darkAlgorithm
                        : Theme.defaultAlgorithm,
            }}
        >
            <ThemeContext.Provider value={{ theme, setTheme }}>
                {children}
            </ThemeContext.Provider>
        </ConfigProvider>
    );
};

export const useTheme = (): ThemeContext => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used inside ThemeContext Provider");
    }
    return context;
};
