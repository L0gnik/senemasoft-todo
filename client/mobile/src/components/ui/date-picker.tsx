import React, { useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from "react-native-paper";
import { formatDate } from "src/utils";

export const DatePicker = ({
    value,
    setValue,
}: {
    value: Date;
    setValue: React.Dispatch<React.SetStateAction<Date>>;
}) => {
    const [open, setOpen] = useState<boolean>(false);
    // const onChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    //     const currentDate = selectedDate || value;
    //     setOpen(Platform.OS === "ios");
    //     setValue(currentDate);
    // };
    const openPicker = () => {
        setOpen(true);
    };

    return (
        <View>
            <Button mode="outlined" onPress={openPicker} icon={"calendar"}>
                {formatDate(value)}
            </Button>
            <DateTimePickerModal
                isVisible={open}
                mode="date"
                date={value}
                onConfirm={(date) => {
                    setOpen(false);
                    setValue(date);
                }}
                onCancel={() => setOpen(false)}
            />
        </View>
    );
};
