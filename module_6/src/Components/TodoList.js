import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { useTodo } from '../Context/TodoContext';

function TodoList() {
  const { todos, deleteTodo, clearTodos, searchTerm } = useTodo();

  const filtered = todos.filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <ListGroup className="mb-3">
        {filtered.map(todo => (
          <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
            {todo.text}
            <Button variant="danger" size="sm" onClick={() => deleteTodo(todo.id)}>Delete</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {todos.length > 0 && (
        <Button variant="outline-danger" onClick={clearTodos}>Clear All</Button>
      )}
    </>
  );
}

export default TodoList;