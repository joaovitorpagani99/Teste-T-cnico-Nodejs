import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <main className="container mt-5 d-flex flex-column align-items-center justify-content-center text-center">
            <section className="bg-light p-5 rounded">
                <h1 className="display-4">Bem-vindo à Página de Tarefas!</h1>
                <p className="lead">Clique no botão abaixo para gerenciar suas tarefas.</p>
                <hr className="my-4" />
                <Link to="/tasks" className="btn btn-primary btn-lg mt-3">
                    Gerenciar Tarefas
                </Link>
            </section>
            <section className="background-image mt-4"></section>
        </main>
    );
}

export default Home;