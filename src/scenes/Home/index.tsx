import React, { useState, useEffect } from "react";
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
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const key = "todoApp.todos";

export type Item = { id: string; completed: boolean; task: string };

const schema = yup
  .object({
    taskName: yup.string().required("This is required"),
  })
  .required();

export function Home() {
  const [todos, setTodos] = useState<Item[]>([]);

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

  const handleTodoAdd = (values) => {
    const task = values.taskName;

    setTodos((prevTodos) => {
      const todosToAppend = [
        ...prevTodos,
        { id: uuidv4(), task, completed: false },
      ];

      localStorage.setItem(key, JSON.stringify(todosToAppend));

      return todosToAppend;
    });
  };

  const handleClearAll = () => {
    let todosCopy = [...todos];
    const filteredTodos = todosCopy.filter((todo) => !todo.completed);

    setTodos(filteredTodos);

    localStorage.setItem(key, JSON.stringify(filteredTodos));
  };

  const remainingTask = todos.filter((todo) => !todo.completed).length;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taskName: "",
    },
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <ContainerChildren>
        <form onSubmit={handleSubmit(handleTodoAdd)}>
          <Grid $columns="2fr 1fr">
            <Input
              {...register("taskName")}
              type="text"
              placeholder="New task"
            ></Input>

            <div>
              <Button type="submit">Add</Button>
              <DeleteButton onClick={handleClearAll}>Delete</DeleteButton>
            </div>
            <p>{errors.taskName?.message}</p>
          </Grid>
        </form>

        <TextStyle>
          {remainingTask === 0
            ? "No pending tasks"
            : ` ${remainingTask} 
            pending tasks`}
        </TextStyle>

        <Border>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </Border>
      </ContainerChildren>
      <Link to="contact">Contact</Link>
    </Container>
  );
}
