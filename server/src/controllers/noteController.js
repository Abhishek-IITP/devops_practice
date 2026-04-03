import Note from "../models/Note.js";

export const getNotes = async (_req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ "error": error.message,message: "Failed to fetch tasks" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.create({ title, content });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ "error": error.message,message: "Failed to create task" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(note);
  } catch (error) {
    return res.status(400).json({"error": error.message, message: "Failed to update task" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    return res.status(400).json({ "error": error.message,message: "Failed to delete task" });
  }
};
