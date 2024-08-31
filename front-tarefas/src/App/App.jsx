import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cadastro from '../pages/Cadastro/Cadastro';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Footer from '../components/footer/footer';
import Menu from "../components/nav/Menu";

import './App.css';

function App() {
  return (
    <Router>
      <Menu />
      <section className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<h1>Tarefas</h1>} />
          <Route path="/tasks/:id" element={<h1>Tarefa</h1>} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </section>
      <Footer />
    </Router>
  );
}

export default App;