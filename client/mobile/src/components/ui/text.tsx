import React, { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { Text as ModalComponent } from "react-native-paper";

export const Text = ({
    children,
    weight = 400,
    style,
    ...props
}: ComponentProps<typeof ModalComponent> & {
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}) => {
    const combinedStyle = StyleSheet.flatten([{ fontWeight: weight }, style]);
    return (
        <ModalComponent {...props} style={combinedStyle}>
            {children}
        </ModalComponent>
    );
};
