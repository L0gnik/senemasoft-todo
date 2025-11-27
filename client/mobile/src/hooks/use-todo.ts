import { useEffect, useState } from "react";
import { todoService } from "src/services";
import { TodoModel } from "src/types";

import useAsync from "./use-async";

export const useTodos = () => {
    const [action, setAction] = useState<
        | {
              type: "edit" | "delete";
              item: TodoModel;
          }
        | { type: "create"; item?: never }
        | null
    >(null);

    const {
        execute: getAllTodos,
        data: todos,
        isLoading: isTodoLoading,
    } = useAsync(todoService.getAll);
    const { execute: patchTodo, isLoading: isTodoPatching } = useAsync(
        todoService.patch,
        () => {
            if (action) setAction(null);
            getAllTodos();
        }
    );
    const { execute: createTodo, isLoading: isTodoCreating } = useAsync(
        todoService.create,
        () => {
            if (action) setAction(null);
            getAllTodos();
        }
    );
    const { execute: deleteTodo, isLoading: isTodoDeleting } = useAsync(
        todoService.delete,
        () => {
            if (action) setAction(null);
            getAllTodos();
        }
    );
    const todoCount = todos ? todos.length : 0;
    const isLoading =
        isTodoLoading || isTodoPatching || isTodoCreating || isTodoDeleting;

    useEffect(() => {
        getAllTodos();
    }, []);

    const onToggleCompleted = (todo: TodoModel) => {
        patchTodo(todo._id, { completed: !todo.completed });
    };

    return {
        todos,
        createTodo,
        deleteTodo,
        action,
        setAction,
        patchTodo,
        onToggleCompleted,
        todoCount,
        isLoading,
    };
};
