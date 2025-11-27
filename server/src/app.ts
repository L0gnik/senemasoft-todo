import cors from "cors";
import express, { type Application } from "express";

import { configService } from "./config";
import { connectToMongoDatabase } from "./database";
import { todoRouter } from "./routes";

const { PORT } = configService;

connectToMongoDatabase();

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use("/todo", todoRouter);

app.listen(PORT, () => {
    console.log(`Server started on ${PORT} PORT`);
});
