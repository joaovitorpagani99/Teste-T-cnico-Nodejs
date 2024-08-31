import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from '../pages/Cadastro/Cadastro';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Footer from '../components/footer/footer';

import './App.css'


function App() {

  return (
    <>
      <section className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<h1>Tarefas</h1>} />
            <Route path="/tasks/:id" element={<h1>Tarefa</h1>} />
            <Route path="cadastro" element={<Cadastro />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </section>
      <Footer />
    </>

  )
}

export default App;