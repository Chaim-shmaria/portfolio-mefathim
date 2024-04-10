import styled from "@emotion/styled";
import { IoMdSearch } from "react-icons/io";

export const AutoComplete = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1.7px solid #0d1c30;
  border-radius: 7px;
  max-height: 180%;
  background-color:#f7f7f7;
  &:focus {
  };
`;

export const Input = styled.input`
position:relative;
  height: 3vh;
  border: none;
  border-radius: 7px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
  direction: RTL; 


::-webkit-search-cancel-button{
	/* color: green;
	background-color: red;
	outline: 1px solid red;
	border: 1px solid red;
	-webkit-appearance: none;	
	height: 10px;
	width: 10px;
	position: absolute;
	left :1%;
	border-radius: 50%; */
display:none;
}
`;

export const Suggestions = styled.div`
display:flex;
flex-direction:column;
border-radius:7px;
overflow:hidden;
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
  margin-left: 0.2%;
`;
