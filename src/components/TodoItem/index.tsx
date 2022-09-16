import React from "react";
import { Checkbox } from "../../core/Checkbox";
import { ItemContainer } from "../../core/ItemContainer";
import { Item } from "../../scenes/Home";
import { Label } from "../../core/Label";
import { Ielement } from "../../core/Checkbox";
import { TextContainer } from "./styles";

type Props = {
  todo: Item;
  toggleTodo: (id: string) => void;
};

export function TodoItem({ todo, toggleTodo }: Props) {
  const { id, task, completed } = todo;

  return (
    <ItemContainer>
      <Label>
        <Checkbox checked={completed} onChange={() => toggleTodo(id)} />
        <Ielement />
      </Label>
      <TextContainer>{task}</TextContainer>
    </ItemContainer>
  );
}
