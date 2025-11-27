import React, { ComponentProps } from "react";
import { View } from "react-native";
import { Divider, Modal as ModalComponent, Portal } from "react-native-paper";

import { Flex } from "./flex";
import { Text } from "./text";

export const Modal = ({
    children,
    visible,
    ...props
}: ComponentProps<typeof ModalComponent>) => {
    return (
        <Portal>
            {visible && (
                <ModalComponent
                    visible={visible}
                    {...props}
                    contentContainerStyle={{
                        backgroundColor: "white",
                        padding: 20,
                        borderRadius: 20,
                        marginHorizontal: 20,
                    }}
                >
                    <Flex direction="column">{children}</Flex>
                </ModalComponent>
            )}
        </Portal>
    );
};

const ModalTitle = ({ children }: { children: string }) => {
    return (
        <>
            <Text weight={500} variant="headlineLarge">
                {children}
            </Text>
            <Divider style={{ marginVertical: 10 }} />
        </>
    );
};
const ModalContent = ({ children }: { children: React.ReactNode }) => {
    return <View>{children}</View>;
};
Modal.Title = ModalTitle;
Modal.Content = ModalContent;
