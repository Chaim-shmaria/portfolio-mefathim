import styles from '@emotion/styled'



export const PopUp = styles.div`
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    width: 45vw;
    height:25vh;
    border:2px solid black;
    display:flex;
    flex-direction:column;
    justify-content:center;
` 

export const TotalAmount = styles.div`
    direction:rtl;
    height:10%;
    font-family: Inter;
    font-size: 30px;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
`

export const ButtonDiv = styles.div`
    display:flex;
    justify-content:center;
    height:30%;
`

export const Button = styles.button`
    background-color:${(props: { color: string; })=>props.color==="blue"? "#6AB5FA":'#BAD3B5' };
    margin:5px;
    width:35%;
    height:90%;
    border-radius: 5px;
    color: #FFFFFF;
    font-family: Inter;
    font-size: 16px;
    margin-top:50px;
    letter-spacing: 0em;
    text-align: center;
`

export const CheckMark = styles.div`
    margin-bottom:10px;
    font-size:50px;
    border-radius:50%;
    border: 3px solid rgb(67, 160, 71);
    width:50px;
    display:flex;
    text-align: center;
    margin-left:45%;  
`

export const PaymentReceived = styles.div`
    font-family: Inter;
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 0em;
    direction:rtl;
    margin-top:20px;
    text-align: center;
`

