import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { login } from '../../Services/Auth';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

import './Login.css';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await login(data.email, data.password);
            localStorage.setItem('token', response.token);
            navigate('/');
            toast.success('Login realizado com sucesso!');
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        }
    };

    return (
        <section className="container-login">
            <Card className="p-3 card-login">
                <Card.Body>
                    <Card.Title className="mb-2 text-center">Login</Card.Title>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                {...register('email', { required: 'Email é obrigatório' })}
                                autoComplete="email"
                            />
                            {errors.email && <p className="error">{errors.email.message}</p>}
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                {...register('password', { required: 'Senha é obrigatória' })}
                                autoComplete="current-password"
                            />
                            {errors.password && <p className="error">{errors.password.message}</p>}
                        </Form.Group>
                        {error && <p className="error">{error}</p>}
                        <Button variant="primary" type="submit" className="mt-3">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </section>
    );
}

export default Login;