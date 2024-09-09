import React, { useState, useContext } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import toast from "react-hot-toast";
import LoadingSpinner from '../../components/loading/LoadingSpinner';

import './Login.css';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');
        try {
            await login(data.email, data.password);
            toast.success('Login realizado com sucesso!');
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="container-login">
            <Card className="p-3 card-login rounded-4">
                <Card.Body>
                    <Card.Title className="mb-2 text-center">Login</Card.Title>
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
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
                    )}
                    <p className="mt-3 text-center">
                        Não tem uma conta? <Link to="/cadastroUsuario">Cadastre-se</Link>
                    </p>
                </Card.Body>
            </Card>
        </section>
    );
}

export default Login;