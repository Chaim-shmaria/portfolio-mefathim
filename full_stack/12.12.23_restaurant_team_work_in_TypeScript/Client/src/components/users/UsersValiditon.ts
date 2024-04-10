import React from "react";
import { IUser } from "../shared/table/Table.types";



const isValidUser = (user: IUser, isChagedPassword:string, showAlert: (message: string) => void): boolean => {
  var regName = /^[\u0590-\u05FFa-zA-Z]+ ?[\u0590-\u05FFa-zA-Z']+$/;
  var phoneNumber = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  var regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  var RegEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  let errorMessages = "";

  if (!user.username){
    errorMessages += ".נא הכנס שם משתמש -\n";
  }

  if (!regName.test(user.first_name)) {
    errorMessages += ".שם פרטי לא תקין -\n";
  }

  if (!regName.test(user.last_name)) {
    errorMessages += ".שם משפחה לא תקין -\n";
  }

  if (!phoneNumber.test(user.phone_number)) {
    errorMessages += ".נא הכנס מספר טלפון חוקי -\n";
  }

  if (!RegEmail.test(user.email)) {
    errorMessages += ".נא הכנס כתובת אימייל חוקית -\n";
  }

  if(isChagedPassword == "changed" && user.password){
  if (!regPassword.test(user.password)) {
    errorMessages +=
      " הסיסמה חייבת להכיל לפחות 8 תווים ולכלול לפחות -\n .ספרה אחת, אות קטנה אחת, ואות גדולה אחת\n";
  }}

  if (!user.password) {
    errorMessages += ".נא הכנס סיסמה -\n";
  }


  if (errorMessages !== "") {
    showAlert(errorMessages);
    return false;
  }

  return true;
};
export default isValidUser;
