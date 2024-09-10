import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTasks } from '../../Services/Tasks'; // Supondo que você tenha essa função
import { Card, Container, Row, Col } from 'react-bootstrap';
import './Home.css';

function Home() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (error) {
                setError('Erro ao buscar tarefas.');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.isCompleted).length;
    const notCompletedTasks = totalTasks - completedTasks;
    const completedPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    const notCompletedPercentage = totalTasks ? (notCompletedTasks / totalTasks) * 100 : 0;

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <main className="container mt-5 d-flex flex-column align-items-center justify-content-center text-center">
            <section className="bg-light p-5 rounded">
                <h1 className="display-4">Bem-vindo à Página de Tarefas!</h1>
                <p className="lead">Clique no botão abaixo para gerenciar suas tarefas.</p>
                <hr className="my-4" />
                <Link to="/tasks" className="btn btn-primary btn-lg mt-3">
                    Gerenciar Tarefas
                </Link>
            </section>
            <Container className="mt-4">
                <Row>
                    <Col md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Total de Tarefas</Card.Title>
                                <Card.Text>{totalTasks}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Porcentagem Concluída</Card.Title>
                                <Card.Text>{completedPercentage.toFixed(2)}%</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Porcentagem Não Concluída</Card.Title>
                                <Card.Text>{notCompletedPercentage.toFixed(2)}%</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <section className="background-image mt-4"></section>
        </main>
    );
}

export default Home;