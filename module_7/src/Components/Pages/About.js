import React from "react";
import { Card } from "react-bootstrap";

function About() {
    return (
        <Card>
            <Card.Body>
                <Card.Title>About This App</Card.Title>
                <Card.Text>
                    This is a simple multi-page React application showcasing:
                    <ul>
                        <li>Routing with React Router</li>
                        <li>Form validation using React Bootstrap</li>
                        <li>Lazy loading with React.lazy and Suspense</li>
                        <li>Styling via React Bootstrap</li>
                    </ul>
                    Built for learning and demonstration purposes.
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default About