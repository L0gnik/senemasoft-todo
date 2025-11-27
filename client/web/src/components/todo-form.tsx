import { Button, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";

export const TodoForm = ({
    isLoading,
    sumbitText,
    onSubmit,
    initialValues,
}: {
    sumbitText: string;
    initialValues?: { expiredDate: Date | string; title: string };
    isLoading: boolean;
    onSubmit: (values: { expiredDate: Date; title: string }) => void;
}) => {
    return (
        <Form
            layout="vertical"
            onFinish={onSubmit}
            disabled={isLoading}
            initialValues={{
                ...initialValues,
                expiredDate: dayjs(initialValues?.expiredDate),
            }}
        >
            <Form.Item
                label="Название задачи"
                name="title"
                rules={[{ required: true, message: "Введите название" }]}
            >
                <Input placeholder="Например: Купить хлеб" />
            </Form.Item>
            <Form.Item
                label="Дата дедлайна"
                name="expiredDate"
                rules={[{ required: true, message: "Выберите дату" }]}
            >
                <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Выберете..."
                />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
                {sumbitText}
            </Button>
        </Form>
    );
};
