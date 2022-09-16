import React, { useState, useRef, useEffect, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "../../components/TodoList";
import { TextStyle } from "../../core/TextStyle";
import { Button, DeleteButton } from "../../core/Button";
import { Container } from "../../core/Container";
import { ContainerChildren } from "../../core/ContainerChildren";
import { Border } from "../../core/Border";
import { Input } from "../../core/Input";
import { Grid } from "../../core/Grid";
import { Link } from "react-router-dom";

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

  const handleTodoAdd = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()

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

  const remainingTask = todos.filter((todo) => !todo.completed).length;

  return (
    <Container>
      <ContainerChildren>
        <form onSubmit={handleTodoAdd}>
          <Grid $columns="2fr 1fr">
            <Input ref={inputRef} type="text" placeholder="Nueva Tarea"></Input>
            <div>
              <Button type="submit">Add</Button>
              <DeleteButton onClick={handleClearAll}>Delete</DeleteButton>
            </div>
          </Grid>
        </form>

        <TextStyle>
          {remainingTask === 0
            ? "Tareas completas"
            : `Te quedan ${remainingTask} tareas por
            terminar`}
        </TextStyle>

        <Border>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </Border>
      </ContainerChildren>
      <Link to="contact">Contact</Link>
    </Container>
  );
}
