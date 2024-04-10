import React, { useState, ReactNode } from 'react';
import PopUp from "../components/shared/popup/Popup";
import * as Styled from "./useAlert.styles";



type AlertComponentProps = {
  message: string;
  onClose: () => void;
};

type UseCustomAlertHook = {
  showAlert: (message: string) => void;
  hideAlert: () => void;
  renderAlert: () => ReactNode | null;
};

const useCustomAlert = (): UseCustomAlertHook => {
  const [alertContent, setAlertContent] = useState<string | null>(null);

  const showAlert = (message: string) => {
    setAlertContent(message);
  };

  const hideAlert = () => {
    setAlertContent(null);
  };
  const toggle = () => {
    console.log("");
  };

  const AlertComponent: React.FC<AlertComponentProps> = ({ message, onClose }) => (
    
    <PopUp togglePop={toggle}>
        <Styled.Wrapper className="wrapper">
                <Styled.label>
                <Styled.Alarm>
            {message.split('\n').map((part, index) => (
              <div key={index}>{part}</div>
            ))}
          </Styled.Alarm>                </Styled.label>
                <Styled.ButtonLabel>
                    <Styled.EnterButton onClick={onClose}>אישור</Styled.EnterButton>
                </Styled.ButtonLabel>
        </Styled.Wrapper>
    </PopUp>
  );

  const renderAlert = () => {
    return alertContent ? <AlertComponent message={alertContent} onClose={hideAlert} /> : null;
  };

  return {
    showAlert,
    hideAlert,
    renderAlert,
  };
};

export default useCustomAlert;
