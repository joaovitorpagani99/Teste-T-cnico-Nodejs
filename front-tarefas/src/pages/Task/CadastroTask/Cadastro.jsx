import React, { useState } from 'react';

function Cadastro() {
    const [novaTask, setNovaTask] = useState('');
    const [tasks, setTasks] = useState([]);

    const handleAddTask = () => {
        if (novaTask.trim() !== '') {
            setTasks([...tasks, { nome: novaTask, concluida: false }]);
            setNovaTask('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleToggleConcluida = (index) => {
        const newTasks = [...tasks];
        newTasks[index].concluida = !newTasks[index].concluida;
        setTasks(newTasks);
    };

    return (
        <div>
            <div className="input-group mt-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nova tarefa"
                    value={novaTask}
                    onChange={(e) => setNovaTask(e.target.value)}
                />
                <button className="btn btn-success" onClick={handleAddTask}>
                    <i className="bi bi-plus-lg"></i>
                </button>
            </div>
            <ul className="list-group mt-3">
                {tasks.map((task, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span style={{ textDecoration: task.concluida ? 'line-through' : 'none' }}>
                            {task.nome}
                        </span>
                        <input
                            type="checkbox"
                            checked={task.concluida}
                            onChange={() => handleToggleConcluida(index)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cadastro;