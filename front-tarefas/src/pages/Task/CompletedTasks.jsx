import React, { useEffect, useState } from 'react';
import { getTasks } from '../../Services/Tasks';
import { Container, ListGroup, Alert } from 'react-bootstrap';
import LoadingSpinner from '../../components/loading/LoadingSpinner';

function CompletedTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
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

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Container>
            <h1 className="my-4">Tarefas Completas</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <ListGroup>
                {tasks.map(task => (
                    <ListGroup.Item key={task.id}>
                        <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>
                            {task.title}
                        </span>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}

export default CompletedTasks;