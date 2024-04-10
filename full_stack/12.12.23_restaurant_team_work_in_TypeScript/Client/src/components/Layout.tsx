import React from "react";
import { Outlet } from "react-router-dom";
import * as Styled from "../global.styles";
import TopBar from "./topbar/Topbar";
import { useLocation } from 'react-router-dom';



export default function Layout() {
  const location = useLocation();

  return (
    <Styled.Layout>
      <TopBar></TopBar>
      <Styled.MainArea>
        <Outlet />
      </Styled.MainArea>
    </Styled.Layout>
  );
}
