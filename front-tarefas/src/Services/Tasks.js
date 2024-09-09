import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks'; // Certifique-se de que o endpoint está correto

export const getTasks = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("Resposta da API no getTasks:", response.data); // Adicionar log para verificar a resposta da API
        return response.data;
    } catch (error) {
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
        console.log("Resposta da API no createTask:", response.data); // Adicionar log para verificar a resposta da API
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
        console.log("Resposta da API no updateTask:", response.data); // Adicionar log para verificar a resposta da API
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
        console.log("Resposta da API no deleteTask:", response.data); // Adicionar log para verificar a resposta da API
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
        console.log("Resposta da API no toggleCompleteTask:", response.data); // Adicionar log para verificar a resposta da API
        return response.data;
    } catch (error) {
        throw new Error('Erro ao atualizar tarefa');
    }
};

// tasks.js

// Função para alternar o estado de conclusão de uma tarefa
export const toggleCompleteTask = async (id) => {
    try {
        const token = getToken();
        const response = await axios.patch(`${apiUrl}/${id}/toggle-complete`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Erro ao alternar o estado de conclusão da tarefa com ID ${id}:`, error);
        throw error;
    }
};