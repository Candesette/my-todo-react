import styled from "styled-components";

export const Button = styled.button`
  background-color: lightblue;
  border-radius: 4px;
  border: 1px solid lightblue;
  cursor: pointer;
  padding: 10px;
  & + & {
    margin-left: 5px;
  }
`;
export const DeleteButton = styled(Button)``;
