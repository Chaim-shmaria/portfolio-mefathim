import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Styled from "./Style.styles";

const HomePage = () => {
  const location = useLocation();
  const message = location.state && location.state.message;
  const navigate = useNavigate();
  const role = sessionStorage.getItem("userRole");

  return (
      <Styled.Body>
        <Styled.ButtonsContainer>
          <Styled.Button onClick={() => {navigate("/manager")}}>כניסת מנהל</Styled.Button>
          <Styled.Button onClick={() => {navigate("/work_day",)}}>התחל יום עבודה</Styled.Button>
        </Styled.ButtonsContainer>
        {message && (
          <Styled.MessageContainer>
            <Styled.Message>{message}</Styled.Message>
          </Styled.MessageContainer>
        )}
      </Styled.Body>
  );
};

export default HomePage;
