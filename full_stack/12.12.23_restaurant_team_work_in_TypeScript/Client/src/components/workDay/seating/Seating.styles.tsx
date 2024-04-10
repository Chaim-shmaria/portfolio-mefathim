import styled from '@emotion/styled';

export const SeatingPage = styled.div`
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 241px;
    border-radius: 5px;
    background-color: white;
`;

export const PageTitleAndExitButton = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 15%;
    margin-bottom: 2%;
    margin-top: 1%;
`;

export const PageTitle = styled.div`
    display: flex;
    align-items: center;
    width: 65%;
    height: 100%;
    font-size: 1rem;
    font-weight: bold;
`;

export const ExitButton = styled.div`
    display: flex;
    width: 8%;
    height: 65%;
    border: 1px solid #FD0909;
    justify-content: center;
    margin-right: 1%;
    color: #FD0909;
    border-radius: 50%;
    &:hover{
        background-color: #f0b0b0;
    }
`;

export const waiter = styled.div<{isConnect?:boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 98%;
    height: 15%;
    font-size: small;
    color: ${(props) => props.isConnect ? '#aaaaaa' : ""};
select{
        border: none;
        direction: rtl;
        margin-right: 8%;
        width: 45%;
        height: 80%;
        border-radius: 8%;
        background-color: #D9D9D9;
    }
`;

export const Diners = styled.div<{isConnect?:boolean}>`
    display: flex;
    font-size: small;
    justify-content: center;
    align-items: center;
    width: 98%;
    height: 15%;
    color: ${(props) => props.isConnect ? ('#aaaaaa') : ("")};
`;

export const NumberDiners = styled.input<{isConnect?:boolean}>`
    width: 29%;
    height: 70%;
    border-radius: 8%;
    margin-right: 8%;
    display: flex;
    margin-right: 8%;
    border: none;
    direction: rtl;
    color: ${(props) => props.isConnect ? ('#aaaaaa') : ("")};
    background-color: ${(props) => props.isConnect ? "#e7e3e3" : '#D9D9D9'};
`;

export const ConnectionTableButton = styled.input`
    display: flex;
    width: 30%;
    height: 30%;
    border-radius: 8%;
    background-color: #D9D9D9;
`;

export const ConnectionTable = styled.div`
    display: flex;
    width: 98%;
    height: 20%;
    font-size: small;
    margin-top: 5%;
    align-items: center;
    select{
        border: none;
        direction: rtl;
        width: 70%;
        height: 65%;
        border-radius: 8%;
        margin-left: 10%;
        background-color: #D9D9D9;
    }
`;

export const ConnectionTableText = styled.div<{color?:string}>`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 98%;
    height: 100%;
    color: ${(props) => props.color ? props.color : ''};
`;

export const Confirm = styled.div`
    display: flex;
    width: 40%;
    height: 13%;
    border-radius: 8%;
    color: white;
    font-weight: bold;
    font-size: small;
    justify-content: center;
    align-items: center;
    background-color: #6AB5FA;
    margin-top: 5%;
    margin-left: 30%;
    &:hover{
        background-color: #1d6bb5;
    }
`;
