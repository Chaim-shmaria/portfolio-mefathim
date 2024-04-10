import { useEffect, useState } from "react";
import * as Style from "./EndWorkDay.styles";
import React from "react";
import { FcCheckmark } from "react-icons/fc";
import { getData } from "../../../services/workDayService";
import * as CryptoJS from "crypto-js";
import { logOut } from "../../login/Login";

const EndWorkDay = ({ closePop }: { closePop: () => void }) => {
  const [state, setState] = useState("start");
  const [enteredPassword, setEnteredPassword] = useState("");


  const resetState = () => {
    setState("start");
    setEnteredPassword("");
  };

  const handlePswrdField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = event.target.value;

    setEnteredPassword(fieldValue);
  };

  function hashPassword(password: string): string {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    return hashedPassword.slice(0, 8);
  }

  const handleOkButton: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    try {
      const hashedPassword = await hashPassword(enteredPassword);
      const response = await getData(hashedPassword);

      if (response === 245 || response === 251) {
        setState("pswrdError");
      } else if (response === 250) {
        setState("orderError");
      } else if (response === 200) {
        setState("end");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (state === "end") {
      const timer = setTimeout(() => {
        closePop();
        logOut();
        window.location.reload();
      }, 3000);
      return () => clearTimeout(timer);
    }
  });


  return (
    <div>
      {state === "start" ? (
        <Style.EndWorkDayPopup>
          <Style.EndWorkDayText>
            <h1>סיום יום עבודה</h1>
            <h4>הכנס סיסמת מנהל </h4>
          </Style.EndWorkDayText>

          <Style.PswrdField
            type="password"
            value={enteredPassword}
            onChange={handlePswrdField}
          />

          <Style.OkBtn onClick={handleOkButton}>
            אישור
          </Style.OkBtn>
        </Style.EndWorkDayPopup>
      ) : state === "pswrdError" || state === "orderError" ? (
        <Style.EndWorkDayPopup>
          <Style.EndWorkDayErrText>
            {state === "pswrdError" ? (
              <h1>סיסמא שגויה</h1>
            ) : (
              <h1>ישנן הזמנות פתוחות</h1>
            )}
            <Style.ErrBtn onClick={resetState}>
              אישור
            </Style.ErrBtn>
          </Style.EndWorkDayErrText>
        </Style.EndWorkDayPopup>
      ) : (
        state === "end" && (
          <Style.EndWorkDayPopup>
            <Style.Vmark>
              <FcCheckmark />
            </Style.Vmark>
            <Style.EndWorkDayEndText>
              <h2>!יום עבודה הסתיים בהצלחה</h2>
              <h2>מבצע יציאת משתמש</h2>
            </Style.EndWorkDayEndText>
          </Style.EndWorkDayPopup>
        )
      )}
      ;
    </div>
  );
};
export default EndWorkDay;
