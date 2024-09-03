import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, register as apiCadastro } from '../Services/Auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        }
    }, []);

    const login = async (email, password) => {
        try {
            const data = await apiLogin(email, password);
            if (data && data.access_token) {
                setUser({ token: data.access_token });
                localStorage.setItem('token', data.access_token);
                navigate('/');
            } else {
                throw new Error('Token de acesso não encontrado na resposta de login.');
            }
        } catch (error) {
            throw new Error(error.message || 'Erro ao realizar login.');
        }
    };

    const cadastro = async (name, email, password) => {
        try {
            const data = await apiCadastro(name, email, password);
            if (data && data.access_token) {
                setUser({ token: data.access_token });
                localStorage.setItem('token', data.access_token);
                navigate('/');
            } else {
                throw new Error('Token de acesso não encontrado na resposta de cadastro.');
            }
        } catch (error) {
            throw new Error(error.message || 'Erro ao realizar cadastro.');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, cadastro, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;