import { useState, useEffect } from "react";
import {
  deleteRow,
  getInventoryByColumn,
  getInventoryData,
  makeActive,
} from "../../services/inventoryService";
import { GenericTable } from "../shared/table/Table";
import { InventoryPopUp ,inventoryObject} from "./InventoryPopUp";
import PopUp from "../shared/popup/Popup";
import useCustomAlert from '../../Hooks/useAlert';
import useCustomConfirmation from "../../Hooks/useConfirm";

export const Inventory = () => {
  const [data, setData] = useState([]);
  const [showPop, setShowPop] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [inventoryObject, setInventoryObject] = useState({} as inventoryObject);
  const [active, setActive] = useState(true);
  const { showAlert, renderAlert } = useCustomAlert();
  const { renderConfirmation, showConfirmation } = useCustomConfirmation();

  const fetchInventoryData = () => {
    active
      ? getInventoryByColumn().then((data) => setData(data))
      : getInventoryData().then((data) => setData(data));
  };

  const toggle = () => {
    setShowPop(!showPop);
  };

 const makeActiveData = async(obj: any) => {
    await makeActive(obj)
    fetchInventoryData()
  };
  const handleDelete = async (id: number) => {
    if (await showConfirmation("?האם אתה בטוח שאתה רוצה למחוק")==true) {
      let check = await deleteRow(id);
      if (Array.isArray(check)) {
        showAlert(
          `   
      אין אפשרות למחוק    
      :המוצרים הבאים קיימים במלאי 
      ` +
            check.map((product) => {
              return product.name;
            })
        );
      } else {
        showAlert("נמחק בהצלחה");
         fetchInventoryData();
      }
    }
  };

  const handleAdd =  () => {
    let olderData: inventoryObject = {
      name: "",
      category: "",
      quantity: 0,
      size_type: "",
      order_threshold: "",
      is_active: true,
    };
     setInventoryObject(olderData);
    if (!isNew) setIsNew(!isNew);
    toggle();
  };
  const handleUpdate =  (obj: inventoryObject) => {
     setInventoryObject(obj);
    if (isNew) setIsNew(!isNew);
    toggle();
  };
  const checkColor=(field:any,quantity:any,order_threshold:any)=>{
    if (field==='quantity')
    { if (quantity>(order_threshold*1.1))
      return 'blue'
    else return 'red'}
  }
  useEffect(() => {
    fetchInventoryData();
  }, [active]);

  return (
    <div>
      {showPop && (
        <PopUp togglePop={toggle}>
          <InventoryPopUp
            fetchInventoryData={fetchInventoryData}
            togglePop={toggle}
            isNew={isNew}
            inventoryObject={inventoryObject}
            showAlert={showAlert}
          ></InventoryPopUp>
        </PopUp>
      )}
     {renderAlert()}
     {renderConfirmation()}
      <GenericTable
        props={{
          name: "מלאי",
          values: data,
          onAdd: handleAdd,
          onDelete: handleDelete,
          onEdit: handleUpdate,
          makeActiveData:makeActiveData,
          activeMode: active,
          setMode: setActive,
          color:checkColor,
        }}
      ></GenericTable>
    </div>
  );
};
