
import React, { useState, useEffect } from 'react';
import { getTasks, toggleCompleteTask, deleteTask, createTask, updateTask } from '../../Services/Tasks';
import { Container, ListGroup, Dropdown, Alert, Accordion, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck, FaPlus, FaEllipsisV } from 'react-icons/fa';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import ModalTask from '../../components/ModalTask/ModalTask';
import toast from 'react-hot-toast';
import './Task.css';

function Task() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

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
                if (error.response && error.response.status === 404) {
                    setError("Nenhuma tarefa cadastrada.");
                } else if (error.response && error.response.status === 401) {
                    setError("Não autorizado. Por favor, faça login novamente.");
                } else {
                    setError(error.message);
                }
                console.error("Erro ao buscar tarefas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleEdit = (task) => {
        setCurrentTask(task);
        setShowEditModal(true);
    };

    const handleSave = async (task) => {
        try {
            const token = localStorage.getItem('token');
            if (task.id) {
                await updateTask(task.id, task);
                setTasks(tasks.map(t => (t.id === task.id ? task : t)));
                toast.success('Tarefa atualizada com sucesso!');
            } else {
                const newTask = await createTask(task);
                setTasks([...tasks, newTask]);
                toast.success('Tarefa criada com sucesso!');
            }
            setShowEditModal(false);
            setShowModal(false);
        } catch (error) {
            setError(error.message);
            toast.error('Erro ao salvar tarefa.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await deleteTask(id, token);
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
            <h1 className="my-4">Lista de Tarefas</h1>
            <Button variant="primary" className="mb-4" onClick={() => setShowModal(true)}>
                <FaPlus className="me-2" /> Cadastrar Nova Tarefa
            </Button>
            {error && error === "Nenhuma tarefa cadastrada." ? (
                <Alert variant="info">{error}</Alert>
            ) : (
                <>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="task-container">
                        <ListGroup>
                            {tasks.filter(task => !task.isCompleted).map(task => (
                                <ListGroup.Item key={task.id} className={`d-flex justify-content-between align-items-center mb-2 rounded-4 task-item ${task.isCompleted ? 'completed' : ''}`}>
                                    <Form.Check
                                        type="checkbox"
                                        checked={task.isCompleted}
                                        onChange={() => handleCheckboxChange(task)}
                                        className="me-3 custom-checkbox"
                                    />
                                    <div className="flex-grow-1">
                                        <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                                            {task.title}
                                        </span>
                                        <p className="mb-0 text-muted small">{task.description}</p>
                                    </div>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="link" id="dropdown-basic" className="p-0 border-0">
                                            <FaEllipsisV />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleEdit(task)}>
                                                <FaEdit className="me-2" /> Editar
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDelete(task.id)}>
                                                <FaTrash className="me-2" /> Deletar
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleCheckboxChange(task)}>
                                                <FaCheck className="me-2" /> {task.isCompleted ? 'Marcar como Pendente' : 'Concluir'}
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                    <Accordion className="mt-4">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Tarefas Concluídas</Accordion.Header>
                            <Accordion.Body>
                                <div className="completed-task-container">
                                    <ListGroup>
                                        {tasks.filter(task => task.isCompleted).map(task => (
                                            <ListGroup.Item key={task.id} className={`d-flex justify-content-between align-items-center mb-2 rounded-4 task-item ${task.isCompleted ? 'completed' : ''}`}>
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={task.isCompleted}
                                                    onChange={() => handleCheckboxChange(task)}
                                                    className="me-3 custom-checkbox"
                                                />
                                                <div className="flex-grow-1">
                                                    <span style={{ textDecoration: 'line-through' }}>
                                                        {task.title}
                                                    </span>
                                                    <p className="mb-0 text-muted small">{task.description}</p>
                                                </div>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="link" id="dropdown-basic" className="p-0 border-0">
                                                        <FaEllipsisV />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => handleEdit(task)}>
                                                            <FaEdit className="me-2" /> Editar
                                                        </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => handleDelete(task.id)}>
                                                            <FaTrash className="me-2" /> Deletar
                                                        </Dropdown.Item>
                                                        <Dropdown.Item onClick={() => handleCheckboxChange(task)}>
                                                            <FaCheck className="me-2" /> {task.isCompleted ? 'Marcar como Pendente' : 'Concluir'}
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </>
            )}

            {/* Modal para cadastrar nova tarefa */}
            <ModalTask
                show={showModal}
                handleClose={() => setShowModal(false)}
                task={{ title: '', description: '' }}
                handleSave={handleSave}
                title="Cadastrar Nova Tarefa"
            />

            {/* Modal para editar tarefa */}
            {currentTask && (
                <ModalTask
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    task={currentTask}
                    handleSave={handleSave}
                    title="Editar Tarefa"
                />
            )}
        </Container>
    );
}

export default Task;