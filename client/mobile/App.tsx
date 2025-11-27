import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
} from "react-native-paper";
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MainLayout } from "src/layout";
import { MainPage } from "src/pages";

const theme: ThemeProp = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        surface: "#F5D6BA",
        primary: "#8c4301",
        elevation: { level2: "#F5D6BA" },
        outline: "#8c4301",
    },
} as const;
export default function App() {
    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <MainLayout>
                    <MainPage />
                </MainLayout>
            </PaperProvider>
        </SafeAreaProvider>
    );
}
