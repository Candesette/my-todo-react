import styled from "styled-components";

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  visibility: hidden;
  position: absolute;
  right: 0;
  width: 0px;
  height: 0px;
  border-radius: 15px;
`;

export const Ielement = styled.i`
  background: #d4d1d1;
  border: 2px solid rgba(0, 0, 0, 0.2);
  position: absolute;
  left: -45px;
  top: 0;
  width: 47px;
  height: 25px;
  border-radius: 15px;
  transition: all 250ms ease;

  &:before {
    content: "";
    width: 25px;
    height: 25px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    z-index: 1;
    left: 0px;
    top: 0px;
    transition: transform 200ms ease;
  }
  ${Checkbox}:checked + & {
    background-color: ${({ theme }) => theme.buttonColor};
  }

  ${Checkbox}:checked + &:before {
    transform: translateX(1.2em);
  }
  ${Checkbox}:focus + & {
    box-shadow: 0 0 0.1em #2196f3;
  }

  ${Checkbox}:disabled + & {
    pointer-events: none;
    background: #e6e6e6;
  }
`;
