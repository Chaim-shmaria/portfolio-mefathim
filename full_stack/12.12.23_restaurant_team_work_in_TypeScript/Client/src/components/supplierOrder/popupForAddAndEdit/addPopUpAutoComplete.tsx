import * as style from "./addPopUpAutoComplete.styles";
import { useState, useEffect, useRef } from "react";
import { RestaurantObjects } from "../../shared/table/Table.types.js";

type AutoCompleteProps = {
  handleClick: (a: any) => void;

  olderData: RestaurantObjects[];
};
function AutoComplete(props: AutoCompleteProps) {
  const searchBy = "name";
  const [strToSrch, setStrToSrch] = useState("");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showIconSearch, setShowIconSearch] = useState<boolean>(true);
  const AutoCompleteRef = useRef<HTMLDivElement>(null);
  const productsNmaes = props.olderData.filter((user: RestaurantObjects) =>
    user[searchBy].toLowerCase().includes(strToSrch.toLowerCase())
  );
  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      if (
        AutoCompleteRef.current &&
        !AutoCompleteRef.current.contains(event.target)
      ) {
        setShowMenu(false);
        setShowIconSearch(true);
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
          setShowIconSearch(false);
          setShowMenu(true);
        }}
        onChange={(e) => setStrToSrch(e.target.value)}
        value={strToSrch}
      />
      {showIconSearch && !strToSrch && <style.IconSearch></style.IconSearch>}
      { (
        <style.Suggestions>
          {strToSrch.length >= 2 &&
            showMenu &&
            productsNmaes.map((product: any) => {
              return (
                <style.LineName
                  onClick={() => {
                    setStrToSrch(product[searchBy]);
                    props.handleClick(product.id);
                    setStrToSrch('')
                  }}
                  key={product[searchBy]}
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

export default AutoComplete;
