import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from '../pages/Cadastro/Cadastro';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';

function App() {

  return (
    <>
      <h1>App</h1>
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
    </>
  )
}

export default App;