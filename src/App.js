import "./App.css";
import { TodoProvider } from "./components/useContext/TodoContext";
import { TodoApp } from "./components/useReducer/TodoApp";

function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}

export default App;
