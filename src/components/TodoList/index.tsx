import React from "react";
import { Item } from "../../scenes/Home";
import { TodoItem } from "../TodoItem";

type Props = {
  todos: Item[];
  toggleTodo: (id: string) => void;
};

export function TodoList({ todos, toggleTodo }: Props) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
}
