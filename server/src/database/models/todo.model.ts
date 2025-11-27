import mongoose from "mongoose";
import { TodoModel } from "src/types";

const todoSchema = new mongoose.Schema<TodoModel>(
    {
        title: {
            type: String,
            required: [true, "Пожалуйста, добавьте описание задачи."],
            trim: true,
            maxlength: [100, "Заголовок не может превышать 100 символов."],
        },
        completed: {
            type: Boolean,
            default: false,
        },
        expiredDate: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);
export const Todo = mongoose.model("Todo", todoSchema);
