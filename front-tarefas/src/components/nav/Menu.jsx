import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../../contexts/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Menu.css';

function Menu() {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={`header ${isOpen ? 'open' : ''}`}>
                <div className="logo">
                    <Link to="/">
                        <img src="/icone de tarefa.jpg" alt="Tarefas" width={50} />
                    </Link>
                </div>
                <nav className="menu-links">
                    {user ? (
                        <>
                            <Link to="/" className="menu-link">Home</Link>
                            <Link to="/tasks" className="menu-link">Tarefas</Link>
                            <a href="#" onClick={logout} className="menu-link">Logout</a>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="menu-link">Login</Link>
                            <Link to="/cadastroUsuario" className="menu-link">Cadastrar</Link>
                        </>
                    )}
                </nav>
                <button className="menu-toggle" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
        </>
    );
}

export default Menu;