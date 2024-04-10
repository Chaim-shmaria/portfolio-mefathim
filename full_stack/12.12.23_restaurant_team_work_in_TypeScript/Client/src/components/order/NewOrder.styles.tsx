import styled from '@emotion/styled';


export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 750px;
  min-width:1550px ;
  justify-content: space-around;
`;

export const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 55%;
  height: 100%;
`;

export const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  height: 100%;
`;

export const SideTextAndDishes = styled.div`
  display: flex;
  justify-content: space-between;
  height: 14%;
  width: 100%;
  align-items: center;
`
export const StyledSelect = styled.select`
  display: flex;
  direction: rtl; 
  width: 15%;
  height: 32%;
  border-radius: 5px; 
  font-weight: bold;
  background-color:#BAB9B9;
  font-size: 12px; 
  margin-left: 0.2%;
  border: none;
`;

export const RightSideText = styled.div`
  display: flex;
  direction: rtl;
  margin-right: 5%;
  font-size: 20px; 
  color: black;
  text-decoration: underline; 
  font-weight: bold; 
`;

export const Dishes = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow:auto;
  height: 82%;
  width: 92%;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.3);
  ::-webkit-scrollbar {
  display: none;
}
`;

export const DishCard = styled.div`
  width: 18%;
  height: 25%;
  margin-right: 1.5%;
  margin-top: 1.5%;
`;

export const ItemMenu = styled.div`
  position: relative;
  background-color: rgba(252, 214, 179, 0.3);
  display: flex;
  width: 50%;
  height: 55%;
  border-radius: 5%;
  box-shadow: 
    0px 6px 8px rgba(25, 50, 47, 0.08),
    0px 3px 4px rgba(18, 71, 52, 0.02), 
    0px 1px 16px rgba(18, 71, 52, 0.03);
  justify-content: center;
  `;

export const Icon = styled.img`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 7%;
  width: 60%;
  object-fit: contain;
  opacity: 0.3;
  `;


export const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: self-end;
  width: 93%; 
  height: 33%;
  padding: 1%;
  white-space: nowrap;
  border-radius: 15px;
  background-color: rgba(252, 214, 179, 0.7);
`;

export const OrderTitle = styled.div`
  width: 35%;
  height: 5%;
  margin-top: 2%;
  text-align: right;
  color: black;
  font-size: 20px; 
  font-weight: bold; 
  text-decoration: underline; 
`;

export const FixedTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  direction: rtl;
  font-size: 18px;
  font-weight: bold;
  margin-top: 5%;
`;

export const OrderLineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 65%;
  width: 100%;
  overflow:auto;
  margin-top: 1%;
  align-items: center;
  border-radius: 5px;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  ::-webkit-scrollbar {
  display: none;
}
`;

export const OrderLine = styled.div<{ index: number }>`
  display: flex;
  flex-direction: row-reverse;
  width:100%;
  height: 18%;
  font-size: 18px;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: #D3D3D3; 
  
  `;

export const OrderName = styled.div`
  width: 30%;
  padding: 3px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  direction: rtl;
`;

export const OrderAmount = styled.div`
  width: 12%;
  padding: 3px;
  text-align: center;
`;

export const OrderPricePerItem = styled.div`
  width: 12%;
  padding: 3px;
  text-align: center;
  direction: rtl;
`;

export const OrderTotal = styled.div`
  width: 11%;
  padding: 3px;
  text-align: center;
  direction: rtl;
`;

export const OrderRemarks = styled.div`
  width: 25%;
  padding: 3px;
  direction: rtl;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;


export const DeleteButton =styled.button`
  direction: ltr;
  width: 10%;
  margin-right: 1%;
  font-size: 20px;
  color:red;
  background: #D9D9D9;
  text-align: right;
  text-align: center;
  border-color: white;
  white-space: nowrap;
  border: none;
`;
export const totalDiv = styled.div`
  display: flex;
  height:10%;
  width: 100%;
  justify-content: flex-end;
  direction: rtl;
  margin-top: 3%;
  gap:1%;
  
`

export const TotalPayment = styled.div`
  color:#000000;
  font-weight: bold;
  font-size: 17px;
`;

export const RedText = styled.span`
  font-weight: bold;
  font-size: 17px;
  color: #FD0909;
`;

export const TwoBottons = styled.div`
  width: 80%;
  height: 8%;
`

export const CanceleButton = styled.button`
  width: 42%; 
  height: 62%;
  margin: 2%;
  color: white;
  border-radius: 5px; 
  background-color: #F86E65;
  border:none;
`

export const SendToTheKitchen = styled.button`
  width: 42%; 
  height: 62%;
  color: white;
  border-radius: 5px; 
  background-color: #93AF76;
  border:none;  
`
