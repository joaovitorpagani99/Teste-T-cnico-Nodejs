import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

const LoadingSpinner = () => (
    <Container className="text-center my-4">
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando...</span>
        </Spinner>
    </Container>
);

export default LoadingSpinner;