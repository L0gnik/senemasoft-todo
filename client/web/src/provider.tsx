import React from "react";

import { ThemeProvider } from "./providers";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return <ThemeProvider>{children}</ThemeProvider>;
};
