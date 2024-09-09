import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalTask({ show, handleClose, task, handleSave, modalTitle }) {
    const [title, setTitle] = useState(task.title || '');
    const [description, setDescription] = useState(task.description || '');
    const [dueDate, setDueDate] = useState(task.dueDate || ''); // Adicionar estado para a data prevista de conclusão

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave({ ...task, title, description, dueDate }); // Incluir a data prevista na tarefa
    };

    // Obter a data atual no formato YYYY-MM-DD
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTaskTitle">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o título da tarefa"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTaskDescription" className="mt-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Digite a descrição da tarefa"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formTaskDueDate" className="mt-3">
                        <Form.Label>Data Prevista para Conclusão</Form.Label>
                        <Form.Control
                            type="date"
                            value={dueDate}
                            min={getCurrentDate()} // Definir a data mínima como a data atual
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Salvar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalTask;