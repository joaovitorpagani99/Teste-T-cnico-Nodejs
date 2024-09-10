import React, { useEffect, useState } from 'react';
import { getTasks, toggleCompleteTask } from '../../Services/Tasks';
import { Container, Alert, Accordion } from 'react-bootstrap';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import toast from 'react-hot-toast';
import TaskList from '../../components/TaskList/TaskList';

function CompletedTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
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
            const updatedTask = await toggleCompleteTask(task.id);
            const today = new Date();
            const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);

            if (updatedTask.isCompleted) {
                updatedTask.completedDate = localDate;
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
            <Accordion defaultActiveKey="0" className="accordion-item completed mt-5">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Tarefas Concluídas</Accordion.Header>
                    <Accordion.Body>
                        <TaskList
                            tasks={tasks}
                            onCheckboxChange={handleCheckboxChange}
                            onEdit={() => { }}
                            onDelete={() => { }}
                        />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}

export default CompletedTasks;