import logo from "./logo.svg";
/*import './App.css';*/
import React, { useState, useRef, useEffect } from "react";
import {v4 as uuidv4} from 'uuid'
import { TodoList } from "./component/TodoList";

const key = 'todoApp.todos';

export function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: "Tarea 1", completed: false },
  ]);
  
  const todoTaskRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem (key));
    if (storedTodos){
      setTodos(storedTodos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem( key, JSON.stringify(todos))
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos (newTodos);
  }
  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if (task === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), task, completed: false}]
    });
    todoTaskRef.current.value = null
  };
  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }
  return (
    <React.Fragment>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea"></input>
      <button onClick={handleTodoAdd}>Add</button>
      <button onClick={handleClearAll}>Delete</button>
      
      <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar</div>
    </React.Fragment>
  );

  /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
}
