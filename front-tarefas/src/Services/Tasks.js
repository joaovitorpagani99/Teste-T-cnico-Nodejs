import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

export const getTasks = async (date) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token não encontrado');
        }

        const params = date ? { date: new Date(date).toISOString().split('T')[0] } : {};
        console.log("Parâmetros da solicitação:", params); // Adiciona este console.log para ver os parâmetros da solicitação

        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params
        });
        console.log("Resposta da API no getTasks:", response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        throw new Error('Erro ao buscar tarefas');
    }
};

export const createTask = async (task) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(API_URL, task, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Resposta da API no createTask:", response.data);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao criar tarefa');
    }
};

export const updateTask = async (taskId, task) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/${taskId}`, task, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Resposta da API no updateTask:", response.data);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao atualizar tarefa');
    }
};

export const deleteTask = async (taskId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_URL}/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Resposta da API no deleteTask:", response.data);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao deletar tarefa');
    }
};

export const toggleCompleteTask = async (taskId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.patch(`${API_URL}/${taskId}/toggle-complete`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Resposta da API no toggleCompleteTask:", response.data);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao atualizar tarefa');
    }
};