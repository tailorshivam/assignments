import React, { createContext, useContext, useEffect, useState } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text }]);
  };

  const deleteTodo = (id) => setTodos(todos.filter(todo => todo.id !== id));

  const clearTodos = () => setTodos([]);

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, clearTodos, searchTerm, setSearchTerm }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);