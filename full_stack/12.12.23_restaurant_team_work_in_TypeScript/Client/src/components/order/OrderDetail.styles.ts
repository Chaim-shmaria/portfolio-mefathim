import styles from '@emotion/styled'


export const Orders = styles.div`
    width:45vw;
    height:65vh;
    border-radius:13px;
    min-height:520px;
    min-width:480px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    background-color: white;
    `

export const Close =styles.button`
    width: 5.5%;
    height:7%;
    margin-left:93%;
    border-radius:60%;
    background-color:#ffffff;
    border: 2px solid red;
    cursor:pointer;
    color:red;
    font-weight:bold;
    font-size:26px;
`

export const Title = styles.div`
    width:80%%;
    height:10%;
    font-family: Inter;
    font-size: 30px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0em;
    text-align:center;
`

export const Iddiv = styles.div`
    height:10%;
    display:flex;
    justify-content:space-between;
`

export const Bold=styles.span`
    font-weight:700;
    font-size:22px;
`

export const IdTable = styles.div`
    direction:rtl;
    margin-right:40px;
    text-align:right;
    font-size:22px
`

export const IdWaiter =styles.div`
    direction: rtl;
    text-align:left;
    margin-left:6%;
    font-size:22px

`

export const Thead = styles.div`
    direction:rtl;
    display:flex;
    justify-content:space-between;
`

export const Details = styles.div`
    height:24.5%;
    overflow:auto;
    display:flex;
    flex-direction:column;
    align-items: center;
`

export const TitleDetails = styles.div`
    height:10%;
    
    
`

export const GrayRow = styles.div`
    display:flex;
    direction:rtl;
    background: #D9D9D9A6;
    width:90%;
    height:30%;
    border-radius:5px;
    margin-top:1%;
` 

export const DishName = styles.div`
    width:40%;
    text-align: center;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top:1.5%;
    font-family:Courier monospace;
    font-weight:700;
    font-size:22px;

`

export const Amount =styles.div`
    width:10%;
    text-align: center;
    padding-top: 1.5%;
    font-family:Courier monospace;
    font-weight:700;
    font-size:22px

`

export const Price =styles.div`
    width:20%;
    text-align: center;
    padding-top:1.5%;
    font-family:Courier monospace;
    font-weight:700;
    font-size:22px

`

export const Notes =styles.span`
    width:30%;
    text-align:center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top:1.5%;
    font-family:Courier monospace;
`

export const AddCredit = styles.div`
    height:15%;
    width:42%;
    direction:rtl;
    text-align:center;
    
`

export const Input =styles.input`
    width: 40%;
    height: 50%;
    border: 1px solid black;
    margin-top: 3%;
    border-radius:5px;
    margin-right:5%;
`

export const TotalAmount = styles.div`
    height:10%;
    font-family: Inter;
    font-size: 20px;
    font-weight: 700;
    line-height: 17px;
    letter-spacing: 0em;
    text-align: center;
    direction:rtl;
`

export const ButtonDiv = styles.div`
    display:flex;
    justify-content:center;
    height: 12%;
`

export const Button = styles.button<{color?:string}>`        
    background-color:${props => props.color==="blue"? "#6AB5FA":'#BAD3B5' };
    margin:5px;
    width:35%;
    height:90%;
    border-radius: 5px;
    color: #FFFFFF;
    font-family: Inter;
    font-size: 16px;
    text-align: center;
`

