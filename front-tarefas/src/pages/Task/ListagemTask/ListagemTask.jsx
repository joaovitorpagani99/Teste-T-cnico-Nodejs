import React, { useState, useEffect } from 'react';
import './ListagemTask.css';
import { getTasks } from '../../../Services/Tasks';

function ListagemTask() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setError(error.message);
                console.error("Erro ao buscar tarefas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

    if (tasks.length === 0) {
        return <div>Nenhuma tarefa encontrada.</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Listagem de Tarefas</h1>
            <div className="row">
                {tasks.map(task => (
                    <div className="col-md-4" key={task.id}>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{task.title}</h5>
                                <p className="card-text">{task.description}</p>
                                <p className="card-text">
                                    <small className="text-muted">
                                        {task.isCompleted ? 'Concluída' : 'Pendente'}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListagemTask;