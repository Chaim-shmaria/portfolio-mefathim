import * as style from "../supplierOrder/popupForAddAndEdit/addPopUpAutoComplete.styles";
import { useState, useEffect, useRef } from "react";
import { RestaurantObjects } from "../shared/table/Table.types.js";

type AutoCompleteProps = {
  handleClick: (a: any) => void;
  olderData: RestaurantObjects[];
};
function MyAutoComplete(props: AutoCompleteProps) {
  const searchBy = "name";
  const [strToSrch, setStrToSrch] = useState("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const AutoCompleteRef = useRef<HTMLDivElement>(null);
  const data = props.olderData.filter(
    (user: RestaurantObjects) =>
      user[searchBy].toLowerCase().includes(strToSrch.toLowerCase()) &&
      user[searchBy].toLowerCase() !== strToSrch.toLowerCase()
  );
  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (
        AutoCompleteRef.current &&
        !AutoCompleteRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, []);

  return (
    <style.AutoComplete ref={AutoCompleteRef}>
      <style.Input
        placeholder="הוסף מוצר..."
        onClick={() => {
          setShowMenu(true);
        }}
        onChange={(e:any) => setStrToSrch(e.target.value)}
        value={strToSrch}
      />
      {!showMenu && !strToSrch && <style.IconSearch></style.IconSearch>}
      {showMenu && (
        //  strToSrch.length>2&&
        <style.Suggestions>
          {data.map((product: any) => {
            return (
              <style.LineName
                onClick={() => {
                  setStrToSrch('');
                  setShowMenu(!showMenu)
                  props.handleClick(product);
                }}
                key={product.id}
              >
                {product[searchBy]}
              </style.LineName>
            );
          })}
        </style.Suggestions>
      )}
    </style.AutoComplete>
  );
}

export default MyAutoComplete;
