import "./App.modules.css";
import { useState, useEffect } from "react";
import axios from "axios";
import deleteIcon from "./assets/red-delete-10437.svg";

const BASE_URL = "http://192.168.0.7:5000/api";

function App() {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");

    useEffect(() => {
        getTodos();
    }, [todo]);

    const getTodos = () => {
        axios
            .get(`${BASE_URL}/todos`)
            .then((res) => setTodos(res.data))
            .catch((err) => console.error(err));
    };

    const handleAddTodo = () => {
        axios
            .post(`${BASE_URL}/todo/new`, {
                title: todo,
            })
            .then((res) => {
                setTodos([...todos, res.data]);
                setTodo("");
            })
            .catch((err) => console.error(err));
    };

    const handleDeleteTodo = (id) => {
        axios
            .delete(`${BASE_URL}/todo/delete/${id}`)
            .then((res) =>
                setTodos(todos.filter((todo) => todo._id !== res.data._id))
            )
            .catch((err) =>
                console.error(err)
            );
    };

    const handleTodoClick = (id) => {
        axios
            .get(`${BASE_URL}/todo/toggleStatus/${id}`)
            .then((res) => getTodos())
            .catch((err) => console.error(err));
    };

    return (
        <div className="App">
            <div className="todo-input-wrapper">
                <input className="todo-input-bar"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="ADD a New Todo"
                />
                <div className="add-button" onClick={handleAddTodo}>
                    +
                </div>
            </div>
            <div className="todos-list">
                {!todos || !todos.length ? (
                    <h3 style={{ textAlign: "center" }}>No Todo Data !!!</h3>
                ) : (
                    todos.map((todo, index) => (
                        <div className="todo" key={index}>
                            <div
                                onClick={() => handleTodoClick(todo._id)}
                                className={todo.complete ? "complete" : ""}
                                id="todo-title"
                            >
                                {todo.title}
                            </div>
                            <div
                                className="delete"
                                onClick={() => handleDeleteTodo(todo._id)}
                            >
                                <img src={deleteIcon} alt="delete" height="20px" width="20px" />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;