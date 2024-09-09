import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <main className="container mt-5">
            <section className="jumbotron bg-light p-5 rounded">
                <h1 className="display-4">Bem-vindo à Página Inicial!</h1>
                <p className="lead">Clique no botão abaixo para gerenciar suas tarefas.</p>
                <hr className="my-4" />
                <Link to="/tasks" className="btn btn-primary btn-lg">
                    Gerenciar Tarefas
                </Link>
            </section>
        </main>
    );
}

export default Home;
