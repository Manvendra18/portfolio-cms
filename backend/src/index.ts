import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import blogRoutes from "./routes/blog.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blog", blogRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Portfolio API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});