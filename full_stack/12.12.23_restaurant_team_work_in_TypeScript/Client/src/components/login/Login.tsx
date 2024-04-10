import React, {useState} from "react";
import * as Styled from "./Login.styles";
import { checkAccessDetails } from "../../services/loginService";
import { useLocation, useNavigate } from 'react-router-dom';
import useHashPassword from "../../Hooks/useHashPassword";
import PopUp from "../shared/popup/Popup";
import useCustomAlert from '../../Hooks/useAlert';





export const logOut = () => {
  sessionStorage.removeItem("userRole")
  sessionStorage.removeItem("isLogged")
  sessionStorage.removeItem("userName")
  sessionStorage.removeItem("firstName")
  sessionStorage.removeItem("lastName")
  window.location.pathname = "/"
};


const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const location = useLocation();
  const [showPassword, setShoePassword] = useState<boolean>(false);
  const [showComponent, setShowComponent] = useState<boolean>(false);
  const { showAlert, renderAlert } = useCustomAlert();


  const hashedPassword = useHashPassword(password);

  
  const enterdValues = () => {
    const userNameExists = userName.trim() !== '';
    const passwordValid = password.trim() !== '';
  
    if (userNameExists && passwordValid) {
      checkDetails();
    } else if (!userNameExists && !passwordValid) {
      showAlert("נא הכנס שם משתמש\n נא הכנס סיסמה");
    } else if (!userNameExists) {
      showAlert("נא הכנס שם משתמש");
    } else {
      showAlert("נא הכנס סיסמה");
    }
  };
  
  const checkDetails = async() => {
    const res = await checkAccessDetails(userName, hashedPassword!)
    if(res.data.items){
    const valid = res.data.items[0]
      validUser(valid.role, valid.first_name, valid.last_name)
    }else{
      showAlert("שם משתמש ו/או סיסמה אינם נכונים")
    }
  }
  
  const validUser = (role:string, firstName:string, lastName:string) => {
  sessionStorage.setItem("userName", userName);
  sessionStorage.setItem("isLogged", "true");
  sessionStorage.setItem("userRole", role);
  sessionStorage.setItem("firstName", firstName);
  sessionStorage.setItem("lastName", lastName);
  document.location.reload()
  }

  const onClose = () => {
    navigate("/")
  }

  const toggle = () => {
    setShowComponent(!showComponent);
  };

  return (
    <div>
    <PopUp togglePop={toggle}>
    <Styled.Wrapper className="wrapper">
      {location.pathname === '/manager' ? (
        <Styled.Tytle>כניסת מנהל</Styled.Tytle>
      ) : (
        <Styled.Tytle>התחל יום עבודה</Styled.Tytle>
      )}
        <Styled.label>
          <Styled.Input
            type="text"
            placeholder="שם משתמש"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></Styled.Input>
        </Styled.label>
        <Styled.label>
          <Styled.Input
            type={showPassword ? 'text' : 'password'}
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!showPassword&&<Styled.ShowIcon onClick={() => setShoePassword(!showPassword)}/>}
          {showPassword&&<Styled.HideIcon onClick={() => setShoePassword(!showPassword)}/>}
        </Styled.label>
        <Styled.ButtonsLabel>
          <Styled.CancelButton onClick={onClose}>ביטול</Styled.CancelButton>
          <Styled.EnterButton onClick={() =>enterdValues()}>כניסה</Styled.EnterButton>
        </Styled.ButtonsLabel>
    </Styled.Wrapper>
    </PopUp>
    {renderAlert()}
    </div>
  );
};
export default Login;
