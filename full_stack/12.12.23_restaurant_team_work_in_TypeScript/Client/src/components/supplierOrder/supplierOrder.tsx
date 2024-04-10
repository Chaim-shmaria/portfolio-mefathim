import {
  getData,
  addData,
  deleteData,
  updateData,
  makeActive,
  getActiveSupplierOrder,
} from "../../services/supplierOrderService";
import { useEffect, useState } from "react";
import { GenericTable } from "../shared/table/Table";
import AddOrder from "./popupForAddAndEdit/addPopUp";
import EditOrder from "./popupForAddAndEdit/editPopUp";
import { IsupplierOrder } from "@/dataTypes/supplyOrder";


const SupplierOrder = () => {
  const [supplierData, setSupplierData] = useState([]);
  const [activeMode, setActiveMode] = useState(true);
  const [data, setData] = useState<any>();
  const [addItem, setAddItem] = useState(false);
  const [editItem, setEditItem] = useState(false);



  const fetchData = () => {
    if (activeMode)
    getActiveSupplierOrder().then((data) => {
      setSupplierData(data);
      
    });
    else
      getData().then((data) => {
        setSupplierData(data);
      });
  };

  const handleEdit = (obj: IsupplierOrder) => {
    setEditItem(!editItem);
    setData(obj);
  };

  const handleDelete = (id: number) => {
    deleteData(id)?.then(() => fetchData());
  };

  const toggle = () => {
    setAddItem(!addItem);
  };

  const toggleEdit = () => {
    setEditItem(!editItem);
  };

  const makeActiveData = async (obj: any) => {
    await makeActive(obj);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [activeMode]);
  return (
    <>

      {addItem && <AddOrder fetchOrder={fetchData} toggle={toggle}></AddOrder>}

      {editItem && (
        <EditOrder
          fetchOrder={handleEdit}
          toggle={toggleEdit}
          data={data}
          fetchData={fetchData}
        ></EditOrder>
      )}

      <GenericTable
      
        props={{
          name: "הזמנות",
          values: supplierData,
          onAdd: toggle,
          onDelete: handleDelete,
          onEdit: handleEdit,
          activeMode: activeMode,
          setMode: setActiveMode,
          makeActiveData: makeActiveData,
        }}
        
      />

      </>
  );
};

export default SupplierOrder;
