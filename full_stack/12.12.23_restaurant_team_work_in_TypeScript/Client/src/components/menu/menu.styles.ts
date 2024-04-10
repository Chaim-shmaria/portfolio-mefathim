import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 99%; 
  min-width: 1000px;
  min-height: 600px;
`;

export const upperRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-self: flex-end;
    margin-right: 4%;
    width: 90%;
    height: 15%;
`;

export const RightupperRow = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 15%;
    align-items: center;
    width: 40%;
    height: 100%;
`;

export const Text = styled.div`
    display: flex;
    height: 100%;
    width: 17%;
    font-size: 2rem;
    font-weight: bold;
    justify-content: center;
    align-items: center; 
`;

export const PlusButton = styled.div`
    display: flex;
    height: 50%;
    width: 6%;
    font-size: 3rem;
    font-weight: bold;
    justify-content: flex-end;
    align-items: center; 
    &:hover{
        color: #5f5c5c;
    }
`;

export const Select = styled.select`
    display: flex;
    align-self: center;
    height: 27%;
    width: 20%;
    direction: rtl;
    font-weight: bold;
    background-color: white;
    border: none;
    border-radius: 5px;
`;

export const LeftupperRow = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 45%;
    height: 100%;
    font-weight: bold;
`;

export const Share = styled.div`
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    justify-content: flex-start;
    height: 60%;
    width: 40%;
`;

export const DisplayText = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-end;
  font-size: 1rem;
  font-weight: bold;
`;

export const Search = styled.div`
    display: flex;
    align-items: flex-start;
    width: 30%;
    margin-top: 14%;
    height: 100%;
    z-index:2;
`;

export const RationItems = styled.div`
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    overflow:auto;
    height: 80%;
    width: 95%;
    padding-right: 2%;
    gap: 3%;
    margin-left: 2%;
    ::-webkit-scrollbar {
    display: none;
}
`;

export const dish = styled.div`
    width: 14%;
    height: 31%;
`;

