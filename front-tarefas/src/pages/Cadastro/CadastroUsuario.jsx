import React, { useState, useContext } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import toast from "react-hot-toast";

import './CadastroUsuario.css';

function CadastroUsuario() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { cadastro } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (data.password !== data.confirmarSenha) {
            toast.error('As senhas não coincidem!');
            return;
        }
        const user = {
            name: data.nome,
            email: data.email,
            password: data.password
        };
        try {
            await cadastro(user);
            toast.success('Usuário cadastrado com sucesso!');
        } catch (err) {
            const errorMessage = err.message || 'Erro ao realizar cadastro.';
            toast.error(errorMessage);
            setError(errorMessage);
        }
    };

    return (
        <section className="container-cadastro">
            <Card className="p-3">
                <Card.Body className='card-cadastro-user'>
                    <Card.Title className="mb-2">Cadastro de Usuário</Card.Title>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                {...register('nome', { required: 'Nome é obrigatório' })}
                            />
                            {errors.nome && <p className="error">{errors.nome.message}</p>}
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                {...register('email', { required: 'Email é obrigatório' })}
                            />
                            {errors.email && <p className="error">{errors.email.message}</p>}
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                {...register('password', { required: 'Senha é obrigatória' })}
                            />
                            {errors.password && <p className="error">{errors.password.message}</p>}
                        </Form.Group>
                        <Form.Group controlId="confirmarSenha">
                            <Form.Label>Confirmar Senha</Form.Label>
                            <Form.Control
                                type="password"
                                {...register('confirmarSenha', { required: 'Confirmação de senha é obrigatória' })}
                            />
                            {errors.confirmarSenha && <p className="error">{errors.confirmarSenha.message}</p>}
                        </Form.Group>
                        {error && <p className="error">{error}</p>}
                        <Button variant="primary" type="submit" className="mt-3">
                            Cadastrar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </section>
    );
}

export default CadastroUsuario;