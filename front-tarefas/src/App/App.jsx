import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroTask from '../pages/Task/CadastroTask/Cadastro';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Footer from '../components/footer/footer';
import Menu from "../components/nav/Menu";
import ListagemTask from '../pages/Task/ListagemTask/ListagemTask';
import CadastroUsuario from '../pages/Cadastro/CadastroUsuario';
import './App.css';

function App() {
  return (
    <Router>
      <Menu />
      <section className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<ListagemTask />} />
          <Route path="/tasks/:id" element={<h1>Tarefa</h1>} />
          <Route path="/cadastroTask" element={<CadastroTask />} />
          <Route path='/cadastroUsuario' element={<CadastroUsuario />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </section>
      <Footer />
    </Router>
  );
}

export default App;