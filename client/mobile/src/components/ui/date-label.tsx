import { Icon, Text } from "react-native-paper";
import { formatDate } from "src/utils";

import { Flex } from "./flex";

export const DateLabel = ({ date }: { date: Date | string }) => {
    const dateString = formatDate(date);
    return (
        <Flex gap={8} alignItems="center">
            <Icon size={20} source="calendar-month-outline" />
            <Text variant="titleMedium" style={{ fontWeight: 500 }}>
                {dateString}
            </Text>
        </Flex>
    );
};
