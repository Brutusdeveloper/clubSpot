import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [state, setState] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const onHandleAdd = () => {
    setState((prevState) => [
      ...prevState,
      { id: prevState.length + 1, title: "Enter the Title", status: "Todo" },
    ]);
  };

  const onEditValue = (id, newTitle) => {
    setState((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      )
    );
    setEditId(null);
  };

  const onDeleteValue = (id) => {
    setState((prevState) => prevState.filter((item) => item.id !== id));
  };

  const onHandleStatusStage = (e, id) => {
    setState((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, status: e.target.value } : item
      )
    );
  };

  return (
    <div className="app">
      <h2>TODO Application</h2>
      <button onClick={onHandleAdd}>Add</button>
      <div className="outerWrapper">
        {state.map((item) => (
          <div className="innerWrapper" key={item.id}>
            {editId === item.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span>{item.title}</span>
            )}
              <select
                onChange={(e) => onHandleStatusStage(e, item.id)}
                value={item.status}
              >
                <option value="Todo">Todo</option>
                <option value="Inprogress">Inprogress</option>
                <option value="Completed">Completed</option>
              </select>
              {editId === item.id ? (
                <button onClick={() => onEditValue(item.id, editText)}>
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditId(item.id);
                    setEditText(item.title);
                  }}
                >
                  Edit
                </button>
              )}
              <button onClick={() => onDeleteValue(item.id)}>Delete</button>
            </div>
        ))}
      </div>
    </div>
  );
}
