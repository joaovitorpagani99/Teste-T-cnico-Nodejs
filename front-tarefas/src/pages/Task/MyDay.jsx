import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, toggleCompleteTask, deleteTask } from '../../Services/Tasks';
import { Container, Alert, Button } from 'react-bootstrap';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import ModalTask from '../../components/ModalTask/ModalTask';
import TaskList from '../../components/TaskList/TaskList';

function MyDay() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const today = new Date().toISOString().split('T')[0];
                const data = await getTasks(today);
                setTasks(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleSave = async (task) => {
        try {
            const today = new Date().toISOString().split('T')[0];
            if (task.id) {
                const updatedTask = { ...task, dueDate: today };
                const response = await updateTask(updatedTask.id, updatedTask);
                setTasks(tasks.map(t => (t.id === updatedTask.id ? response : t)));
                toast.success('Tarefa atualizada com sucesso!');
            } else {
                const newTask = { ...task, dueDate: today };
                const createdTask = await createTask(newTask);
                setTasks([...tasks, createdTask]);
                toast.success('Tarefa criada com sucesso!');
            }
            setShowModal(false);
            setCurrentTask(null);
        } catch (error) {
            setError(error.message);
            toast.error('Erro ao salvar tarefa.');
        }
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
            toast.success('Tarefa removida com sucesso!');
        } catch (error) {
            setError(error.message);
            toast.error('Erro ao deletar tarefa.');
        }
    };

    const handleCheckboxChange = async (task) => {
        try {
            const updatedTask = await toggleCompleteTask(task.id);
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
            <h1 className="my-4">Minhas Tarefas do Dia</h1>
            <Button variant="primary" className="mb-4" onClick={() => setShowModal(true)}>
                <FaPlus className="me-2" /> Cadastrar Nova Tarefa
            </Button>
            {tasks.length === 0 ? (
                <Alert variant="info">Nenhuma tarefa cadastrada para hoje.</Alert>
            ) : (
                <TaskList
                    tasks={tasks}
                    onCheckboxChange={handleCheckboxChange}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {/* Modal para cadastrar ou editar tarefa */}
            <ModalTask
                show={showModal}
                handleClose={() => setShowModal(false)}
                task={currentTask || { title: '', description: '', dueDate: '' }}
                handleSave={handleSave}
                modalTitle={currentTask ? 'Editar Tarefa' : 'Cadastrar Nova Tarefa'}
            />
        </Container>
    );
}

export default MyDay;