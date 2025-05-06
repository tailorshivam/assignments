import React from 'react';
import { Form } from 'react-bootstrap';
import { useTodo } from '../Context/TodoContext';

function SearchBar() {
  const { searchTerm, setSearchTerm } = useTodo();

  return (
    <Form className="mb-3">
      <Form.Control
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Form>
  );
}

export default SearchBar;