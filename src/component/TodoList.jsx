import React from "react";
import { TodoItem } from "./TodoItem";

export function TodoList({ todos, toggleTodo }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
}
