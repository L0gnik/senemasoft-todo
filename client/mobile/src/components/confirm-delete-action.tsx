import React from "react";
import { Button, useTheme } from "react-native-paper";

import { Flex, Text } from "./ui";

export const ConfirmDeleteAction = ({
    onCancel,
    onConfirm,
    recordName,
}: {
    recordName: string;
    onConfirm: () => void;
    onCancel: () => void;
}) => {
    const theme = useTheme();
    return (
        <Flex direction="column">
            <Text variant="headlineSmall">Вы уверены, что хотите удалить</Text>
            <Text variant="headlineSmall" weight={500}>
                {recordName}?
            </Text>
            <Flex style={{ marginTop: 16 }} gap={8}>
                <Button
                    onPress={() => onConfirm()}
                    mode="contained"
                    buttonColor={theme.colors.error}
                >
                    Да, удалить
                </Button>
                <Button onPress={() => onCancel()} mode="contained">
                    Отмена
                </Button>
            </Flex>
        </Flex>
    );
};
