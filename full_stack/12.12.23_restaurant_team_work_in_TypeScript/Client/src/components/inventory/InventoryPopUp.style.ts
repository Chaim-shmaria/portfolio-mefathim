import styled from "@emotion/styled";
import { SlClose } from "react-icons/sl";




export const PopUp=styled.form`
/* margin-top:-10%; */
display:flex;
flex-direction:column;
height:45%;
width:20%;
background:white;
border-radius:10px;
gap:3%;
direction:rtl;
position:relative;
box-shadow: 0px 4px 4px 0px #00000040;

`
export const Cancel = styled(SlClose)`
  float: right;
  margin: 10px;
  width: 25px;
  height: 25px;
  color: red;
  cursor: pointer;
  `

export const Header=styled.h3`
position:absolute;
margin-right:35%;
`

export const InputWarper=styled.div<{ width: number }>`
width:${props=>props.width}%;
height:25%;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:8%;
`
export const RowInputWarper=styled.div`
display:flex;
justify-content:space-between;
direction:rtl;
width:90%;
height:30%;
`
export const Input=styled.input<{ width: number }>`
width:${props=>props.width}%;
height:100%;
border-radius:10px;
border:none;
background: #D9D9D9;
`
export const Select=styled.select<{ width: number }>`
width:${props=>props.width}%;
height:100%;
border-radius:10px;
border:none;
background: #D9D9D9;
`

export const Footer=styled.div`
display:flex;
justify-content:center;
align-items:center;
width:100%;
height:20%;
`
export const Submit=styled.button`
 width: 100px;
  color: white;
  background-color: rgba(30, 143, 255, 0.8);
  border-radius: 5px;
  border: none;
  padding: 5px;
  margin: 10px;
  &: hover {
    background-color: rgba(50, 143, 255, 1);
    cursor: pointer;
  }

`