import { Request, Response } from "express";
import { todoService } from "src/database/service";

const createTodo = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const todo = await todoService.create(body);
        res.status(200).json(todo);
    } catch {
        res.status(500).json();
    }
};

const getAllTodos = async (_req: Request, res: Response) => {
    try {
        const todos = await todoService.getAll();
        res.status(200).json(todos);
    } catch {
        res.status(500).json();
    }
};

const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("Id param not found");
        await todoService.delete(id);
        res.status(200).json({ message: "Deleted" });
    } catch {
        res.status(500).json();
    }
};

const patchTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("Id param not found");
        const body = req.body;
        const patched = await todoService.patch(id, body);
        res.status(200).json(patched);
    } catch {
        res.status(500).json();
    }
};


export const todoController = {
    create: createTodo,
    getAll: getAllTodos,
    delete: deleteTodo,
    patch: patchTodo,
};
