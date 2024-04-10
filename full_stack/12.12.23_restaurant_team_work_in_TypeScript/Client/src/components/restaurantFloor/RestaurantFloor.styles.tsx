import { ITable } from '@/dataTypes/table';
import styled from '@emotion/styled';


export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(60, 1fr);
  grid-template-rows: repeat(40, 1fr);
  grid-gap: 1px;
  height: 100%;
  width: 100%;
  min-width: 1300px;
  min-height: 600px;
`;

export const RestaurantObject = styled.div<{data: ITable }>`
  background-color: #9C9E9B;
  grid-column-start: ${(props) => props.data.x0};
  grid-row-start: ${(props) => props.data.y0};
  grid-column-end: ${(props) => props.data.x1};
  grid-row-end: ${(props) => props.data.y1};
  border: 5px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

export const RestaurantTable = styled.div<{data: ITable }>`
  grid-column-start: ${(props) => props.data.x0};
  grid-row-start: ${(props) => props.data.y0};
  grid-column-end: ${(props) => props.data.x1};
  grid-row-end: ${(props) => props.data.y1};
  text-align: center;
`;

export const ImgRelative = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  `;


export const ImgRectangleTable  = styled.img`
  width: 100%;
  height: 130%;
  `;

export const WaiterAndDinersRectangleTable = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  color: black;
  `;

export const TextRectangleTable = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: absolute;  
  width: 66%;
  height: 55%;
  top: 34%;
  left: 14%;
  border: 4px solid black;
  background-color: #BAB9B9;
  &:hover {
    background-color: #8f8c8c;

  }
  `;

export const TextRectangleTableOrder = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 66%;
  height: 55%;
  top: 30%;
  left: 14%;
  border: 4px solid black;
  background-color: #FDECAF;
  &:hover {
    background-color:#fcde74;
  }
  `;
export const ImgCircleTable = styled.img`
  width: 100%;
  height: 120%;
  `;

export const TextCircleTable = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  width: 55%;
  height: 60%;
  top: 20%;
  left: 22%;
  border-radius:60px ;
  border: 2px solid black;
  background-color: #BAB9B9;
  margin-top: 3%;
  &:hover {
    background-color: #8f8c8c;

  }
  `;

export const TextCircleTableOrder = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  width: 55%;
  height: 60%;
  top: 20%;
  left: 22%;
  border: 2px solid black;
  border-radius:60px ;
  background-color: #FDECAF;
  &:hover {
    background-color:#fcde74;
  }
  `;
  

export const WaiterAndDinersCircleTable = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  color: black;
  `;

export const TableNumber = styled.div`
  color: black;
  font-size: 2rem;
  `;

export const Diners = styled.div`
  color: black;
  `;

export const WaiterTable = styled.div`
  color: black;
  `;


export const AmountPay = styled.div`
  color: red;
  `;

export const unseatEmptyTable = styled.button`
  background-color: #fcde74;
  color: red;
  border: none;
  :hover {
    border: 1px solid red;
  }
  `;
