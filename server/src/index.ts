import "@shopify/shopify-api/adapters/node";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });
import express from "express";
import mongoose from "mongoose";

import userRoutes from "./routes";

const PORT = parseInt(process.env.PORT, 10) || 8080;
const isDev = process.env.NODE_ENV === "dev";

const mongoUrl =
    process.env.MONGO_URL || "mongodb://127.0.0.1:27017/shopify-practice-app";

mongoose.connect(mongoUrl);

const createServer = async () => {
    const app = express();

    app.use(express.json());
    app.use("/api/apps", userRoutes);

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    return { app };
};

createServer().then(({ app }) => {
    app.listen(PORT, () => {
        console.log(`Express is listening at http://localhost:${PORT}`);
    });
});
