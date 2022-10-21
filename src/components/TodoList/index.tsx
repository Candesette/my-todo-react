import React from "react";
import { FieldArrayWithId } from "react-hook-form";
import { Item } from "../../scenes/Home";
import { TodoItem } from "../TodoItem";

type Props = {
  todos: FieldArrayWithId<
    {
      taskName: string;
      todos: Item[];
    },
    "todos",
    "key"
  >[];
  toggleTodo: (id: string) => void;
};

export function TodoList({ todos, toggleTodo }: Props) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem key={todo.key} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
}
