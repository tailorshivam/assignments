import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useTodo } from '../Context/TodoContext';

function TodoInput() {
  const [input, setInput] = useState('');
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(input);
    setInput('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <InputGroup>
        <Form.Control
          placeholder="Add a new to-do..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </InputGroup>
    </Form>
  );
}

export default TodoInput;
