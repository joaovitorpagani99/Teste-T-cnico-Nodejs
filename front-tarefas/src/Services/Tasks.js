import axios from 'axios';

const apiUrl = `${import.meta.env.VITE_API_URL}/tasks`;

export const getTasks = async (token, date) => {
    try {
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