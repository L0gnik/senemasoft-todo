import { z } from "zod";

const envSchemaStringValue = (name: string) =>
    z.string().nonempty(`${name} is required and cannot be empty`);
const envSchema = z.object({
    PORT: envSchemaStringValue("PORT"),
    MONGODB_URL: envSchemaStringValue("MONGODB_URL"),
    MONGODB_ROOT_USER: envSchemaStringValue("MONGODB_ROOT_USER"),
    MONGODB_ROOT_PASSWORD: envSchemaStringValue("MONGODB_ROOT_PASSWORD"),
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
});
const getEnviromentVariables = () => {
    const validatedEnv = envSchema.safeParse(process.env);
    if (validatedEnv.error) {
        const errorMessages = validatedEnv.error.issues.map(
            (e) => `[${String(e.path[0])}] - ${e.message}`
        );
        console.error("Invalid environment variables detected:");
        console.error(errorMessages.join("\n"));
        process.exit(1);
    }
    return validatedEnv.data;
};
export const configService = getEnviromentVariables();
