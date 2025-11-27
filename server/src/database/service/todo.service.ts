import { Todo } from "../models";

type CreateTodoDto = { title: string; completed: boolean; expiredDate: Date };
type UpdateTodoDto = Partial<CreateTodoDto>;

const createTodo = async (dto: CreateTodoDto) => {
    const todo = new Todo(dto);
    await todo.save();
    return todo;
};

const getAllTodos = async () => {
    return Todo.find().exec();
};

const deleteTodo = async (id: string) => {
    return Todo.findByIdAndDelete(id).exec();
};

const patchTodo = async (id: string, dto: UpdateTodoDto) => {
    return Todo.findByIdAndUpdate(id, dto, { new: true }).exec();
};

export const todoService = {
    create: createTodo,
    getAll: getAllTodos,
    delete: deleteTodo,
    patch: patchTodo,
};
