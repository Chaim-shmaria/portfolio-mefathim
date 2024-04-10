import styled from '@emotion/styled';



export const Menu = styled.div<{ isOpen?: boolean }>`
  width:${props => props.isOpen ? 15 : 0}%;
  height:89.99%;
  margin-left:${props => props.isOpen ? 85 : 100}%;
  display:flex;
  flex-direction:column;  
  background: #0D1C30;
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  position: absolute;
  z-index: 1;
`
export const WarpText = styled.div`
  display:flex;
  height:10%;
  width:100%;
  cursor:pointer;
  transition:0.3s ease;
  text-decoration: none;
  &:hover  {
    background: #D9D9D933;
    };
`

export const TextMenu = styled.div<{ Name?: string, location:string }>`
  display:flex;
  flex-direction:column;
  justify-content:center;
  width:85%;
  height:100%;
  text-align: right ;
  font-size: 130%;
  font-weight:200;
  color:${props => props.Name === props.location ? '#F86E65' : 'white'};
`;

export const Layout = styled.div`
  width: 100%;
  height: 99.7vh;
  position: relative;
`;

export const MainArea = styled.div`
  width: 100%;
  height: 90%;
  overflow: scroll;
  ::-webkit-scrollbar {
        display: none;
      }
  background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url("/BackGround.jpeg") no-repeat;
  background-size: cover;
`;
