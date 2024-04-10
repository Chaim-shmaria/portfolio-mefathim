import React, { useState, useEffect, useRef } from "react";
import * as Styled from "./UsersPupup.styles";
import isValidUser from "./UsersValiditon";
import { addRow, updateRow, checkUserPassword, sendImg,removeImg, } from "../../services/userServices";
import { IUser, Role } from "../shared/table/Table.types";
import useHashPassword from "../../Hooks/useHashPassword";
import CryptoJS from 'crypto-js';


interface AddUserProps {
  setShowComponent: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: number | null;
  users: any[];
  showAlert: (message: string) => void;
  showConfirmation: (message: string) => Promise<boolean>
}

const AddUser: React.FC<AddUserProps> = ({
  setShowComponent,
  userId,
  users,
  showAlert,
  showConfirmation
}) => {
  const [isUserExist, setIsUserExist] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [InputExists, setInput] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [curentImgUrl, setCurentImg] = useState<string>("/user.png");
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [passwordStatus, setPasswordStatus] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<IUser>({
    id: null,
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    username: "",
    password: "",
    role: Role.WAITER,
    is_active: true,
    image: "",
  });
  const inputImageRef = useRef<HTMLInputElement>(null);
  const hashedPassword = useHashPassword(currentUser.password);
  const url = process.env.REACT_APP_URL


  useEffect(() => {
    const user = getUserById(userId);
    if (user) {
      setCurrentUser(user);
      setIsUserExist(true);
    }
  }, [userId]);


  const getUserById = (userId?: number | null) => {
    if (userId == null) {
      return false;
    } else {
      return users.find((user) => user.id === userId);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    fieldName: string
  ) => {
    if (fieldName === "password") {setPasswordStatus("changed")}
    const value = e.target.value;
    const updatedUser: IUser = {
      ...(currentUser ?? {}),
      [fieldName]: value,
    };
    setCurrentUser(updatedUser);
  };

  const onClose = () => {
    setShowComponent(false);
  };

  const handleHash = () => {
   return {
      ...currentUser,
      password: hashedPassword!
    };
  }

  const onAddUser = async() => {
    if (isValidUser(currentUser, passwordStatus, showAlert)) {
      if (file) {
        submitImg();
      }
      const updatedUser = handleHash()
      addRow(updatedUser);
      onClose();
    }
  };

  const onEditUser = async() => {
    if (isValidUser(currentUser, passwordStatus, showAlert)) {
      if (file) {
        submitImg();
      }if(passwordStatus === "changed") {
        const updatedUser = handleHash()
        updateRow(updatedUser.id, updatedUser);
        onClose();
      }else{
        updateRow(currentUser.id, currentUser);
        onClose();
      } 
    }
  };

  const onChangePassword = () => {
    setChangePassword(!changePassword)
    setPasswordStatus("") 
  }

  const checkPassword = async(event:any) => {
    const password = CryptoJS.SHA256(event).toString(CryptoJS.enc.Hex);
    const result = await checkUserPassword(currentUser.username, password)
    if(result.data.success){
      setPasswordStatus("correct")    
    }else{
      setPasswordStatus("incorrect")
  }
}

const onImageClick = async() => {
  if (InputExists){
    if (await showConfirmation("?למחוק תמונה")==true) {
    setInput(false)
    URL.revokeObjectURL(curentImgUrl)
    setCurentImg("/user.png")
  }
}
    else{
  inputImageRef.current?.click();}
};

const handleFileChange = (e: any) => {
  if(e.target.files.length !== 0){
  setInput(true)
  const newImg = URL.createObjectURL(e.target.files[0]);
  setCurentImg(newImg);
  setFile(e.target.files[0]);
  URL.revokeObjectURL(curentImgUrl);}
};

  const submitImg = () => {
    const tump_user: IUser = currentUser;
    tump_user.image = file.name; //add the img name(Later it will be the user id)
    setCurrentUser(tump_user); //to the img column in db
    const formData = new FormData();
    formData.append("file", file);
    sendImg(formData); //send the img to the folder in the server
    URL.revokeObjectURL(curentImgUrl);
  };

  const deleteImage = async() => {
    if (await showConfirmation("?למחוק תמונה")==true) { 
        console.log("deleting")
        const tump_user: IUser = {...(currentUser ?? {}),["image"]: null}
        updateRow(currentUser.id, tump_user); //update the image column in db
        setCurrentUser(tump_user) // update the user for the The current rendering
        removeImg(currentUser.image); // remove from folder in server
      }
    else{console.log("not deleting..")}
  };

  return (
  
    <Styled.Container>
      <Styled.Icon onClick={onClose} />
        <Styled.H3>{isUserExist?":פרטי משתמש":":משתמש חדש"}</Styled.H3>
        <Styled.Profile>
      <Styled.ImageInput
        type="file"
        name="userimage"
        accept="image/*"
        ref={inputImageRef}
        onChange={handleFileChange}
      />
      {currentUser.image && (
        <Styled.UserImage
        className="profile"
          onClick={deleteImage}
          src={`${url}/users/img/${currentUser.image}`}
        /> 
      )}
      {!currentUser.image &&  (
        <Styled.UserImage 
        className="image"
        onClick={onImageClick} 
        src={curentImgUrl} />
      )}</Styled.Profile>
      <Styled.Rows>
      <Styled.Row>
          <Styled.LabelRow>שם משתמש:</Styled.LabelRow>
          <Styled.Input
            value={currentUser.username}
            onChange={(e) => {
              handleChange(e, "username");
            }}
          />
        </Styled.Row>
        <Styled.Row>
          <Styled.LabelRow>שם פרטי:</Styled.LabelRow>
          <Styled.Input
            value={currentUser.first_name}
            onChange={(e) => {
              handleChange(e, "first_name");
            }}
          />
        </Styled.Row>
        <Styled.Row>
          <Styled.LabelRow>שם משפחה:</Styled.LabelRow>
          <Styled.Input
            value={currentUser.last_name}
            onChange={(e) => {
              handleChange(e, "last_name");
            }}
          />
        </Styled.Row>
        <Styled.Row>
          <Styled.LabelRow>נייד:</Styled.LabelRow>
          <Styled.Input
            value={currentUser.phone_number}
            onChange={(e) => {
              handleChange(e, "phone_number");
            }}
          />
        </Styled.Row>
        <Styled.Row>
          <Styled.LabelRow>מייל:</Styled.LabelRow>
          <Styled.Input
                  // autoComplete="false"

            value={currentUser.email}
            onChange={(e) => {
              handleChange(e, "email");
            }}
          />
        </Styled.Row>
        {!isUserExist&&<Styled.Row>
        <Styled.LabelRow>סיסמה:</Styled.LabelRow>

          <Styled.Input
                  autoComplete="new-password"

            type={showPassword ? 'text' : 'password'}
            onChange={(e) => {
              handleChange(e, "password");
            }}
          />
          {!showPassword&&<Styled.ShowIcon onClick={() => setShowPassword(true)}/>}
          {showPassword&&<Styled.HideIcon onClick={() => setShowPassword(false)}/>}
        </Styled.Row>}
        <Styled.Row>
          <Styled.LabelRow>תפקיד:</Styled.LabelRow>
          <Styled.Select
            onChange={(e) => {
              handleChange(e, "role");
            }}
          >
            {<option value={currentUser.role}>{currentUser.role}</option>}
            {currentUser.role !== "מנהל" && (
              <option value="מנהל">מנהל</option>
            )}
            {currentUser.role !== "טבח" && <option value="טבח">טבח</option>}
            {currentUser.role !== "מלצר" && (
              <option value="מלצר">מלצר</option>
            )}
          </Styled.Select>
        </Styled.Row>
        {isUserExist && 
        <Styled.Row>
        <Styled.LabelRow>החלפת סיסמה:</Styled.LabelRow>
          <Styled.ChangePassword onClick={onChangePassword}/>
        </Styled.Row>}
        {changePassword&&<Styled.Row>
        <Styled.LabelRow>סיסמה נוכחית:</Styled.LabelRow>
          <Styled.Input
            disabled={passwordStatus == "changed" ? true : false} 
            type={showPassword ? 'text' : 'password'}
            onBlur={(e)=>{checkPassword(e.target.value)}}
          />
          {!showPassword&&<Styled.ShowIcon onClick={() => setShowPassword(true)}/>}
          {showPassword&&<Styled.HideIcon onClick={() => setShowPassword(false)}/>}
        </Styled.Row>}
        {changePassword&&<Styled.Row>
        <Styled.LabelRow>סיסמה חדשה:</Styled.LabelRow>
          <Styled.Input
            disabled={passwordStatus == "correct" || passwordStatus == "changed" ? false : true}
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => {
              handleChange(e, "password")
            }}
          />
          {!showPassword&&<Styled.ShowIcon onClick={() => setShowPassword(true)}/>}
          {showPassword&&<Styled.HideIcon onClick={() => setShowPassword(false)}/>}
        </Styled.Row>}
        {changePassword&&passwordStatus&&<Styled.H4 color={passwordStatus == "incorrect" ? "red" : "blue"}>{passwordStatus == "incorrect" ? "סיסמה שגויה!" : "סיסמה נכונה!"}</Styled.H4>}
        {isUserExist && (
          <Styled.Button onClick={onEditUser}>שמור שינויים</Styled.Button>
        )}
        {!isUserExist && (
          <Styled.Button onClick={onAddUser}>הוסף משתמש</Styled.Button>
        )}
      </Styled.Rows>
    </Styled.Container>
  );
};

export default AddUser;
