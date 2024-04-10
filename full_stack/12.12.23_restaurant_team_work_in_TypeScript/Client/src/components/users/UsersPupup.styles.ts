import styled from "@emotion/styled/macro";
import { SlClose } from "react-icons/sl";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";

export const Container = styled.div`
  position: relative;
  width: 350px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction:column;
  outline: 0;
  box-shadow: 0 3px 10px 0 gainsboro;
  align-items: center;
`;

export const Rows = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  direction: rtl;
`;
export const Row = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
`;
export const LabelRow = styled.label`
  min-width: 80px;
  text-align: right;
`;

export const Select = styled.select`
  width: 170px;
  height: 25px;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: rgba(169, 169, 169, 0.414);
  & hover {
    background-color: rgba(169, 169, 169, 0.614);
    cursor: pointer;
  }
`;
export const Input = styled.input`
  width: 170px;
  height: 25px;
  border-radius: 5px;
  border: none;
  padding: 3px;
  box-sizing: border-box;
  background-color: rgba(169, 169, 169, 0.414);
  & hover {
    background-color: rgba(169, 169, 169, 0.614);
    cursor: pointer;
  }
`;
export const Button = styled.button`
  width: 100px;
  color: white;
  background-color: rgba(30, 143, 255, 0.8);
  border-radius: 5px;
  border: none;
  padding: 5px;
  margin: 10px;
  & hover {
    background-color: rgba(50, 143, 255, 1);
    cursor: pointer;
  }
`;
export const UserImage = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
  border-radius: 50%;
  & hover {
    cursor: pointer;
    -webkit-filter: grayscale(100%);
  }
`;
export const ImageInput = styled.input`
  display: none;
`;
export const Icon = styled(SlClose)`
  align-self:flex-end;
  padding:10px;
  width: 30px;
  height: 30px;
  color: red;
  cursor: pointer;
`;

export const DeleteImage = styled.img`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

export const ShowIcon = styled(BiShow)`
  position: absolute;
  margin-right:73%;
  width: 6%;
  height: 6%;
  `;

export const HideIcon = styled(BiHide)`
  position: absolute;
  margin-right:73%;
  width: 6%;
  height: 6%;
  `;

  export const ChangePassword = styled(RiLockPasswordLine)`
  position:absolute;
  margin-right:30%;
  padding:5px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  &: hover {
    color:red;
`;

export const H4 = styled.h4<{color:string}>`
  color:${props=>props.color};
  position:absolute;
  margin-top:60%;
  margin-right:35%;
  `;

  export const H3 = styled.h3`
  position:absolute;
  `;

  export const Profile = styled.div`
`
