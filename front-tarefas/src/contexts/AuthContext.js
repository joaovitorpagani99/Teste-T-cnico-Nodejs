import React, { createContext, useState, useEffect } from 'react';
import auth from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = auth.getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = async (username, password) => {
        const userData = await auth.login(username, password);
        setUser(userData);
    };

    const register = async (username, password) => {
        await auth.register(username, password);
    };

    const logout = () => {
        auth.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;