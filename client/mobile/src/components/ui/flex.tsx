import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type FlexProps = {
    direction?: "row" | "column" | "row-reverse" | "column-reverse";
    justifyContent?:
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly";
    alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
    wrap?: "wrap" | "nowrap" | "wrap-reverse";
    gap?: number;
    flex?: number;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
};

export const Flex = ({
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "stretch",
    wrap = "nowrap",
    gap,
    flex = 0,
    style,
    children,
    ...props
}: FlexProps) => {
    const flexStyle: StyleProp<ViewStyle> = StyleSheet.flatten([
        styles.base,
        {
            flexDirection: direction,
            justifyContent: justifyContent,
            alignItems: alignItems,
            flexWrap: wrap,
            flex: flex,
        },
        gap !== undefined && { gap: gap },
        style,
    ]);

    return (
        <View style={flexStyle} {...props}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        display: "flex",
    },
});
