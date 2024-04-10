import styled from '@emotion/styled';

export const fullDishCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 2.5%;
    width: 95%;
    height: 95%;
    border-radius: 10px;
`

export const dishImg = styled.img `
    width: 100%;
    height: 60%;
    border-radius: 10px;
    object-fit: contain;
`

export const titleLine = styled.div `
    width: 100%;
    height: 17%;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    
`

export const dishName =styled.span `
    font-weight: 700;
    font-size: 140%;
    direction:rtl;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const dishCategory = styled.span `
    font-weight: 700;
    font-size: 100%;
    text-align: right;
`

export const dishDescription = styled.h1 `
    margin: 0%;
    width: 95%;
    height: 13%;
    font-weight: 700;
    font-size: 70%;
    text-align-last: right;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: rtl;
`

export const descriptionWord = styled.h1 `
    font-size: 120%;
    text-decoration: underline;
    margin: 0%;
`

export const bottomLine = styled.div `
    height: 5%;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
`

export const pricePos = styled.div `
    width: 19%;
    display: flex;
    font-weight: bold;
    justify-content: space-between;
    margin-right: auto;
`