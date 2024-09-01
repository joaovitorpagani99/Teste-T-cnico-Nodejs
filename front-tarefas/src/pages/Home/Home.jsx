import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="container mt-5">
            <div className="jumbotron bg-light p-5 rounded">
                <h1 className="display-4">Bem-vindo à Página Inicial!</h1>
                <p className="lead">Esta é a página inicial do seu aplicativo. Aqui você pode encontrar informações importantes e navegar para outras seções.</p>
                <hr className="my-4" />
                <p>Selecione uma opção abaixo2D.</p>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/tasks" className="text-decoration-none">
                            <div className="card text-center mb-4">
                                <div className="card-body">
                                    <i className="bi bi-list-task display-4"></i>
                                    <h5 className="card-title mt-3">Ver Tarefas</h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <Link to="/cadastro" className="text-decoration-none">
                            <div className="card text-center mb-4">
                                <div className="card-body">
                                    <i className="bi bi-pencil-square display-4"></i>
                                    <h5 className="card-title mt-3">Cadastrar Tarefas</h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;