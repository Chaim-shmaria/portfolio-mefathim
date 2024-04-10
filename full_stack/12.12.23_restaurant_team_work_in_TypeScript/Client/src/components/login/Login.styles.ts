import styled from "@emotion/styled";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";



export const Wrapper = styled.div`
  position: relative;
  background-color: white;
  width:250px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.7);
  text-align: center;
  padding: 1%;
  /* size: fit-content; */
`;

export const label = styled.div`
  display: flex;
  justify-content: center;
  padding: 1% 0 0 0;
`;

export const Tytle = styled.text`
  color: #000000;
  font-size: 90%;
  font-weight: 700;
`;

export const Form = styled.form`
  padding: 1% 0 0 0;
`;

export const Input = styled.input`
  font-weight: 700;
  width: 80%;
  color: #344054;
  background: #d9d9d9a6;
  border-radius: 5px;
  border: none;
  padding: 3%;
  margin: 1.5% 0 1.5% 0;
  text-align: right;
  &: placeholder {
    color: #9c9e9b;
    background: #d9d9d9a6;
  }
`;

export const EnterButton = styled.button`
  font-size: 60%;
  background-color: #93af76;
  color: white;
  size:fit-content;
  border: 0;
  border-radius: 3px;
  justify-content: center;
  padding: 3% 13% 3% 13%;

`;

export const CancelButton = styled.button`
  font-size: 60%;
  background-color: #f86e65;
  color: white;
size:fit-content;
  border: 0;
  border-radius: 3px;
  padding: 3% 13% 3% 13%;
`;
export const ButtonsLabel = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-left: 10%;
  padding: 4% 0 0 0;
`;

export const Alarm = styled.text`
  color: red;
  font-size: 50%;
`;

export const ShowIcon = styled(BiShow)`
  position: absolute;
  margin-top:3%;
  margin-right: 65%;
  width: 15%;
  height: 15%;
  `;

export const HideIcon = styled(BiHide)`
 position: absolute;
  margin-top:3%;
  margin-right: 65%;
  width: 15%;
  height: 15%;
  `;