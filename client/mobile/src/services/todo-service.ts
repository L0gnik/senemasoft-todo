import { apiClient } from "src/api";
import { TodoModel } from "src/types";

export type CreateTodoDto = { title: string; expiredDate: Date };
export type PatchTodoDto = {
    title?: string;
    expireDate?: Date;
    completed?: boolean;
};

const getAllTodo = async (): Promise<TodoModel[]> => {
    return apiClient.get<TodoModel[]>("/todo");
};

const createTodo = async (dto: CreateTodoDto): Promise<TodoModel> => {
    return apiClient.post<TodoModel>("/todo", dto);
};

const patchTodo = async (id: string, dto: PatchTodoDto): Promise<TodoModel> => {
    return apiClient.patch<TodoModel>(`/todo/${id}`, dto);
};

const deleteTodo = async (id: string): Promise<TodoModel> => {
    return apiClient.delete<TodoModel>(`/todo/${id}`);
};

export const todoService = {
    create: createTodo,
    getAll: getAllTodo,
    patch: patchTodo,
    delete: deleteTodo,
};
