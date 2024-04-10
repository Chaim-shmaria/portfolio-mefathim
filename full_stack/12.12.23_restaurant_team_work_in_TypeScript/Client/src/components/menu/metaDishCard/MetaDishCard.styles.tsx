import styled from '@emotion/styled';

export const metaDishCard = styled.button<{ available: number } >`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: ${({ available }) => (available ? 'white' : '')};
`; 

export const WraperDishCardUnavailable= styled.div`
    width:115px;
    height: 125px;
`;

export const ImageWrap = styled.div`
    width:100%;
    height: 50%;
`;

export const WraperTextUnavailableProduct= styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(225, 225, 225, 0.7);
`;

export const TextUnavailableProduct = styled.div`
    color: #FD0909;
    font-size: 17px;
    font-weight: bold;
    margin-top: 38%;  
`;

export const InformationWrap = styled.div`
    width:100%;
    height: 50%;
`;
export const DishImage = styled.img`
    width: 99%;
    height: 99%;
    border-radius: 10px;
    object-fit: contain;
`;

export const DishName = styled.div`
    text-align: right;
    height: 25%;
    width: 100%;
    font-size: 15px;
    font-weight: bold;
    overflow: hidden;
`;

export const DishCategory = styled.div`
    text-align: right;
    font-size: 11px;
    font-weight: bold; 
    height: 50%;
`;

export const DishPrice = styled.div`
    font-size: 11px;
    direction: rtl;
    text-align: center;
    font-weight: bold; 
    height: 25%;
`;

