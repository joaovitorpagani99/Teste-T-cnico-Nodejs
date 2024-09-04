import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListagemTask.css';
import { getTasks } from '../../../Services/Tasks';

function ListagemTask() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                console.log(data);
                setTasks(data);
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
            }
        };

        fetchTasks();
    }, []);

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