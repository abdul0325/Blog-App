import dotenv from "dotenv";
import app from "./app";
import prisma from "./config/prisma";
import postRoutes from "./routes/postRoutes";

dotenv.config();
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL via Prisma");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    await prisma.$disconnect();
  }
}

startServer();
