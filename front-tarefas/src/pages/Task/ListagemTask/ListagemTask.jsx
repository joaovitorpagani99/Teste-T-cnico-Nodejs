import React, { useState, useEffect } from 'react';
import { getTasks, updateTask, deleteTask, completeTask, createTask } from '../../../Services/Tasks';
import { Container, ListGroup, Dropdown, Alert, Accordion, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck, FaEllipsisV, FaPlus } from 'react-icons/fa';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import ModalTask from '../../../components/ModalTask/ModalTask';

function ListagemTask() {
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

    const handleSave = async (updatedTask) => {
        try {
            const token = localStorage.getItem('token');
            if (updatedTask.id) {
                await updateTask(updatedTask.id, updatedTask, token);
                setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
            } else {
                const createdTask = await createTask(updatedTask, token);
                setTasks([...tasks, createdTask]);
            }
            setShowModal(false);
            setShowEditModal(false);
        } catch (error) {
            setError(error.message);
            console.error("Erro ao salvar tarefa:", error);
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
            setTasks(tasks.map(task => (task.id === id ? { ...task, isCompleted: true } : task)));
        } catch (error) {
            setError(error.message);
            console.error("Erro ao concluir tarefa:", error);
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
                    <ListGroup>
                        {tasks.filter(task => !task.isCompleted).map(task => (
                            <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center mb-2 rounded-4">
                                <div>
                                    <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                                        {task.title}
                                    </span>
                                    <p className="mb-0 text-muted small">{task.description}</p>
                                </div>
                                <Dropdown>
                                    <Dropdown.Toggle variant="link" id="dropdown-basic" className="p-0 border-0" />
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleEdit(task)}>
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
                    <Accordion className="mt-4">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Tarefas Concluídas</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    {tasks.filter(task => task.isCompleted).map(task => (
                                        <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center mb-2 rounded-4">
                                            <div>
                                                <span style={{ textDecoration: 'line-through' }}>
                                                    {task.title}
                                                </span>
                                                <p className="mb-0 text-muted small">{task.description}</p>
                                            </div>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="link" id="dropdown-basic" className="p-0 border-0" />
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleEdit(task)}>
                                                        <FaEdit className="me-2" /> Editar
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleDelete(task.id)}>
                                                        <FaTrash className="me-2" /> Deletar
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
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

export default ListagemTask;