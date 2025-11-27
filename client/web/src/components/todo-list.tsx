import { Button, Checkbox, Empty, Flex, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Edit2, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { TodoModel } from "src/types";

type Actions = {
    onToggleCompleted: (irecord: TodoModel) => void;
    onDelete: (record: TodoModel) => void;
    onEdit: (record: TodoModel) => void;
};

const getColumns = ({
    onDelete,
    onEdit,
    onToggleCompleted,
}: Actions): ColumnsType<TodoModel> => {
    return [
        {
            title: "Название",
            dataIndex: "title",
            key: "title",
            render: (text, record) => (
                <span
                    style={{
                        textDecoration: record.completed
                            ? "line-through"
                            : "none",
                    }}
                >
                    {text}
                </span>
            ),
        },
        {
            title: "Дата",
            dataIndex: "expiredDate",
            key: "expiredDate",
            render: (date) => dayjs(date).format("DD.MM.YYYY"),
        },
        {
            title: "Готово",
            key: "completed",
            fixed: "right",
            render: (_, record) => (
                <Checkbox
                    checked={record.completed}
                    onChange={() => onToggleCompleted(record)}
                />
            ),
        },
        {
            title: "Действия",
            key: "actions",
            width: 150,
            render: (_, record) => (
                <Flex gap={8}>
                    <Button
                        type="text"
                        onClick={() => onEdit(record)}
                        aria-label={`Редактировать задачу ${record.title}`}
                    >
                        <Edit2 />
                    </Button>
                    <Button
                        type="text"
                        danger
                        onClick={() => onDelete(record)}
                        aria-label={`Удалить задачу ${record.title}`}
                    >
                        <Trash2 />
                    </Button>
                </Flex>
            ),
        },
    ];
};

export const TodoList = ({
    onToggleCompleted,
    onDelete,
    onEdit,
    todos,
    isLoading,
}: {
    isLoading: boolean;
    todos: TodoModel[];
} & Actions) => {
    const columns = useMemo(
        () => getColumns({ onDelete, onEdit, onToggleCompleted }),
        []
    );

    return (
        <Table
            scroll={{ x: 400 }}
            tableLayout="fixed"
            loading={isLoading}
            rowKey={(record) => record._id}
            dataSource={todos}
            columns={columns}
            locale={{
                emptyText: <Empty description="Нет задач" />,
            }}
        />
    );
};
