import React, { useState } from "react";
import { Button, TextInput, useTheme } from "react-native-paper";

import { DatePicker, Flex } from "./ui";

export const TodoForm = ({
    sumbitText,
    initialValues,
    onSubmit,
}: {
    sumbitText: string;
    initialValues?: { title: string; expiredDate: Date | string };
    onSubmit: (values: { title: string; expiredDate: Date }) => void;
}) => {
    const theme = useTheme();
    const [title, setTitle] = useState<string>(initialValues?.title || "");
    const [expiredDate, setExpiredDate] = useState<Date>(
        initialValues?.expiredDate
            ? new Date(initialValues.expiredDate)
            : new Date()
    );
    const onSubmitPress = () => {
        onSubmit({ title, expiredDate });
    };
    return (
        <Flex direction="column" gap={8}>
            <TextInput
                activeUnderlineColor={theme.colors.secondary}
                style={{ backgroundColor: "transparent" }}
                mode="outlined"
                label={"Название"}
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <DatePicker value={expiredDate} setValue={setExpiredDate} />
            <Button
                onPress={onSubmitPress}
                mode="contained"
                disabled={title === ""}
            >
                {sumbitText}
            </Button>
        </Flex>
    );
};
