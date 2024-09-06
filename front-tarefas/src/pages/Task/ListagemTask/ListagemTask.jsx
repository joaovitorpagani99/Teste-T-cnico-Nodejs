import React, { useState, useEffect } from 'react';
import { getTasks, updateTask, deleteTask, completeTask } from '../../../Services/Tasks';
import { Container, ListGroup, Dropdown, Alert, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck, FaEllipsisV } from 'react-icons/fa';

function ListagemTask() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Token not found in localStorage");
                }

                const data = await getTasks(token);
                setTasks(data);

            } catch (error) {
                setError(error.message);
                console.error("Erro ao buscar tarefas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleEdit = async (id, updatedTask) => {
        try {
            const token = localStorage.getItem('token');
            await updateTask(id, updatedTask, token);
            setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
        } catch (error) {
            setError(error.message);
            console.error("Erro ao editar tarefa:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await deleteTask(id, token);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            setError(error.message);
            console.error("Erro ao deletar tarefa:", error);
        }
    };

    const handleComplete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await completeTask(id, token);
            setTasks(tasks.map(task => (task.id === id ? { ...task, completed: true } : task)));
        } catch (error) {
            setError(error.message);
            console.error("Erro ao concluir tarefa:", error);
        }
    };

    if (loading) {
        return (
            <Container className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Alert variant="danger">Erro: {error}</Alert>
            </Container>
        );
    }

    return (
        <Container>
            <h1 className="my-4">Lista de Tarefas</h1>
            <ListGroup>
                {tasks.map(task => (
                    <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
                        <div>
                            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                {task.title}
                            </span>
                            <p className="mb-0 text-muted">{task.description}</p>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle variant="link" id="dropdown-basic" className="p-0 border-0" />
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleEdit(task.id, { ...task, title: 'Novo Título' })}>
                                    <FaEdit className="me-2" /> Editar
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDelete(task.id)}>
                                    <FaTrash className="me-2" /> Deletar
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleComplete(task.id)}>
                                    <FaCheck className="me-2" /> Concluir
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default ListagemTask;