import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroTask from '../pages/Task/CadastroTask/Cadastro';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Footer from '../components/footer/footer';
import Menu from "../components/nav/Menu";
import ListagemTask from '../pages/Task/ListagemTask/ListagemTask';
import CadastroUsuario from '../pages/Cadastro/CadastroUsuario';
import NotFound from '../pages/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div id="root">
        <Menu />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<ListagemTask />} />
            <Route path="/tasks/:id" element={<CadastroTask />} />
            <Route path="/cadastroTask" element={<CadastroTask />} />
            <Route path='/cadastroUsuario' element={<CadastroUsuario />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;