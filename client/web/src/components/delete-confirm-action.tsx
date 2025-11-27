import { Button, Flex } from "antd";

export const ConfirmDeleteAction = ({
    onCancel,
    onConfirm,
    recordName,
}: {
    recordName: string;
    onConfirm: () => void;
    onCancel: () => void;
}) => {
    return (
        <Flex vertical gap={8}>
            <span>
                Вы уверены что хотите удалить
                <b> {recordName}</b>?
            </span>
            <Flex gap={8}>
                <Button danger onClick={() => onConfirm()}>
                    Да, Удалить
                </Button>
                <Button onClick={() => onCancel()}>Отмена</Button>
            </Flex>
        </Flex>
    );
};
