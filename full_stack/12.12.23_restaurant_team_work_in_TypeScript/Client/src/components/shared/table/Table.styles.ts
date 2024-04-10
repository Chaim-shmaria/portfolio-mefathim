import styled from "@emotion/styled/macro";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import { MdOutlineToggleOff } from "react-icons/md";
import { IoRadioButtonOn } from "react-icons/io5";

export const Page = styled.div`
  width: 85vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* gap: 3%; */
`;

export const PageHeader = styled.label`
  width: 85%;
  height: 10%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  text-align: center;
`;

export const RightTop = styled.label`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  align-items: center;
`;

export const PageMode = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 3vh;
  font-weight: 700;
  justify-content: center;
`;

export const AddButton = styled(CgAddR)`
  width: 15%;
  height: 100%;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;

export const LeftTop = styled.label`
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 5%;
`;

export const DisplayStatus = styled.label`
  width: 35%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const DisplayIcon = styled(MdOutlineToggleOff)<{
  active: boolean | undefined;
}>`
  width: 100%;
  height: 60%;
  transform: rotate(${(props) => (props.active ? 180 : 0)}deg);
  &:hover {
    cursor: pointer;
  }
`;

export const DisplayText = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  font-size: 1.5vh;
`;

export const Search = styled.div`
  width: 50%;
  height: 100%;
  margin-top: 16%;
  z-index:2;
`;

export const TableContainer = styled.div`
  width: 85%;
  height: 70%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 3%;
  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background: #A4817C;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #E4988C;
  }
`;

export const Arrow = styled.div`
  margin-left: 3px;
  cursor: pointer;
  visibility: hidden;
  `;

export const TabelHeader = styled.div`
  width: 85%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  font-size: 2.5vh;
  &:hover{
    ${Arrow}{
      visibility: visible;

    }
  }
`;

export const TabelRow = styled.div`
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
    outline: 2px #d1a28c solid;
    outline-offset: -1px;
    .div.button {
      visibility: visible;
    }
    /* .TabelCell .DeleteButton {
      visibility: visible;
    } */
  }
`;

export const TabelCell = styled.div<{color?:string, width: number }>`
  height: 100%;
  display: flex;
  flex: ${(props) => props.width};
  color:${(props) => props.color};
  align-items: center;
  justify-content: center;
  &:hover {
    .div {
      visibility: visible;
      /* { */
      /* visibility: visible; */
    }
  }
`;

export const EditButton = styled(CiEdit)`
  width: 25%;
  height: 50%;
  &:hover {
    cursor: pointer;
    color: green;
  }
`;

export const DeleteButton = styled(RiDeleteBin6Line)`
  width: 25%;
  height: 50%;
  /* visibility: hidden; */
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
