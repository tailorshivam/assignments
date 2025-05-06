import React from "react";
import { Container } from "react-bootstrap";
import { TodoProvider } from "./Context/TodoContext";
import SearchBar from "./Components/SearchBar";
import TodoInput from "./Components/TodoInput";
import TodoList from "./Components/TodoList";

function App() {
  return (
    <TodoProvider>
      <Container className="py-5">
        <h1 className="text-center mb-4">Todo App</h1>
        <SearchBar />
        <TodoInput />
        <TodoList />
      </Container>
    </TodoProvider>
  );
}

export default App;
