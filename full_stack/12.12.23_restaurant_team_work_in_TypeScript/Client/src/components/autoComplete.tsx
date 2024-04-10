import * as style from "./AutoComplete.styles";
import { useState, useEffect, useRef } from "react";
import { RestaurantObjects } from "./shared/table/Table.types.js";

type AutoCompleteProps = {
  olderData: RestaurantObjects[];
  setOlderData: any;
  searchBy: keyof RestaurantObjects;
};

const AutoComplete = (props: AutoCompleteProps) => {
  const [showIcon, setShowIcon] = useState<boolean>(true);
  const [stringToSearch, setStringToSearch] = useState("");
  const AutoCompleteRef = useRef<HTMLDivElement>(null);
 
  useEffect (()=>{
    dataToDisplay(stringToSearch)
  },[props.olderData])
  
  useEffect(() => {

    const handleOutSideClick = (event: any) => {
      if (
        AutoCompleteRef.current &&
        !AutoCompleteRef.current.contains(event.target)
      ) {
        setShowIcon(true);
      }
    };
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, []);

  const dataToDisplay = (str: string) => {
    let arrayFilterData = props.olderData.filter((item) =>
   Object.values(item).some((value)=>
    String(value).toLowerCase().includes(str.toLowerCase()))
    );
    props.setOlderData(arrayFilterData);
  };

  return (
    <style.AutoComplete ref={AutoCompleteRef}>
      <style.Input
      type="search"
        autoComplete="off"
        onClick={() => {
          setShowIcon(false);
        }}
        onChange={async (e) => {
          setStringToSearch(e.target.value);
         ( e.target.value.length > 2||e.target.value.length===0) && dataToDisplay(e.target.value);
        }}
        value={stringToSearch}
      />
      {showIcon && !stringToSearch && <style.IconSearch></style.IconSearch>}
     
    </style.AutoComplete>
  );
};

export default AutoComplete;
