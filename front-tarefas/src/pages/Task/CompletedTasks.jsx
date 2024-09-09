import React, { useEffect, useState } from 'react';
import { getTasks, toggleCompleteTask } from '../../Services/Tasks';
import { Container, ListGroup, Alert, Accordion, Form } from 'react-bootstrap';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import toast from 'react-hot-toast';

function CompletedTasks() {
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
                setTasks(data.filter(task => task.isCompleted));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleCheckboxChange = async (task) => {
        try {
            const token = localStorage.getItem('token');
            const updatedTask = await toggleCompleteTask(task.id, token);
            if (updatedTask.isCompleted) {
                updatedTask.completedDate = new Date().toISOString().split('T')[0];
            } else {
                updatedTask.completedDate = null;
            }
            setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
            toast.success(`Tarefa ${updatedTask.isCompleted ? 'concluída' : 'marcada como pendente'} com sucesso!`);
        } catch (error) {
            setError(error.message);
            toast.error('Erro ao atualizar tarefa.');
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Container>
            <h1 className="my-4">Tarefas Concluídas</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Accordion defaultActiveKey="0" className="accordion-item completed">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Tarefas Concluídas</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup>
                            {tasks.map(task => (
                                <ListGroup.Item key={task.id} className={`d-flex justify-content-between align-items-center mb-2 rounded-4 task-item completed`}>
                                    <Form.Check
                                        type="checkbox"
                                        checked={task.isCompleted}
                                        onChange={() => handleCheckboxChange(task)}
                                        className="me-3 custom-checkbox"
                                    />
                                    <div className="flex-grow-1">
                                        <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>
                                            {task.title}
                                        </span>
                                        <p className="mb-0 text-muted small">{task.description}</p>
                                        <p className="mb-0 text-muted small">Data Prevista para Conclusão: {new Date(task.dueDate).toLocaleDateString()}</p>
                                        <p className="mb-0 text-muted small">Data de Conclusão: {task.completedDate ? new Date(task.completedDate).toLocaleDateString() : 'N/A'}</p>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}

export default CompletedTasks;