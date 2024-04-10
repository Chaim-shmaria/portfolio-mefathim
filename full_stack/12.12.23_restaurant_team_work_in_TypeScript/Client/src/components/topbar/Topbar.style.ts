import styled from "@emotion/styled";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuLogOut } from "react-icons/lu";

export const TopBar = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  background: #0d1c30;
  justify-content: space-between;
  align-items: center;
`;
export const LeftPart = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
`;
export const Logo = styled.a`
  height: 100%;
  display: flex;
  align-items: center;
  img {
    height: 80%;
  }
`;

export const WarpLogOut = styled.div`
  width: 25%;
  display: flex;
  justify-content: start;
  color: #c0c0c0;
  background: none;
  cursor: pointer;
`;

export const WarpTextLogOut = styled.div`
margin-top:2%;
  font-size: 1.5vw;
  flex-grow: 2;
`;

export const LogOut = styled(LuLogOut)`
  color: white;
  font-size: 2.3vw;
  flex-grow: 2;
`;

export const WarpDayEnd = styled.button`
  width: 25%;
  /* weight: 100%; */
  display: flex;
  justify-content: start;
  color: #c0c0c0;
  background: none;
  border: 0;
  cursor: pointer;
`;

export const WarpTextDayOff = styled.div`
  /* margin-top: 26%; */
  /* width: 40%; */
  /* height: 30%; */
  font-size: 1.8rem;
  flex-grow: 2;
`;

export const DayOff = styled(LuLogOut)`
  /* margin-top: 14%; */
  color: white;
  font-size: 2.5rem;
  flex-grow: 2;
  /* width: 40%; */
  /* height: 60%; */
`;

export const Username = styled.div`
  display: flex;
  width: 50%;
  color: white;
  overflow: hidden;
  letter-spacing: 0.03em;
  font-size: 1.3vw;
`;

export const Hamburger = styled(RxHamburgerMenu)<{ isOpen: boolean }>`
width: 5%;
font-size: 3rem;
  cursor: pointer;
  color: white;
  &:hover {
    margin-right: 0.1%;
  }
`;
