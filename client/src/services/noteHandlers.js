const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/notes";

export const emptyForm = {
  title: "",
  content: "",
};

export function createNoteHandlers({
  form,
  setForm,
  setNotes,
  setIsFormOpen,
  setIsSubmitting,
  setError,
}) {
  const fetchNotes = async () => {
    try {
      setError("");
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      setForm(emptyForm);
      setIsFormOpen(false);
      await fetchNotes();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      await fetchNotes();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleComplete = async (note) => {
    try {
      const response = await fetch(`${API_URL}/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !note.completed }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      await fetchNotes();
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    fetchNotes,
    handleChange,
    handleSubmit,
    handleDelete,
    handleComplete,
  };
}
