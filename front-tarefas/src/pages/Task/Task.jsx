import React, { useEffect, useState } from 'react';
import { getTasks, toggleCompleteTask, deleteTask, createTask, updateTask } from '../../Services/Tasks';
import { Container, ListGroup, Dropdown, Alert, Accordion, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaEllipsisV } from 'react-icons/fa';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import ModalTask from '../../components/ModalTask/ModalTask';
import toast from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';
import './Task.css';
import DateCarousel from '../../components/DateCarousel/DateCarousel';
import { parseISO, format, isSameDay } from 'date-fns';

const formatDate = (dateString) => {
    const date = parseISO(dateString);
    console.log("Data formatada:", format(date, 'dd/MM/yyyy'));
    return format(date, 'dd/MM/yyyy');
};

const getBrasiliaDate = () => {
    const brDate = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date());

    const [day, month, year] = brDate.split('/');
    return `${year}-${month}-${day}`;
};

function Task() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [filterDate, setFilterDate] = useState(new Date());
    const [isDateFilterEnabled, setIsDateFilterEnabled] = useState(false); // Inicia como false

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                console.log("Data de filtro:", filterDate); // Adiciona este console.log para ver a data de filtro
                const data = await getTasks(isDateFilterEnabled ? filterDate : null);
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
    }, [filterDate, isDateFilterEnabled]);

    const handleEdit = (task) => {
        setCurrentTask(task);
        setShowEditModal(true);
    };

    const handleSave = async (task) => {
        try {
            const token = localStorage.getItem('token');
            if (task.id) {
                await updateTask(task.id, task, token);
                setTasks(tasks.map(t => (t.id === task.id ? task : t)));
                toast.success('Tarefa atualizada com sucesso!');
            } else {
                const newTask = await createTask(task, token);
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
            const token = localStorage.getItem('token');
            const updatedTask = await toggleCompleteTask(task.id, token);
            const localDate = getBrasiliaDate();

            if (updatedTask.isCompleted) {
                updatedTask.completedDate = localDate; // Define a data de conclusão como a data de hoje no horário de Brasília
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

    const filteredTasks = isDateFilterEnabled && filterDate
        ? tasks.filter(task => {
            const taskDueDate = parseISO(task.dueDate);
            return isSameDay(taskDueDate, filterDate);
        })
        : tasks;

    console.log("Tarefas filtradas:", filteredTasks); // Adiciona este console.log para ver as tarefas filtradas

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <Container>
            <h1 className="my-4">Lista de Tarefas</h1>
            <Form.Check
                type="checkbox"
                label="Filtrar por data"
                checked={isDateFilterEnabled}
                onChange={(e) => setIsDateFilterEnabled(e.target.checked)}
                className="mb-4"
            />
            {isDateFilterEnabled && (
                <DateCarousel selectedDate={filterDate} onDateChange={setFilterDate} />
            )}
            <Button variant="primary" className="mb-4" onClick={() => setShowModal(true)}>
                <FaPlus className="me-2" /> Cadastrar Nova Tarefa
            </Button>
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
                                                <p className="mb-0 text-muted small">Data Prevista para Conclusão: {formatDate(task.dueDate)}</p>
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
                                                <p className="mb-0 text-muted small">Data Prevista para Conclusão: {formatDate(task.dueDate)}</p>
                                                <p className="mb-0 text-muted small">Data de Conclusão: {task.completedDate ? formatDate(task.completedDate) : 'N/A'}</p>
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