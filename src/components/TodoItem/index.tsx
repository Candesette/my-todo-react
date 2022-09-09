import React from "react";
import { Checkbox } from "../../core/Checkbox";
import { ItemContainer } from "../../core/ItemContainer";
import { Item } from "../../scenes/Home";

type Props = {
  todo: Item;
  toggleTodo: (id: string) => void;
};

export function TodoItem({ todo, toggleTodo }: Props) {
  const { id, task, completed } = todo;

  return (
    <ItemContainer>
      <Checkbox checked={completed} onChange={() => toggleTodo(id)} />
      {task}
    </ItemContainer>
  );
}
