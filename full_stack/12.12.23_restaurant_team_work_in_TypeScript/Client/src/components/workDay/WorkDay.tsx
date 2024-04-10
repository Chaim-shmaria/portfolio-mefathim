import React, { useEffect, useState } from "react";
import {
  RestaurantSquare,
  getDataTable,
  unseatTable,
  updateTable,
} from "../../services/restaurantFloorService";
import { getMenuData } from "../../services/menuService";
import { Outlet, useNavigate } from "react-router-dom";
import PopUp from "../shared/popup/Popup";
import OrderDetails from "../order/OrderDetails";
import { ITable } from "@/dataTypes/table";
import { IDinerOrder } from "@/dataTypes/dinerOrder";
import { deleteOrder, getActiveOrders } from "../../services/dinerOrdersService";
import Seating from "./seating/Seating";
import WorkDayContext, { WorkDayContextType } from "./WorkDayContext";
import * as styled from "./workDay.styles";
import { IDish } from "@/dataTypes/dish";

const WorkDay = () => {
  const [FloorLayout, setFloorLayout] = useState<RestaurantSquare[]>([]);
  const [initOrders, setOrders] = useState<IDinerOrder[]>([]);
  const [Menu, setMenu] = useState<IDish[]>([]);
  const [action, setAction] = useState("");
  const [clickTableId, setClickTableId] = useState<number | null>(null);

  const goToPayTakeAway = () => {
    setAction('openTakeAway');
  };

  let table: RestaurantSquare | undefined = FloorLayout.find(
    (table: RestaurantSquare) => table.config.id == clickTableId
  );

  const closePopUp = () => {
    setClickTableId(null);
    setAction("");
  };

  const tablesWithLinkedOrders = (tables: ITable[], orders: IDinerOrder[]) => {
    const find = (table: number) => {
      return orders.find((order: IDinerOrder) => order.table_id == table);
    };
    const restaurantFloor: RestaurantSquare[] = [];

    for (let i = 0; i < tables.length; i++) {
      var table: ITable = tables[i];
      
      var isOrder = find(table.connected_to || table.id);
      var configuredTable: RestaurantSquare = { config: table };

      if (isOrder) {
        configuredTable.order = isOrder;
      }
      restaurantFloor.push(configuredTable);
    }
    return restaurantFloor;
  };
   
  const navigate = useNavigate()

  if (action === "Order" && table) {
    navigate('/work_day/order', {
      state: {
        tableId: table.config.id,
        tableName: table.config.name,
        orderId:table.order?.id,
        currentTotal:table.order?.total}
    })
    setAction("")
  };

  if (!table && action === 'openTakeAway') {
    navigate('/work_day/order', {
      state: {
      tableId: "",
      tableName: "Take Away",}
    })
    setAction("")
  };
  
  const fetchFloor = async() => {
    const Odata: IDinerOrder[] = await getActiveOrders();
    const tables: ITable[] = await getDataTable();
    const FLdata = tablesWithLinkedOrders(tables, Odata);
    setFloorLayout(FLdata);
  }

  const fetchData = async () => {
    fetchFloor();
    const Mdata: any = getMenuData();
    setMenu(Mdata);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const allData: WorkDayContextType = {
    floorLayout: FloorLayout,
    fetchFloor: fetchFloor,
    Menu: Menu,
    setMenu: setMenu,
    table:table,
    setClickTableId: setClickTableId,
    setAction: setAction,
  };

  const unseatEmptyTable = async () => {
    await deleteOrder(table!.order?.id!);
    await unseatTable(table?.order?.table_id!);
    fetchFloor();
    closePopUp();
  };

  const unattachTable = async () => {
    table!.config.connected_to = null
    await updateTable(table!.config.id!, table!.config!);
    fetchFloor();
    closePopUp();
  };
  return (
    <WorkDayContext.Provider value={allData}>
      <Outlet />
      {table &&
        clickTableId &&
        (action === "seating" ? (
          <PopUp togglePop={closePopUp}>
            <Seating />
          </PopUp>
        ) : action === "OrderSummary" ? (
          <PopUp togglePop={closePopUp}>
            <OrderDetails clickTableId={clickTableId} />
          </PopUp>
        ) : action === 'unseatTable' ? (
          <PopUp togglePop={closePopUp}>
            <styled.confirmUnsetTable>
                 ? האם למחוק הזמנה 
              <styled.confirm
                onClick={() => {unseatEmptyTable()}}>
                  אישור
              </styled.confirm>
            </styled.confirmUnsetTable>
          </PopUp>
        ): action === 'unattachTable' ? (
          <PopUp togglePop={closePopUp}>
          <styled.confirmUnsetTable>
               ? האם לבטל הצמדה 
            <styled.confirm
              onClick={() => {unattachTable()}}>
                אישור
            </styled.confirm>
          </styled.confirmUnsetTable>
        </PopUp>
        ) : null)}

        {window.location.pathname === '/work_day' && (
          <styled.takeAwayButton onClick={goToPayTakeAway}>
            Take Away
          </styled.takeAwayButton>
        )}
    </WorkDayContext.Provider>
  );
};
export default WorkDay;
