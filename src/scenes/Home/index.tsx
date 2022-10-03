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
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { url } from "inspector";

const key = "todoApp.todos";

export type Item = { id: string; completed: boolean; task: string };

const schema = yup
  .object({
    taskName: yup.string().required("This is required"),
  })
  .required();

export function Home() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ taskName: string, todos: Item[] }>({
    defaultValues: {
      taskName: '',
      todos: [],
    },
    resolver: yupResolver(schema),
  });

  const { fields: todos, append, remove, replace } = useFieldArray({
    control,
    name: 'todos',
    keyName: 'key'
  })

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
      const todos = response.data.map((todo) => ({
        id: todo.id,
        completed: todo.completed,
        task: todo.title,
      }));

      append(todos);
    });
  }, []);

  const toggleTodo = (id: string) => {
    const newTodos = [...todos];

    const todo = newTodos.find((todo) => todo.id === id);

    if (todo) {
      todo.completed = !todo.completed;
    }

    replace(todo)
  };

  const handleTodoAdd = (values) => {
    const task = values.taskName;

    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: task,
        completed: false,
        userId: 1,
      })
      .then((response) => {
        append({
          id: response.data.id,
          task: response.data.title,
          completed: response.data.completed,
        })
      });
  };

  const handleClearAll = () => {
    let todosCopy = [...todos];
    const filteredTodos = todosCopy.filter((todo) => !todo.completed);

    filteredTodos.forEach((task) => {
      axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${task.id}`)
        .then(() => {
          const index = todos.findIndex(todo => todo.id === task.id)

          remove(index)
        })
    });
  };

  const remainingTask = todos.filter((todo) => !todo.completed).length;

  return (
    <Container>
      <ContainerChildren>
        <form onSubmit={handleSubmit(handleTodoAdd)}>
          <Grid $columns="2fr 1fr">
            <Input
              {...register("taskName")}
              type="text"
              placeholder="New task"
            />

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
