import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../../contexts/AuthContext';
import './Menu.css';

function Menu() {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="header w-100 px-3 py-2 bg-white text-dark">
            <nav className="d-flex align-items-center justify-content-between">
                <Link to="/" className="logo">
                    <img src="/icone de tarefa.jpg" alt="Tarefas" width={50} />
                </Link>
                <div className="menu-links d-flex gap-3">
                    {user ? (
                        <>
                            <Link to="/" className="menu-link">Home</Link>
                            <Link to="/cadastroTask" className="menu-link">Cadastrar Tarefas</Link>
                            <Link to="/tasks" className="menu-link">Tarefas</Link>
                            <a href="#" onClick={logout} className="menu-link">Logout</a>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="menu-link">Login</Link>
                            <Link to="/cadastroUsuario" className="menu-link">Cadastrar</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Menu;