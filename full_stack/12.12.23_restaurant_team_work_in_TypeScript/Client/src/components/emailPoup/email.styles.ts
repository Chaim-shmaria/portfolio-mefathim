import styled from "@emotion/styled";
import { SlClose } from "react-icons/sl";
import { FaRegPlusSquare } from "react-icons/fa";

export const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 280px;
  border-radius: 5px;
  margin: auto;
  outline: 0;
  box-shadow: 0 3px 10px 0 gainsboro;
  z-index: 23;
`;
export const Rows = styled.div`
  display: flex;
  flex-direction: column;
  direction: rtl;
`;
export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

export const LabelRow = styled.label``;
export const H1 = styled.h3`
  padding: 2px;
`;

export const Input = styled.input`
  width: 100%;
  height: 25px;
  border-radius: 5px;
  border: none;
  /* padding: 1px; */
  box-sizing: border-box;
  background-color: rgba(169, 169, 169, 0.414);
  &:hover {
    background-color: rgba(169, 169, 169, 0.614);
    cursor: text;
  }
`;
export const Input1 = styled.textarea<{ height: string }>`
  width: 260px;
  height: ${(props) => props.height};
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 5px;
  border: none;
  padding: 1px;
  box-sizing: border-box;
  background-color: rgba(169, 169, 169, 0.414);

  &:hover {
    background-color: rgba(169, 169, 169, 0.614);
    cursor: text;
  }
`;

export const Button = styled.button`
  width: 100px;
  color: white;
  align-self: center;
  background-color: rgba(30, 143, 255, 0.8);
  border-radius: 5px;
  border: none;
  padding: 5px;
  margin: 10px;
  &:hover {
    background-color: rgba(50, 143, 255, 1);
    cursor: pointer;
  }
`;

export const Icon = styled(SlClose)`
  position: absolute;
  margin-left: 140px;
  width: 30px;
  height: 30px;
  color: red;
  &:hover {
    cursor: pointer;
    font-weight: bold;
    width: 32px;
    height: 32px;
    transition: width 0.2s, height 0.2s;
  }
`;
export const FileInput = styled.input`
  display: none;
`;

export const AddIcon = styled(FaRegPlusSquare)`
  position: absolute;
  width: 20px;
  height: 20px;
  &:hover {
    cursor: pointer;
    font-weight: bold;
    width: 21px;
    height: 21px;
    transition: width 0.2s, height 0.2s;
  }
`;
export const Message = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: bold;
  margin-bottom: 10px;
`;
