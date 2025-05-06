import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

function FormPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const emailRegx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/

    const validate = () => {
        const newErrors = {}
        if (!formData.name) newErrors.name = "Name is required."

        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!emailRegx.test(formData.email)) {
            newErrors.email = "Email format is invalid.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
          } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
          }

        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validationError = validate()
        if (Object.keys(validationError).length === 0) {
            setSubmitted(true)
            setErrors({})
        } else {
            setSubmitted(false)
            setErrors(validationError)
        }
    }

    return (
        <div>
            <h2>Form Page</h2>
            {submitted && <Alert variant="sucess">Form submitted successfully!</Alert>}
            <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        isInvalid={!!errors.name}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        isInvalid={!!errors.email}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        isInvalid={!!errors.password}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default FormPage