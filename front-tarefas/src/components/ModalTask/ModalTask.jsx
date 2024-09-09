import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalTask({ show, handleClose, task, handleSave, title }) {
    const [updatedTask, setUpdatedTask] = useState({ title: '', description: '' });

    useEffect(() => {
        setUpdatedTask({ ...task });
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    const handleSubmit = () => {
        handleSave(updatedTask);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={updatedTask.title}
                            onChange={handleChange}
                            placeholder="Digite o título da tarefa"
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription" className="mt-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={updatedTask.description}
                            onChange={handleChange}
                            placeholder="Digite a descrição da tarefa"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalTask;