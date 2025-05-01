import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Navbar,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, todo]);
      setTodo("");
    } else {
      alert("Please enter a todo item.");
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>My Todo App</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={6}>
            <Form className="d-flex mb-3">
              <Form.Group className="flex-grow-1 me-2">
                <Form.Control
                  type="text"
                  placeholder="Enter a todo item"
                  value={todo}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAddTodo}>
                Add
              </Button>
            </Form>

            {todos.length > 0 ? (
              <Card>
                <Card.Body>
                  <ListGroup>
                    {todos.map((t, index) => (
                      <ListGroup.Item
                        key={index}
                        className="d-flex justify-content-between align-items-center"
                      >
                        {t}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteTodo(index)}
                        >
                          Delete
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            ) : (
              <p className="text-center text-muted">No tasks added yet.</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
