import React from 'react';
import { ListGroup, Form, Dropdown } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEllipsisV } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';

const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'dd/MM/yyyy');
};

const TaskList = ({ tasks, onCheckboxChange, onEdit, onDelete }) => {
    return (
        <ListGroup>
            {tasks.map(task => (
                <ListGroup.Item key={task.id} className={`d-flex justify-content-between align-items-center mb-2 rounded-4 task-item ${task.isCompleted ? 'completed' : 'pending'}`}>
                    <Form.Check
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => onCheckboxChange(task)}
                        className="me-3 custom-checkbox"
                    />
                    <div className="flex-grow-1">
                        <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none', opacity: task.isCompleted ? 0.5 : 1 }}>
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
                            <Dropdown.Item onClick={() => onEdit(task)}>
                                <FaEdit className="me-2" /> Editar
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => onDelete(task.id)}>
                                <FaTrash className="me-2" /> Deletar
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default TaskList;