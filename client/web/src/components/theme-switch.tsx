import { Button } from "antd";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "src/providers";

export const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();
    return (
        <Button
            size="large"
            shape="circle"
            type="dashed"
            onClick={() => {
                setTheme((prev) => (prev === "light" ? "dark" : "light"));
            }}
        >
            {theme === "light" ? <Sun /> : <Moon />}
        </Button>
    );
};
