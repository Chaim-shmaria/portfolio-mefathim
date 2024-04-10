import styles from "@emotion/styled";

export const MainWrapper = styles.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 80%; 
    min-height: 550px;
    width: 17%;
    min-width: 350px;
    background-color: #ffffff;
    align-self: center;
    justofy-self: center;
    border-radius: 5px;
    border: 0.5px solid #0D1C30;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.25);
    border-color: white;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
      }
    direction: rtl;
`;

export const BoxTitle = styles.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 40px;
    width: 100%;
    margin-top: 10px;
`;

export const Title = styles.div`
    height: 80%;
    font-weight: bold;
    font-size:26px;
    white-space: nowrap;
    margin-right: 2%;
`;

export const AddPictureButton = styles.button`
    height: 90%;
    width: 40%;
    margin-right: 30%;
    border-radius: 5px;
    border: 0px;
    background: #6AB5FA;
    color: white;
    font-weight: bold;
`;

export const DetailsBox = styles.div`
    display: flex;
    flex-direction: row;
    height: 40%;
    min-height: 140px;
    width: 90%;
    gap: 10px;
    margin-right: 10%;

`;

export const TextDetailsBox = styles.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    font-size: 16px;
    gap: 32px;
    padding: 10px;
`;

export const TextBoxDish = styles.div`
    font-weight: bold;
    gap: 20px;
    margin-top:10px;

    &.description {
        font-size:20px;
    }
`;


export const FiledDetailsBox = styles.div`
    display: flex;
    flex-direction: column;
    height: 160px;
    width: 95%;
    margin-top: 1px;
    gap:12px;
    bottom: 2%;
`;

export const DetailsFields = styles.input`
    margin-top: 10px;
    height: 40%;
    width: 85%;
    display: flex;
    flex-direction: row;
    background:  #D9D9D9;
    border-radius: 5px;
    border: 0px;

    &.category{
        position:fixd;
        width: 87%;
        text-align: center;
        font-size: 18px;
    }
`;

export const BoxProducts = styles.div`
    display: flex;
    flex-direction: column;
    height: 30%;
    width: 95%;
    gap: 5px;
    margin-right: 3%;
    margin-top:-20px;
`;

export const TextProductBox = styles.div`
    position:relative;
    display: flex;
    flex-direction: row;
    height: 10%;
    width: 100%;
    right: 1%;
    font-size: 16px;
    bottom:20px;
`;

export const TextBoxProduct = styles.div`
    display: flex;
    font-weight: bold;

    &.nessery {
        margin-right: 26%; 
    }

    &.quantity {
        margin-right: 30%; 
    }

    &.del{
        margin-right: 2%; 
    }
`;

export const MainProductFieldBox = styles.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    max-height: 160px;
    height: fit-content;
    overflow-y:${(props: { size: boolean })=>props.size=== true ? "auto":'hidden' };
    gap: 10px;
    bottom:15px;
`;

export const ProductFieldBox = styles.div`
    display: flex;
    flex-direction: row;
    flex-shrink:0;
    height: 30px;
    width: 100%;
    gap: 10px;
`;

export const ProductNameField = styles.input`
    height: 95%;
    width: 32%;
    background: #D9D9D9;
    border-radius: 5px;
    border: 0px;
    ::placeholder {
        color: #666666;
    }
`;


export const ProductQuantityField = styles.input`
    height: 90%;
    width: 15%;
    background:  #D9D9D9;
    border-radius: 5px;
    border: 0px;
`;

export const TypeBox = styles.div`
    height: 90%;
    width: 15%;
    background:  white;
    border-radius: 5px;
    display:flex;
    align-items:flex-end;
    border: 1px solid #0D1C30;
    text-align: center;
`;

export const CheckBox = styles.input`
    height: 90%;
    width: 8%;
    background:  white;
    border-radius: 10px;
    border: 1px solid #0D1C30;
    margin-top: 1px;
`;

export const RemoveRow = styles.button`
    height: 90%;
    width: 7%;
    left: 41%;
    border-radius: 4px;
    border: 1px solid #0D1C30;
    background: #ff4d4d;
    margin-top: 0.5px;

`;

export const AddProductButton = styles.button`
    position:relative;  
    height: 37px;
    min-height: 34px;
    width: 25%;
    right: 37%;
    border-radius: 5px;
    border: 0px ;
    background: #6AB5FA;
    color: white;
    font-weight: bold;
    bottom: 25px;
`;

export const DesceptionsBox = styles.div`
    display: flex;
    flex-direction: column;
    min-height: 100px;
    width: 95%;
    margin: auto;
    margin-top: -50px;
`;


export const DesceptionsField = styles.textarea`
    background:  #D9D9D9;
    min-height: 90px;
    width: 90%;
    text-align: start;
    resize: none; 
    border: 0px ;
    border-radius: 5px;
    line-height: 1.5;
    margin-right: 15px; 
    bottom: 10px;
`;


export const ButtonBox = styles.div`
    display: flex;
    flex-direction: row-reverse;
    gap: 20px;
    min-height: 40px;
    width: 95%;
    margin-bottom: 20px;
    margin-top: 20px;

`;

export const SubmitButton = styles.button`
    height: 40px;
    width: 80px;
    border-radius: 5px;
    border: 0px ;
    background: #93AF76;
    color: white;
    font-weight: bold;
    margin-left: 75px;
`;

export const cancelButton = styles.button`
    height: 40px;
    width: 80px; 
    border-radius: 5px;
    border: 0px ;
    background: #F86E65;
    color: white;
    font-weight: bold;
`;