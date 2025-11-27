import React from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "src/components";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <View style={styles.layout}>
            <Header title="Список задач" />
            <View style={styles.content}>{children}</View>
        </View>
    );
};
const styles = StyleSheet.create({
    layout: {
        height: "100%",
        backgroundColor: "#fff",
    },
    content: {},
});
