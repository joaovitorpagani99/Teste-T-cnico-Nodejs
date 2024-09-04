import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { createTask } from '../../../Services/Tasks';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CadastroTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleAddTask = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const taskData = { title, description, userId: parseInt(userId) };
            const newTask = await createTask(taskData);
            toast.success('Tarefa adicionada com sucesso!', newTask.name);
            navigate('/tasks');
        } catch (error) {
            toast.error('Erro ao adicionar tarefa!');
            console.error('Erro ao adicionar tarefa:', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1 className="mb-4">Cadastro de Tarefa</h1>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o título"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription" className="mt-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite a descrição"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" className="mt-4" onClick={handleAddTask}>
                            Adicionar Tarefa
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default CadastroTask;