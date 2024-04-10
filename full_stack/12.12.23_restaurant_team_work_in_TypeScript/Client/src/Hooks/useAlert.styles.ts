import styled from "@emotion/styled";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";



export const Wrapper = styled.div`
  position: relative;
  background-color:white;
  background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url("/logo.png");
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.7);
  text-align: center;
  size: fit-content;
  padding: 10px
`;

export const label = styled.div`
  display: flex;
  justify-content: center;
  size: fit-content;
  border-radius: 10px;
  padding: 10% 0 0 0;
`;

export const Tytle = styled.h3`

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
  width: 100px;
  color: white;  background-color: #93af40;
  border-radius: 5px;
  border: none;
  padding: 5px;
  margin: 10px;
  justify-content: center;
  cursor: pointer;
  &: hover {
    background-color: #93af76;
  }

`;
export const CancelButton = styled.button`
  width: 100px;
  color: white;  background-color: #f86e40;
;
  border-radius: 5px;
  border: none;
  padding: 5px;
  margin: 10px;
  justify-content: center;
  cursor: pointer;
  &: hover {
    background-color: #f86e65;
;
  }
`;
export const ButtonsLabel = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 10%;
  margin-left:10%
`;
export const ButtonLabel = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin-top: 10%;
  margin-left:10%
`;
export const Alarm = styled.div`
  color: red;
  font-size:20px;
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