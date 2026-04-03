import { useEffect, useState } from "react";
import { createNoteHandlers, emptyForm } from "./services/noteHandlers";

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { fetchNotes, handleChange, handleSubmit, handleDelete, handleComplete } =
    createNoteHandlers({
      form,
      setForm,
      setNotes,
      setIsFormOpen,
      setIsSubmitting,
      setError,
    });

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="page-shell">
      <nav className="navbar">
        <div>
          <p className="eyebrow">MERN task board</p>
          <h1>NoteFlow</h1>
        </div>
        <button
          type="button"
          className="primary-button"
          onClick={() => setIsFormOpen(true)}
        >
          Add Task
        </button>
      </nav>

      <main className="content-grid">
        <section className="panel stats-panel">
          <p>Total Tasks</p>
          <strong>{notes.length}</strong>
          <span>{notes.filter((note) => note.completed).length} completed</span>
        </section>

        <section className="panel list-panel">
          <div className="section-header">
            <h2>Tasks</h2>
            <span>{notes.length ? "Newest first" : "No tasks yet"}</span>
          </div>

          <div className="task-list">
            {notes.map((note) => (
              <article key={note._id} className={`task-card ${note.completed ? "completed" : ""}`}>
                <div>
                  <h3>{note.title}</h3>
                  <p>{note.content || "No details added."}</p>
                </div>
                <div className="task-meta">
                  <span>{note.completed ? "Completed" : "Pending"}</span>
                  <div className="task-actions">
                    <button type="button" onClick={() => handleComplete(note)}>
                      {note.completed ? "Mark Pending" : "Mark Complete"}
                    </button>
                    <button type="button" className="danger-button" onClick={() => handleDelete(note._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {isFormOpen ? (
        <div className="modal-backdrop" onClick={() => setIsFormOpen(false)}>
          <section
            className="panel form-panel modal-panel"
            id="task-form"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="section-header">
              <h2>Create a task</h2>
              <button type="button" className="close-button" onClick={() => setIsFormOpen(false)}>
                Close
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Task title"
                value={form.title}
                onChange={handleChange}
              />
              <textarea
                name="content"
                placeholder="Task details"
                rows="4"
                value={form.content}
                onChange={handleChange}
              />
              <button type="submit" className="primary-button" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Task"}
              </button>
            </form>
            {error ? <p className="error-text">{error}</p> : null}
          </section>
        </div>
      ) : null}
    </div>
  );
}

export default App;
