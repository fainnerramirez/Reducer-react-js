import React, { useContext, useEffect } from "react";
import { TodoContext } from "../useContext/TodoContext";
import "./style.css";

export const TodoApp = () => {
  const {
    todos,
    description,
    handleSubmit,
    handleInputChange,
    handleDelete,
    handleComplete,
  } = useContext(TodoContext);

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <h1>Todo App ({todos.length})</h1>
      <hr />
      <div className="row">
        <div className="col">
          <ul>
            {todos.map((todo, i) => (
              <li key={todo.id} className="d-flex mt-3">
                <p
                  className={todo.done ? "completed" : ""}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleComplete(todo.id)}
                >
                  {i + 1}. {todo.description}
                </p>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "50px" }}
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <div className="col-sm-10">
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  id="colFormLabel"
                  value={description}
                  onChange={handleInputChange}
                  placeholder="Todo"
                />
              </div>

              <button className="btn btn-primary mt-4" type="submit">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
