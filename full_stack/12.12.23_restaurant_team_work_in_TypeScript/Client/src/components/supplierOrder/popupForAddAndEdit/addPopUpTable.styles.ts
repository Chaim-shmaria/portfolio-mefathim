import styled from "@emotion/styled";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import { MdOutlineToggleOff } from "react-icons/md";
import { IoRadioButtonOn } from "react-icons/io5";
import { SlClose } from "react-icons/sl";

export const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3%;
`;

export const PageMode = styled.div`
  width: 100%;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const Search = styled.div`
  width: 30%;
  position: relative;
  height: 2rem;
  margin-left: 20px;
`;

export const TableContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  gap: 4%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #a4817c;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #e4988c;
  }
`;

export const TabelHeader = styled.div`
  width: 100%;
  height: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  font-size: 2.2vh;
`;

export const TableHeader = styled.h3`
  margin-right: 30%;
`;

export const TabelRow = styled.div`
  width: 100%;
  height: 25%;
  min-height: 20%;
  background: #d9d9d9bd;

  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 3%;
  border-radius: 7px;
  font-size: 2.2vh;

  &:hover {
    outline: 2px #d1a28c solid;
    outline-offset: -1px;
    .div.button {
      visibility: visible;
    }
  }
`;

export const TabelCell = styled.div<{ width: number }>`
  height: 50%;
  display: flex;
  flex: ${(props) => props.width};
  align-items: center;
  justify-content: center;
`;

export const EditButton = styled(CiEdit)`
  width: 25%;
  height: 100%;
  &:hover {
    cursor: pointer;
    color: green;
  }
`;
export const succes = styled.div`
  width: 50%;
  height: 50%;
  background-color: red;
  z-index: 2;
`;

export const DeleteButton = styled(RiDeleteBin6Line)`
  width: 25%;
  height: 100%;
  &:hover {
    cursor: pointer;
    color: red;
  }
`;

export const NotActiveRow = styled.div`
  width: 100%;
  height: 10%;
  min-height: 8%;
  background-color: white;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 3%;
  border-radius: 7px;
  font-size: 2vh;
  opacity: 80%;
  &:hover {
    outline: 2px gray solid;
    outline-offset: -1px;
  }
  filter: brightness(80%);
`;

export const NotActiveCell = styled.div<{ width: number }>`
  height: 100%;
  display: flex;
  flex: ${(props) => props.width};
  align-items: center;
  justify-content: center;
  color: #a9a9a9;
`;

export const MakeActiveButton = styled(IoRadioButtonOn)`
  width: 40%;
  height: 50%;
  &:hover {
    cursor: pointer;
    color: green;
  }
`;

export const amountCell = styled.input`
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    opacity: 1;
  }

  border: none;
  background-color: transparent;
  width: 60%;
  padding: 0;
  font-size: inherit;
  color: inherit;
  cursor:pointer;
`;

export const SelectCell = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Select = styled.select`
  border: none;
  background-color: transparent;
  width: 100%;
  padding: 0;
  font-size: inherit;
  cursor: pointer;
  color: inherit;
`;

export const pop = styled.div`
  background: white;
  width: 38%;
  height: 28%;
  display: flex;
  flex-direction: column;

  border-radius: 5px;
  justify-content: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px;
`;
export const Popup = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const message = styled.p`
  background: white;
  text-align: center;
  margin: 0;
  font-size: 30px;
  font-weight: bold;
  &::before {
    color: #93af76;
    display: block;
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

export const CloseIcon = styled(SlClose)`
  float: right;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 22px;
  height: 22px;
  color: red;
  z-index: 3;
  &:hover {
    cursor: pointer;
    font-weight: bold;
    width: 23px;
    height: 23px;
    transition: width 0.2s, height 0.2s;
  }
`;
