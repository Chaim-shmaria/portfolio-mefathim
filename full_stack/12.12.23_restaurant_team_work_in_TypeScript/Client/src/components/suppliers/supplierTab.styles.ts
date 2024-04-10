import styled from "@emotion/styled";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import { TfiCheck } from "react-icons/tfi";
export const Screen = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const WarpSupplierDetails = styled.div`
  height: 15%;
  width: 70%;
`;
export const SupplierDetails = styled.div<{ heder?: boolean }>`
  background: ${(props) => (props.heder ? "white" : "none")};
  height: 40%;
  width: 100%;

  display: flex;
  direction: rtl;
  justify-content: space-around;
  gap: 3%;
  border-radius: 7px;
  font-size: 2vh;
  &:hover {
    outline: ${(props) => (props.heder ? '2px #d1a28c solid' : "none")};
    outline-offset: -1px;
  }
`;
export const TabHeader = styled.div`
  display: flex;
  direction: rtl;
  height: 6.5%;
  width: 70%;
  gap: 0.5%;
`;
export const TabButton = styled.button<{ current: boolean }>`
  height: 100%;
  width: 10%;
  background: #ffffff;
  border: none;
  border-radius: 10px 10px 0% 0%;
  font-weight: bold;
  font-size: 1rem;
  ${(props) =>
    props.current && {
      outline: "none",
      background: "#FFEFCE",
      border: "1px solid",
      borderWidth: "1px 1px 0px 1px",
    }}
`;

export const SupplierTabs = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffefce;
  width: 70%;
  height: 70%;
  border-radius: 7px;

`;

export const HederTable = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  direction: rtl;
  justify-content: space-around;
`;

export const AutoComplete = styled.div`
  margin-top: 2%;
  margin-left: 2%;
  z-index: 3;
  height: 8%;
  width: 25%;
  position: relative;
`;

export const SupplierProducts = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 1%;
`;

export const TabelHeader = styled.div`
  width: 85%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  font-size: 2.5vh;
`;

export const TabelRow = styled.div`
  width: 100%;
  height: 10%;
  min-height: 8%;
  background-color: white;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 3%;
  border-radius: 7px;
  opacity: 80%;
  &:hover {
    outline: 2px #d1a28c solid;
    outline-offset: -1px;
    .div.button {
      visibility: visible;
    }
  }
`;

export const TabelCell = styled.div<{  width: number }>`
  height: 100%;
  display: flex;
  flex: ${(props) => props.width};
  align-items: center;
  justify-content: center;
  font-size: 2.1vh;
  font-weight: bold;

  &:hover {
    .div {
      visibility: visible;
    }
  }
`;

export const InputPrice = styled.input`
text-align: center;
  width: 50%;
  border-radius: 7px;
  font-size: 2.4vh;
  font-weight: bold;
  margin-left:20%;
  border: 1px solid #E4D2BA;
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
  &:hover {
    cursor: pointer;
    color: red;
  }
`;
export const Submit = styled(TfiCheck)`
  width: 25%;
  height: 70%;
  color: green;
  &:hover {
    cursor: pointer;
  }
`;
export const NotComplete=styled.div`
display:flex;
font-size: 3em;
justify-content:center;
align-items:center;
height:100%;
width:100%;
color:gray;
`