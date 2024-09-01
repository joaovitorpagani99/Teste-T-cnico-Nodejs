import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListagemTask.css'; 

function ListagemTask() {
    const [tasks, setTasks] = useState([
        { id: 1, titulo: 'Tarefa 1', descricao: 'Descrição da Tarefa 1' },
        { id: 2, titulo: 'Tarefa 2', descricao: 'Descrição da Tarefa 2' },
        { id: 3, titulo: 'Tarefa 3', descricao: 'Descrição da Tarefa 3' },
    ]);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Listagem de Tarefas</h1>
            <div className="row">
                {tasks.map(task => (
                    <div className="col-md-4" key={task.id}>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{task.titulo}</h5>
                                <p className="card-text">{task.descricao}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListagemTask;