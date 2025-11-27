import express from "express";
import { todoController } from "src/controllers";

const router = express.Router();
router.post("/", todoController.create);
router.delete("/:id", todoController.delete);
router.get("/", todoController.getAll);
router.patch("/:id", todoController.patch);

export const todoRouter = router;
