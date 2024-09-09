import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

export const getTasks = async (date) => {
    try {
        const token = localStorage.getItem('token'); // Certifique-se de obter o token aqui
        if (!token) {
            throw new Error('Token não encontrado');
        }
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                date: date
            }
        });
        console.log("Resposta da API no getTasks:", response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error); // Adicione logs para depuração
        throw new Error('Erro ao buscar tarefas');
    }
};

export const createTask = async (task) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado');
        }
        const response = await axios.post(API_URL, task, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Resposta da API no createTask:", response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar tarefa:', error); // Adicione logs para depuração
        throw new Error('Erro ao criar tarefa');
    }
};

export const updateTask = async (taskId, task) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado');
        }
        const response = await axios.put(`${API_URL}/${taskId}`, task, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Resposta da API no updateTask:", response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error); // Adicione logs para depuração
        throw new Error('Erro ao atualizar tarefa');
    }
};

export const deleteTask = async (taskId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado');
        }
        const response = await axios.delete(`${API_URL}/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Resposta da API no deleteTask:", response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error); // Adicione logs para depuração
        throw new Error('Erro ao deletar tarefa');
    }
};

export const toggleCompleteTask = async (taskId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado');
        }
        const response = await axios.patch(`${API_URL}/${taskId}/toggle-complete`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Resposta da API no toggleCompleteTask:", response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error); // Adicione logs para depuração
        throw new Error('Erro ao atualizar tarefa');
    }
};