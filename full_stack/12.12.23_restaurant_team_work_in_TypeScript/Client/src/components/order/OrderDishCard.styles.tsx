import styled from '@emotion/styled';


export const dishCard = styled.div `
    width: 100%;
    height: 75%;
    padding: 1%;
    border-radius: 10px;
    background-color: white;
`

export const orderDishCard = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 2%;
    width: 96%;
    height: 96%;
    border-radius: 10px;
    background-color: white;
`
export const orderLine = styled.div `
    padding: 5px;
    display: flex;
    justify-content: space-between;
    width: 97%;
    height: 8%;
    flex-direction: row-reverse;
    line-height: 10%;
    font-size: 30px;
`

export const addRm = styled.div `
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 35%;
    font-weight: 500;
`

export const addRmButton = styled.button `
    width:100%;
    height: 100%;
    border-radius: 50px;
    background-color: #D9D9D9;
    border: none;
    font-size: 30px;
    font-weight: 00;
`   
export const amount = styled.div `
    width: 100%;
    height: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    border-radius: 10px;
`

export const submitButton = styled.button `
    width: 20%;
    border-radius: 5px;
    border: none;
    background: #8ad77b;
    color: #FFF;
    :hover {background-color: #6eaf63
    }
`
export const notesField = styled.textarea `
    padding: 3%;
    width: 89%;
    height: 10%;
    border: none;
    display: flex;
    background-color: #D9D9D9;
    border-radius: 5px;
    text-align: right;
    margin-bottom: 1%;  
    
`