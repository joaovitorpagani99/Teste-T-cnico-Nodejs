import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import './CadastroUsuario.css';

function CadastroUsuario() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }
        console.log('Usuário cadastrado:', { nome, email, senha });
        setNome('');
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
    };

    return (
        <section className="container-cadastro">
            <Card className="p-3">
                <Card.Body className='card-cadastro-user'>
                    <Card.Title className="mb-2">Cadastro de Usuário</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="senha" className="mt-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmarSenha" className="mt-3">
                            <Form.Label>Confirmar Senha</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                required
                            />
                        </Form.Group>
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