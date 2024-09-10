import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../../contexts/AuthContext';
import { FaBars, FaTimes, FaHome, FaTasks, FaCheckCircle, FaSun, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
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
                            <Link to="/" className="menu-link">
                                <FaHome className="menu-icon" /> Home
                            </Link>
                            <Link to="/myday" className="menu-link">
                                <FaSun className="menu-icon" /> Meu Dia
                            </Link>
                            <Link to="/tasks" className="menu-link">
                                <FaTasks className="menu-icon" /> Todas as Tarefas
                            </Link>
                            <Link to="/completed-tasks" className="menu-link">
                                <FaCheckCircle className="menu-icon" /> Tarefas Completas
                            </Link>

                        </>
                    ) : (
                        <>
                            <Link to="/login" className="menu-link">
                                <FaSignInAlt className="menu-icon" /> Login
                            </Link>
                            <Link to="/cadastroUsuario" className="menu-link">
                                <FaUserPlus className="menu-icon" /> Cadastrar
                            </Link>
                        </>
                    )}
                </nav>
                {user && (
                    <div className="logout-container">
                        <a href="#" onClick={logout} className="menu-link logout-link">
                            <FaSignOutAlt className="menu-icon" /> Logout
                        </a>
                    </div>
                )}
                <button className="menu-toggle" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
        </>
    );
}

export default Menu;