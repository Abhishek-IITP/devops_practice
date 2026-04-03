import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "NoteFlow API is running" });
});

app.use("/api/notes", noteRoutes);

export default app;
