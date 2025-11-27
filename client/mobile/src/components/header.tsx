import { Appbar, useTheme } from "react-native-paper";

export const Header = ({ title }: { title: string }) => {
    const theme = useTheme();
    return (
        <Appbar.Header mode="center-aligned">
            <Appbar.Content
                title={title}
                titleStyle={{ ...theme.fonts.headlineLarge, fontWeight: 500 }}
            />
        </Appbar.Header>
    );
};
