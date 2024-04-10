import { useNavigate } from "react-router-dom";
import * as Style from "../../global.styles";
import { useLocation } from 'react-router-dom';

type SidenavOption = {
title: string;
redirectTo: string;
}
const SideNavOptions: SidenavOption[] = [
  {title: "מנות", redirectTo: "menu"},
  {title: "מלאי" ,redirectTo: "inventory"},
  {title: "ספקים ",redirectTo: "suppliers"},
  {title: "הזמנות", redirectTo: "supplier_order"},
  {title: "משתמשים", redirectTo: "users"},
  {title: "מוצרים", redirectTo: "products"},

];

function SideNav(props: any) {
  const navigate = useNavigate();
  const location = useLocation()

  const path = (location.pathname)
  const currentLocation = path.split("/")[2]


  return (
    <Style.Menu isOpen={props.sideNavOpen}>
      {SideNavOptions.map((key, val) => {
        return (
          <Style.WarpText onClick={() => {navigate(`/manager/${key.redirectTo}`)}}>
              <Style.TextMenu Name={key.redirectTo} location={currentLocation}>{key.title}</Style.TextMenu>
          </Style.WarpText>
              );
          })}
    </Style.Menu>
    );
}
export default SideNav;

