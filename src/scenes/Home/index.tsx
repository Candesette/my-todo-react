import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "../../components/TodoList";
import { Border, Button, Container, ContainerChildren, Input, TextStyle } from "../../core";

const key = "todoApp.todos";

export type Item = { id: string; completed: boolean; task: string };

export function Home() {
  const [todos, setTodos] = useState<Item[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(key) ?? "[]");

    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  const toggleTodo = (id: string) => {
    const newTodos = [...todos];

    const todo = newTodos.find((todo) => todo.id === id);

    if (todo) {
      todo.completed = !todo.completed;

      setTodos(newTodos);

      localStorage.setItem(key, JSON.stringify(newTodos));
    }
  };

  const handleTodoAdd = () => {
    const task = inputRef.current?.value;
    if (!task) return;

    setTodos((prevTodos) => {
      const todosToAppend = [
        ...prevTodos,
        { id: uuidv4(), task, completed: false },
      ];

      localStorage.setItem(key, JSON.stringify(todosToAppend));

      return todosToAppend;
    });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);

    setTodos(newTodos);

    localStorage.setItem(key, JSON.stringify(newTodos));
  };

  return (
   <>
    <Container>
      <ContainerChildren>
        <Input ref={inputRef} type="text" placeholder="New Task"></Input>
        <Button onClick={handleTodoAdd}>Add</Button>
        <button onClick={handleClearAll}>Delete</button>

        <TextStyle>
        Te quedan {todos.filter((todo) => !todo.completed).length} tareas por
        terminar
        </TextStyle>

        <Border>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        </Border>
        
      </ContainerChildren>
      
    </Container>
      
    
    </>
  );
}
