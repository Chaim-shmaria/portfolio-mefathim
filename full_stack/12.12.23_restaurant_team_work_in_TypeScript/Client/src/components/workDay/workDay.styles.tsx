import styled from '@emotion/styled';


export const takeAwayButton = styled.button`
  position: absolute;
  width: 120px;
  height: 120px;
  top: 8%;
  right: 1%;
  border-radius: 50%;
  background-color:#F6C99E ;
  border: 5px solid #F4E5D0;
  font-size: 26px;
  font-weight: 600;
  &:hover {
    background-color: #D3BF9E;
  }
`

export const confirmUnsetTable = styled.div`
    background-color: #FDECAF;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    width: 400px;
    height: 70px;
    border:2px solid black;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    text-align: center;
    color: red;
    font-size: large;
    font-weight: 700;
    align-items: center;
`;

export const confirm = styled.button`
  width: 50%;
  background-color: #fcde74;
  &:hover{
    background-color: #d4be34;
  }
`;