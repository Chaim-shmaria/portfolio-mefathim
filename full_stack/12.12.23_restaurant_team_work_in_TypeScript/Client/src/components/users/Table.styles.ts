import styled from "@emotion/styled";

export const UsersPage = styled.div`
  width: 100%;
  height: 100%;
`;
export const FirstRow = styled.div`
  display: grid;
  grid-template-columns: 5% 15% 15% 20% 20% 10% 15%;
`;

export const TableContainer = styled.div`
  position: fixed;
  display: grid;
  row-gap: 10px;
  align-items: center;
  top: 50%;
  left: 50%;
  height: 50%;
  width: 90%;
  transform: translate(-50%, -50%);
`;

export const TableRow = styled.div`
  height: 65px;
  border-radius: 5px;
  background-color: yellow;
  display: grid;
  grid-template-columns: 3% 2% 15% 15% 20% 20% 10% 15%;
  column-gap: 20px;
`;

export const RowsWord = styled.div`
  margin-left: 90px;
`;
export const Pupup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%);
  z-index: 10;
  background-color: white;
`;
