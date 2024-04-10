import * as Styled from "./Popup.style";



type PopupProps = {
  togglePop: () => void;
  children?: React.ReactNode;
};

const PopUp = (props: PopupProps) => {
  const MouseClickHandler = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      props.togglePop();
    } else {
    }
  };

  return (<Styled.Popup onClick={MouseClickHandler}>{props.children}</Styled.Popup>);
};

export default PopUp;
