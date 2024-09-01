import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login:', { username, password });
        setUsername('');
        setPassword('');
    };

    return (
        <div className="container-login">
            <Card className="p-3">
                <Card.Body>
                    <Card.Title className="mb-2">Login</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mt-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Entrar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;