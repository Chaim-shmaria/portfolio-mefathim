import React, { useState, ReactNode } from 'react';
import PopUp from "../components/shared/popup/Popup";
import * as Styled from "./useAlert.styles";


type ConfirmationComponentProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void; // New prop to handle closing the confirmation component
};

type UseCustomConfirmationHook = {
  showConfirmation: (message: string) => Promise<boolean>;
  renderConfirmation: () => React.ReactNode | null;
};

const useCustomConfirmation = (): UseCustomConfirmationHook => {
  const [confirmationContent, setConfirmationContent] = React.useState<{
    message: string;
    resolve: (value: boolean) => void;
  } | null>(null);

  const showConfirmation = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmationContent({ message, resolve });
    });
  };

  const ConfirmationComponent: React.FC<ConfirmationComponentProps> = ({
    message,
    onConfirm,
    onCancel,
    onClose, // New prop to handle closing the confirmation component
  }) => {
    const handleConfirm = () => {
      onConfirm();
      if (confirmationContent?.resolve) {
        confirmationContent.resolve(true);
      }
      onClose(); // Close the confirmation component after confirming
    };

    const handleCancel = () => {
      onCancel();
      if (confirmationContent?.resolve) {
        confirmationContent.resolve(false);
      }
      onClose(); // Close the confirmation component after canceling
    };

    const toggle = () => {
        onClose();
        };
        
        return (
        <PopUp togglePop={toggle}>
        <Styled.Wrapper className="wrapper">
        <Styled.label>
        <Styled.Alarm>
        {message.split('\n').map((part, index) => (
        <div key={index}>{part}</div>
        ))}
        </Styled.Alarm> 
        </Styled.label>
        <Styled.ButtonsLabel>
        <Styled.CancelButton onClick={handleCancel}>ביטול</Styled.CancelButton>
        <Styled.EnterButton onClick={handleConfirm}>אישור</Styled.EnterButton>
        </Styled.ButtonsLabel>
        </Styled.Wrapper>
        </PopUp>
        );
        };

  const renderConfirmation = () => {
    if (!confirmationContent) return null;
    const { message } = confirmationContent;
    return (
      <ConfirmationComponent
        message={message}
        onConfirm={() => {}}
        onCancel={() => {}}
        onClose={() => setConfirmationContent(null)} // Close the confirmation component
      />
    );
  };

  return {
    showConfirmation,
    renderConfirmation,
  };
};

export default useCustomConfirmation;
