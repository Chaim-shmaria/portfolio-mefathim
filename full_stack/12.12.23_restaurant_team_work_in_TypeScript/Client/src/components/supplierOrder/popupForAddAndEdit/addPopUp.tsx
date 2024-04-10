import PopUp from "../../shared/popup/Popup";
import OrderTable from "./addPopUpTable";
import * as Styled from "./addPopUp.styles";
import { ISupplierOrder } from "../../shared/table/Table.types";
import { useState, useEffect } from "react";

type addOrder = {
  toggle: () => void;
  fetchOrder: () => void;
};
type tableData = {
  values: ISupplierOrder;
};

const AddOrder = (props: addOrder) => {
  const [data, setData] = useState([]);

  return (
    <PopUp togglePop={props.toggle}>
      <Styled.pop>
        {data && (
          <OrderTable
            props={{
              name: "הזמנה חדשה",
              values: data,
              onAdd: () => {},
              onDelete: () => {},
              onEdit: () => {},
              handleToggle: props.toggle,
              fetchOrders: props.fetchOrder,
              addOrEdit: "add",
            }}
          ></OrderTable>
        )}
      </Styled.pop>
    </PopUp>
  );
};

export default AddOrder;
