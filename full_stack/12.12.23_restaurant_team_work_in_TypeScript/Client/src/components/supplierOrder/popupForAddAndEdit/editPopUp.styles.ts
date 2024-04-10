import styled from "@emotion/styled";
import { MdOutlineEmail } from "react-icons/md";

export const RadioGroup = styled.div`
  display: flex;
  gap: 30px;
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

export const RadioLabel = styled.label`
  position: relative;
  cursor: pointer;
`;

export const RadioInput = styled.input`
  position: absolute;
  width: 15px;
  opacity: 1;
  cursor: pointer;
`;

export const StyledSuppliersInOrder = styled.p`
  /* Add any additional styling for suppliersInOrder text */
`;

export const TableHeader = styled.h3`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const suppliersInOrder = styled.div`
  /* margin-right: 50px; */
  width: 100%;
  display: flex;
  justify-content: right;
  /* align-items: center; */
  font-weight: bold;
`;

export const buttonAndText = styled.div`
  width: 95%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2.5vh;
  /* margin: 0 auto;  */
`;
export const BottunsAndMail = styled.div`
  /* background:blue; */
  width: 40%;
  height: 50px;
  max-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const status = styled.p`
  width: 10%;
  height: 10%;
`;

export const OrderButton = styled.button`
  width: 30%;
  height: 70%;
  radius: 10px;
  /* position: relative; */
  border: none;
  border-radius: 5px;

  radius: 5px;
  background: #6ab5fa;
  color: white;
  pointer: cursor;
  :active {
    background-color: #6ab5fa;
    box-shadow: 0 2px #666;
    transform: translateY(0.5px);
  }
`;

export const sumTotal = styled.div`
  font-weight: bold;
  width: 100px;
`;

export const mail = styled(MdOutlineEmail)`
  width: 100%;
  height: 100%;
  color: #6ab5fa;
  transition: color 0.3s ease;

  &:hover {
    cursor: pointer;
    color: black;
  }
`;
export const WarpEmail = styled.div`
  width: 20%;
  height: 70%;
`;
