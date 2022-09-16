import styled from "styled-components";

export const Grid = styled.div<{
  $columns: string;
}>`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns};
  gap: 10px;
`;
