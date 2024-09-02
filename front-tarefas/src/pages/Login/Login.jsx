import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="container-login">
            <Card className="p-5 card-login">
                <Card.Body>
                    <Card.Title className="mb-3 text-center">Login</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-center mt-4 mb-4">
                            <Button variant="primary" type="submit">
                                Entrar
                            </Button>
                        </div>
                    </Form>
                    <p className="mt-3 text-center">Se não tiver conta, <a href="/cadastroUsuario">cadastre-se</a></p>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;