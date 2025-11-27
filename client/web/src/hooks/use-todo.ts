import { message } from "antd";
import { useEffect, useState } from "react";
import { todoService } from "src/services";
import { TodoModel } from "src/types";

import useAsync from "./use-async";

export const useTodos = () => {
    const [action, setAction] = useState<{
        type: "edit" | "delete";
        item: TodoModel;
    } | null>(null);

    const {
        execute: getAllTodos,
        data: todos,
        isLoading: isTodoLoading,
    } = useAsync(todoService.getAll);
    const { execute: patchTodo, isLoading: isTodoPatching } = useAsync(
        todoService.patch,
        () => {
            message.success("Готово!");
            if (action) setAction(null);
            getAllTodos();
        },
        () => {
            message.error(`Ошибка при редактировании!`);
        }
    );
    const { execute: createTodo, isLoading: isTodoCreating } = useAsync(
        todoService.create,
        () => {
            message.success("Успешно создано!");
            getAllTodos();
        },
        () => {
            message.error(`Ошибка при создании!`);
        }
    );
    const { execute: deleteTodo, isLoading: isTodoDeleting } = useAsync(
        todoService.delete,
        () => {
            message.success("Готово!");
            if (action) setAction(null);
            getAllTodos();
        },
        () => {
            message.error(`Ошибка при редактировании!`);
        }
    );
    const todoCount = todos ? todos.length : 0;
    const isLoading =
        isTodoLoading || isTodoPatching || isTodoCreating || isTodoDeleting;

    useEffect(() => {
        getAllTodos();
    }, []);

    const toggleCompleted = (record: TodoModel) => {
        patchTodo(record._id, { completed: !record.completed });
    };

    return {
        todos,
        createTodo,
        deleteTodo,
        action,
        setAction,
        patchTodo,
        toggleCompleted,
        todoCount,
        isLoading,
    };
};
