import styled from "@emotion/styled";
import AddOrder from "./addPopUp";

export const pop = styled.div`
  background: white;
  width: 60%;
  height: 60%;
  display: flex;
  flex-direction: column;

  border-radius: 5px;

  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
`;

export const buttonAndText = styled.div`
  width: 95%;
  height: 15%;
  display: flex;
  justify-content: center;
  justify-content: space-between;
  align-items: flex-start; Align everything to the top

  text-align: center;
  align-items: center;
  font-size: 2.5vh;
  margin: 0 auto; 

`;

export const OrderButton = styled.button`
  width: 10%;
  height: 70%;
  radius: 10px;
  position: relative;
  border: none;
  border-radius: 5px;




  radius: 5px;
  background: #6ab5fa;
  color: white;
  margin-left: 30px;
  pointer: cursor;
  outline: none;
  box-shadow: 0 2px #999;

  

:active {
  background-color: #6ab5fa;
  box-shadow: 0 2px #666;
  transform: translateY(0.5px);
}
  
`;

export const suppliersInOrder = styled.p`
  margin-right: 50px;
  font-weight: bold;
`;

export const sumTotal = styled.p`
  margin-right: 150px;
  font-weight: bold;
`;

export const minError = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
  color: red;
  margin: 0;
`;
