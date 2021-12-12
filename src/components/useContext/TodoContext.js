import React, { createContext, useReducer } from "react";
import { useForm } from "../../customHooks/useForm";
import { todoReducer } from "../useReducer/todoReducer";

export const TodoContext = createContext(null);

const init = () => {
  return JSON.parse(localStorage.getItem("TODOS")) || [];
};

export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  const [{ description }, handleInputChange, reset] = useForm({
    description: "",
  });

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
    <TodoContext.Provider
      value={{
        todos,
        description,
        handleSubmit,
        handleInputChange,
        handleComplete,
        handleDelete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
