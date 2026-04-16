
import { useState } from "react";
import "./todo.css";

export function TodoApp() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Add task
  function addTasks() {
    if (input.trim() !== "") {
      setList([...list, input]);
      setInput("");
    }
  }

  // Delete task
  function deleteTasks(i) {
    setList(list.filter((_, index) => index !== i));
  }

  // Start editing
  function startEdit(i) {
    setEditIndex(i);
    setEditValue(list[i]);
  }

  // Save edited task
  function saveEdit(i) {
    const updated = [...list];
    updated[i] = editValue;
    setList(updated);
    setEditIndex(null);
    setEditValue("");
  }

  return (
    <div className="container">
      <h2>📝 Todo App</h2>

      {/* Input section */}
      <div className="inputBox">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add your task..."
          onKeyDown={(e) => e.key === "Enter" && addTasks()}
        />
        <button onClick={addTasks}>Add</button>
      </div>

      {/* Task list */}
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {editIndex === index ? (
              //  Edit Mode
              <div className="editBox">
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && saveEdit(index)
                  }
                />
                <button
                  className="saveBtn"
                  onClick={() => saveEdit(index)}
                >
                  Save
                </button>
              </div>
            ) : (
              // View Mode
              <>
                <span>{item}</span>

                <div className="actions">
                  <button onClick={() => startEdit(index)}>
                    Edit
                  </button>

                  <button onClick={() => deleteTasks(index)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}