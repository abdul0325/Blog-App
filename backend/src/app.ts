import express from "express";
import cors from "cors";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

export default app;
