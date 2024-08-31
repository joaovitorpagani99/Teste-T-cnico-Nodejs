import { Link } from "react-router-dom";

function Menu() {
    return (
        <header className="header w-100 px-3 py-2 bg-white text-dark">
            <nav className="d-flex justify-content-end align-items-center">
                <div className="d-flex gap-3">
                    <Link to="/" className="text-dark">Home</Link>
                    <Link to="/tasks" className="text-dark">Tarefas</Link>
                </div>
            </nav>
        </header>
    )
}

export default Menu;