// import { useState } from "react";
import { useEffect, useState } from "react";
import * as style from "./InventoryPopUp.style";
import {
  addRow,
  getInventoryCategories,
  updateRow,
} from "../../services/inventoryService";

export interface inventoryObject {
  [key: string]: string | number | undefined|boolean;
  id?: number;
  name: string;
  category: string;
  quantity: number;
  size_type: string;
  order_threshold: string;
  is_active: boolean;
}
type PopupProps = {
  isNew: boolean;
  inventoryObject: inventoryObject;
  togglePop: () => void;
  fetchInventoryData: () => void;
  showAlert: (message: string) => void;
};

export const InventoryPopUp = (props: PopupProps) => {
  const [referenceTables, setReferenceTables] = useState([[]]);

  useEffect(() => {
    fetchReferenceTables();
  }, []);

  useEffect(() => {
  if(!props.isNew) insertIntoInput();
  }, [referenceTables]);

  const fetchReferenceTables = () => {
    getInventoryCategories().then((data) => setReferenceTables(data));
  };
  const insertIntoInput = () => {
    Object.entries(props.inventoryObject).map(([column, value]:any[]) => {
      let inputElement = document.getElementById(column) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = value;
      }
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let inventoryRow = props.inventoryObject;
    Object.keys(props.inventoryObject).map((key) => {
      let inputElement = e.target[key];
      if (inputElement) {
        inventoryRow[key as keyof inventoryObject] = inputElement.value;
      }
    });
    if (!Object.values(inventoryRow).includes("")) {
      props.isNew ? AddInventory(inventoryRow) : UpdateInventory(inventoryRow);
      props.togglePop();
    } else {
      props.showAlert("אנא מלא שדות רקים");
    }
  };

  const AddInventory = (obj: inventoryObject) => {
    addRow(obj)
      .then(props.fetchInventoryData)
      .then(() => props.showAlert("שורת מלאי חדשה התווספה בהצלחה"));
  };

  const UpdateInventory = async (obj: inventoryObject) => {
    await updateRow(obj.id!, obj);
     props.fetchInventoryData();
     props.showAlert("שורת מלאי התעדכנה בהצלחה");
  };

  

  return (
    <style.PopUp onSubmit={handleSubmit}>
      <style.Cancel onClick={props.togglePop}/>
      <style.Header>מוצר מלאי</style.Header>
      <style.InputWarper width={100}>
        <style.RowInputWarper>
          שם:
          <style.Input  id="name" width={70} type="text" />
        </style.RowInputWarper>
        <style.RowInputWarper>
          קטגוריה:
          <style.Select id="category" width={71}>
            {referenceTables[0].map((obj: {category:string}) => {
              return <option key={obj.category} value={obj.category}>{obj.category}</option>;
            })}
            <option  disabled selected hidden>
              בחר קטגוריה
            </option>
          </style.Select>
        </style.RowInputWarper>
      </style.InputWarper>
      <style.InputWarper width={78}>
        <style.RowInputWarper>
          סוג יחידה:
          <style.Select  id="size_type" width={42}>
            {Array.isArray(referenceTables[1])&&referenceTables[1].map((unit:{type:string,id:number}) => {
              return <option key={unit.id} value={unit.id}>{unit.type}</option>;
            })}
            <option value="" disabled selected hidden>
              בחר יחידה
            </option>
          </style.Select>
        </style.RowInputWarper>
        <style.RowInputWarper>
            סף מינימום:
          <style.Input
            id="order_threshold"
            width={40}
            type="number"
            min={0}
          />
        </style.RowInputWarper>
      </style.InputWarper>
      <style.Footer>
        <style.Submit type="submit">
          {props.isNew ? "הוסף מוצר" : "עדכן"}
        </style.Submit>
      </style.Footer>
    </style.PopUp>
  );
};
