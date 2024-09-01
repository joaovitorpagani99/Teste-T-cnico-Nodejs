import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cadastro.css'; 

function Cadastro() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Tarefa cadastrada:', { titulo, descricao });
        setTitulo('');
        setDescricao('');
    };

    return (
        <section className="container mt-5">
            <h1 className="mb-4">Cadastro de Tarefas</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                        className="form-control"
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Cadastrar</button>
            </form>
        </section>
    );
}

export default Cadastro;