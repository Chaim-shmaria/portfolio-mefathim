import { useState } from "react";
import * as Style from "./Topbar.style";
import SideNav from "./SideNav";
import EndWorkDay from "../workDay/endWorkDay/EndWorkDay";
import PopUp from "../shared/popup/Popup";
import { useLocation } from "react-router-dom";
import { logOut } from "../login/Login";



const TopBar = () => {
  const [sideNavIsOpen, setSideNavIsOpen] = useState(false);
  const [popups, setPopups] = useState(false);
  const location = useLocation();

  // if ther are problems with location based operation, 
  // consider checking window.location
  let currentUrl = location.pathname

  const openPop = () => {
    setPopups(true);
  };

  const closePop = () => {
    setPopups(false);
  }

  const changeStatus = () => {
    setSideNavIsOpen(!sideNavIsOpen);
  };

  const isWorking = currentUrl.startsWith("/work_day") ? true : false;


  return (
    <>
      <Style.TopBar>
        <Style.LeftPart>
          <Style.Logo href="/">
            <img src="/logo2.svg" alt="" />
          </Style.Logo>
          {sessionStorage.getItem("userName") &&
            <Style.WarpDayEnd onClick={isWorking ? openPop : logOut}>
              <Style.LogOut></Style.LogOut>
              <Style.WarpTextLogOut>{isWorking ? "סיום יום עבודה" : "Logout"}</Style.WarpTextLogOut>
            </Style.WarpDayEnd>}
          <Style.Username>
            {sessionStorage.getItem("firstName")}{" "}
            {sessionStorage.getItem("lastName")}
          </Style.Username>
        </Style.LeftPart>
        {sessionStorage.userRole=="מנהל" && (
          <Style.Hamburger
            onClick={changeStatus}
            isOpen={sideNavIsOpen}
          ></Style.Hamburger>
        )}
      </Style.TopBar>
      <SideNav sideNavOpen={sideNavIsOpen}></SideNav>
      {popups && (
        <PopUp togglePop={closePop}>
          <EndWorkDay closePop={closePop} />
        </PopUp>
      )}
    </>
  );
};


export default TopBar;
