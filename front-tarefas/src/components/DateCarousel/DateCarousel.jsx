import React, { useState, useRef, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import './DateCarousel.css';

const DateCarousel = ({ selectedDate, onDateChange }) => {
    const [startDate, setStartDate] = useState(selectedDate || new Date());
    const carouselRef = useRef(null);

    useEffect(() => {
        setStartDate(selectedDate);
    }, [selectedDate]);

    const handleDateChange = (date) => {
        console.log("Data selecionada no carrossel:", date); // Adiciona este console.log para ver a data selecionada
        setStartDate(date);
        onDateChange(date);
    };

    const handlePrevDay = () => {
        const prevDay = new Date(startDate);
        prevDay.setDate(prevDay.getDate() - 1);
        handleDateChange(prevDay);
    };

    const handleNextDay = () => {
        const nextDay = new Date(startDate);
        nextDay.setDate(nextDay.getDate() + 1);
        handleDateChange(nextDay);
    };

    const getDayOfWeek = (date) => {
        const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        return daysOfWeek[date.getDay()];
    };

    const getFormattedDate = (date) => {
        return `${date.getDate()}`;
    };

    const getDateClass = (date) => {
        const today = new Date();
        if (date.toDateString() === today.toDateString()) {
            return 'date-today';
        } else if (date < today) {
            return 'date-past';
        } else {
            return 'date-future';
        }
    };

    const getDates = (startDate) => {
        const dates = [];
        for (let i = -2; i <= 2; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const dates = getDates(startDate);

    const handleDateClick = (date) => {
        handleDateChange(date);
    };

    return (
        <div className="date-carousel">
            <Button variant="outline-primary" onClick={handlePrevDay}>Anterior</Button>
            <div className="date-display" ref={carouselRef}>
                {dates.map((date, index) => (
                    <div key={index} className="date-item" onClick={() => handleDateClick(date)}>
                        <Card className={`date-card ${getDateClass(date)} ${date.toDateString() === startDate.toDateString() ? 'date-selected' : ''}`}>
                            <Card.Body>
                                <Card.Title>{getDayOfWeek(date)}</Card.Title>
                                <Card.Text>{getFormattedDate(date)}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
            <Button variant="outline-primary" onClick={handleNextDay}>Próximo</Button>
        </div>
    );
};

export default DateCarousel;