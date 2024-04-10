import styled from "@emotion/styled";
import { IoMdSearch } from "react-icons/io";

export const AutoComplete = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1.7px solid #0d1c30;
  border-radius: 7px;
  max-height: 300%;
  background-color: #f7f7f7;
`;

export const Input = styled.input`
  height: 3vh;
  display:flex;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  padding-inline: 8px;
direction: rtl;

  &:focus {
    outline: none;
  }
`;
export const Suggestions = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  font-size: 14px;
  overflow: hidden;
`;
export const LineName = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 5%;
  cursor: pointer;
  &:hover {
    background: #d4d4d4;
  }
  direction: RTL;
`;
export const IconSearch = styled(IoMdSearch)`
  position: absolute;
  width: 10%;
  height: 85%;
  left:0%;
`;

