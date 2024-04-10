import styled from "@emotion/styled";

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  /* &:before {
    content: "";
    position: absolute;
    top: -100px;
    left: -100px;
    right: 0;
    bottom: 0;
    background: url("back.jpg") no-repeat center center fixed;
    background-size: cover;
    filter: brightness(1.2);
    filter: blur(1px) hue-rotate(275deg);
    z-index: -1;
  }
  margin: 0; */
`;

export const Button = styled.button`
  height: 55.5px;
  min-width: 200px;
  top: 0;

  border-radius: 10px;
  border: 1px solid #512c1c;

  margin: 20px;

  background: rgba(255, 255, 255, 0.8);
  font-size: 20px;
  font-weight: 550;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: center;
  color: #512c1c;
  cursor: pointer;
  &:active {
    transform: scale(0.99);
    box-shadow: 0px 2px 2px 0px #00000040;
  }
`;
export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: row;
`;

export const Message = styled.h2`
  margin: 0;
  color: #ffffff;
`;

export const MessageContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

export const StyledImage = styled.img`
  width: 40%;
  height: 80%;
  margin: 1%;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: -1;
`;
