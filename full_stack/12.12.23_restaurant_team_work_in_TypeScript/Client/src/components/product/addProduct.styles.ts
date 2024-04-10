import styled from "@emotion/styled";
import { RiDeleteBin6Line } from "react-icons/ri";

export const Wrapper = styled.form`
  width: 40%;
  height: 80%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 4px 0px #00000040;
  border-radius: 10px;
  position: relative;
`;
export const Header = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

export const Data = styled.label`
  width: 85%;
  height: 80%;
  display: flex;
  align-items: center;
`;

export const DataLeft = styled.label`
  width: 55%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DataRight = styled.label`
  width: 45%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Product = styled.div`
  width: 100%;
  height: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Suppliers = styled.div`
  width: 83%;
  height: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4%;
`;

export const SelectedSuppliers = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #a4817c;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #e4988c;
  }
`;

export const imageText = styled.div`
  width: 40%;
  height: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align:center;
  color:gray;
`;
export const Picture = styled.img`
  width: 60%;
  height: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
`;

export const Amount = styled.div`
  width: 100%;
  height: 38%;
  display: flex;
  flex-direction: column;
  gap:4%;
  justify-content: center;
  align-items: space-between;
`;

export const Row = styled.div<{ height: number }>`
  width: 100%;
  min-height: ${(props) => props.height}%;
  display: flex;
  gap: 2%;
  align-items: center;
`;
export const Row2 = styled.div<{ width?: number }>`
  width: ${(props) => (props.width ? props.width : 90)}%;
  height: 20%;
  display: flex;
  gap: 6%;
  align-items: center;
  justify-content: space-between;
`;

export const Field = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 1em;

`;

export const Input = styled.input<{ width: number }>`
  width: ${(props) => props.width}%;
  height: 100%;
  background: #d9d9d9bd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 7px;
  direction: rtl;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    ${(props) =>
      props.width > 60 && {
        "-webkit-appearance": "none",
        margin: 0,
      }}
  }
`;

export const Option = styled.select<{ width: number }>`
  width: ${(props) => props.width}%;
  height: 100%;
  background: #d9d9d9bd;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 6px;
  direction: rtl;
`;

export const Submit = styled.button`
  width: 23%;
  height: 6.8%;
  color: white;
  background: #6ab5fa;
  border: none;
  border-radius: 7px;
  font-size: 1em;

  &:hover {
    cursor: pointer;
  }
`;

export const Cancel = styled.button`
  height: 25px;
  position: absolute;
  color: red;
  background: none;
  border-style: solid;
  border-color: red;
  border-radius: 50%;
  left: 94%;
  font-weight: bold;
  font-size: 1em;
  &:hover {
    cursor: pointer;
  }
`;

export const DeleteButton = styled(RiDeleteBin6Line)`
  width: 100%;
  height: 100%;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;