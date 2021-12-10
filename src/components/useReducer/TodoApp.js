import React, { useReducer } from "react";
import "./style.css";
import { todoReducer } from "./todoReducer";

const initialState = [
  {
    id: new Date().getTime(),
    description: "aprendiendo react",
    done: false,
  },
];

export const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      description: "Nuevo todo",
      done: false,
    };

    const action = {
      type: "ADD",
      payload: newTodo,
    };

    dispatch(action);
  };

  return (
    <div>
      <h1>Todo App ({todos.length})</h1>
      <hr />
      <div className="row">
        <div className="col">
          <ul>
            {todos.map((todo, i) => (
              <li key={todo.id}>
                <p style={{ cursor: "pointer" }}>
                  {i + 1}. {todo.description}
                </p>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "50px" }}
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
                  className="form-control"
                  id="colFormLabel"
                  placeholder=" Enter Your Email Address "
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
