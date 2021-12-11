import React, { useReducer, useEffect } from "react";
import { useForm } from "../../customHooks/useForm";
import "./style.css";
import { todoReducer } from "./todoReducer";

const init = () => {
  return JSON.parse(localStorage.getItem("TODOS")) || [];

  /*return [
    {
      id: new Date().getTime(),
      description: "aprendiendo react",
      done: false,
    },
  ];*/
};

export const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  const [{ description }, handleInputChange, reset] = useForm({
    description: "",
  });

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      description: description,
      done: false,
    };

    dispatch({ type: "ADD", payload: newTodo });
    reset();
  };

  const handleDelete = (todoId) => {
    dispatch({ type: "DELETE", payload: todoId });
  };

  const handleComplete = (todoId) => {
    dispatch({ type: "COMPLETED", payload: todoId });
  };

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
