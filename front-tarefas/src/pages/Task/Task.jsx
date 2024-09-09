import React, { useState, useEffect } from 'react';
import { getTasks, toggleCompleteTask, deleteTask, createTask, updateTask } from '../../Services/Tasks';
import { Container, ListGroup, Dropdown, Alert, Accordion, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaEllipsisV } from 'react-icons/fa';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import ModalTask from '../../components/ModalTask/ModalTask';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Task.css';

function Task() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [filterDate, setFilterDate] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error("Token not found in localStorage");
                }

                const data = await getTasks(token);
                console.log("Resposta da API:", data);
                if (Array.isArray(data)) {
                    setTasks(data);
                } else {
                    throw new Error("Não tem tarefas cadastradas.");
                }
            } catch (error) {
                if (error.message === "Nenhuma tarefa cadastrada.") {
                    setError("Nenhuma tarefa cadastrada.");
                } else if (error.message === "Não autorizado. Por favor, faça login novamente.") {
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

    const filteredTasks = filterDate
        ? tasks.filter(task => {
            const taskDueDate = new Date(task.dueDate).toISOString().split('T')[0];
            const selectedFilterDate = filterDate.toISOString().split('T')[0];
            return taskDueDate === selectedFilterDate;
        })
        : tasks;

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Container>
            <h1 className="my-4">Lista de Tarefas</h1>
            <Button variant="primary" className="mb-4" onClick={() => setShowModal(true)}>
                <FaPlus className="me-2" /> Cadastrar Nova Tarefa
            </Button>
            <Form.Group controlId="filterDate" className="mb-4">
                <Form.Label>Filtrar por Data de Vencimento</Form.Label>
                <DatePicker
                    selected={filterDate}
                    onChange={(date) => setFilterDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText="Selecione uma data"
                />
            </Form.Group>
            {error && error === "Nenhuma tarefa cadastrada." ? (
                <Alert variant="info">{error}</Alert>
            ) : (
                <>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Accordion defaultActiveKey="0" className="mb-4 accordion-item pending">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Tarefas Pendentes</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    {filteredTasks.filter(task => !task.isCompleted).map(task => (
                                        <ListGroup.Item key={task.id} className={`d-flex justify-content-between align-items-center mb-2 rounded-4 task-item pending`}>
                                            <Form.Check
                                                type="checkbox"
                                                checked={task.isCompleted}
                                                onChange={() => handleCheckboxChange(task)}
                                                className="me-3 custom-checkbox"
                                            />
                                            <div className="flex-grow-1">
                                                <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', opacity: task.isCompleted ? 0.5 : 1 }}>
                                                    {task.title}
                                                </span>
                                                <p className="mb-0 text-muted small">{task.description}</p>
                                                <p className="mb-0 text-muted small">Data Prevista para Conclusão: {new Date(task.dueDate).toLocaleDateString()}</p>
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
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Accordion defaultActiveKey="0" className="accordion-item completed">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Tarefas Concluídas</Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    {filteredTasks.filter(task => task.isCompleted).map(task => (
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
                task={{ title: '', description: '', dueDate: '' }}
                handleSave={handleSave}
                modalTitle="Cadastrar Nova Tarefa"
            />

            {/* Modal para editar tarefa */}
            {currentTask && (
                <ModalTask
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    task={currentTask}
                    handleSave={handleSave}
                    modalTitle="Editar Tarefa"
                />
            )}
        </Container>
    );
}

export default Task;