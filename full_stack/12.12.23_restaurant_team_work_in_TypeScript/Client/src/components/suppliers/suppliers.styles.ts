import styled from '@emotion/styled'
import { SlClose } from "react-icons/sl";

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:white;
    width: 260px;
    border-radius: 5px;
    margin: auto;
    outline: 0;
    box-shadow:0 3px 10px 0 gainsboro ;
`
export const Rows = styled.div`
    display: flex;
    flex-direction: column;
    direction: rtl;
`
export const Row = styled.div`
    display: flex;
    justify-content:space-between;
    margin-bottom: 10px; 
`
export const LabelRow = styled.label`
    margin-right: 1px;
    min-width: 80px;
    text-align:  right;
`
export const H3 = styled.h3`
    padding: 2px;
`

export const Input =styled.input`
    width: 120px;
    height: 25px;
    border-radius:5px ;
    border: none;
    padding: 3px;
	  box-sizing: border-box;
    background-color: rgba(169, 169, 169, 0.414);
    &:hover {
        background-color: rgba(169, 169, 169, 0.614);
        cursor: pointer;
    }
`
export const Button = styled.button`
    width: 100px;
    color: white;
    align-self:center;
    background-color:rgba(30, 143, 255, 0.800);
    border-radius: 5px;
    border: none;
    padding: 5px;
    margin: 10px; 
    &:hover {
        background-color:rgba(50, 143, 255, 1);
        cursor: pointer;
    }
`

export const Icon = styled(SlClose)`
    align-self:flex-end;
    float: right;
    margin: 10px;
    width: 30px;
    height: 30px;
    color: red;
    cursor: pointer;
`
