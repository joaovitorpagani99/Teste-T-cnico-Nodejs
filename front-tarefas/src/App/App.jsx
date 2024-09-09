import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Footer from '../components/Footer/Footer';
import Menu from "../components/nav/Menu";
import CadastroUsuario from '../pages/Cadastro/CadastroUsuario';
import NotFound from '../pages/NotFound/NotFound';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from '../components/private/PrivateRoute';
import Task from '../pages/Task/Task';
import CompletedTasks from '../pages/Task/CompletedTasks';
import MyDay from '../pages/Task/MyDay';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Menu />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
              <Route path="/tasks" element={<PrivateRoute><Task /></PrivateRoute>} />
              <Route path="/completed-tasks" element={<PrivateRoute><CompletedTasks /></PrivateRoute>} />
              <Route path="/myday" element={<PrivateRoute><MyDay /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;