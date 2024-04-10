import styled from '@emotion/styled';


export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 28%;
    height: 88%;
    background-color:  white;
    padding: 1%;
    
`;
export const title = styled.div`
    height: 10%;
    width: 100%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    font-weight: bold;
`;

export const information = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    justify-content: center;
`;

export const DateAndTimeBox = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const DateAndTime = styled.div`
    width: 100%;
    height: 35%; 
    font-weight: bold;
`;

export const TableOrderId = styled.div`
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: bold;
`;

export const TableLine = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    width:100%;
    height: 7%;
    font-size: 1.4rem;
    border-radius: 3%;
    margin-bottom: 1%;
    font-weight: bold;
    background-color: #000000;
    color: white;
  `;

export const OrderDetailsBox = styled.div`
    display: flex;
    overflow:auto;
    flex-direction: column;
    height: 73%;
    width: 100%;
    gap: 1%;
    ::-webkit-scrollbar {
    display: none;
}
`;

export const OrderLine = styled.div<{ index: number }>`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    width:97%;
    height: fit-content;
    font-size: 1.3rem;
    border-radius: 5px;
    border: solid black;
    padding: 1%;
    background-color: ${(props) => (props.index % 2 === 0 ? '#ffffff' : "#dedddd")};

  `;

export const OrderDetails = styled.div`
    width: 33%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;
