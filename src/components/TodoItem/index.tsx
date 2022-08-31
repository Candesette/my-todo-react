import React from "react";
import { Item } from "../../scenes/Home";

type Props = {
  todo: Item;
  toggleTodo: (id: string) => void;
};

export function TodoItem({ todo, toggleTodo }: Props) {
  const { id, task, completed } = todo;

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id)}
      />
      {task}
    </li>
  );
}
