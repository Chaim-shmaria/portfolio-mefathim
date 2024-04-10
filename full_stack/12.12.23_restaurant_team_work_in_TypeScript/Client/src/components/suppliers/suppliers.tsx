import {
  getAllSuppliers,
  deleteRow,
  getSupplierByColumn,
  checkSupplier,
  makeActive,
  getActiveSupplier,
} from "../../services/supplierService";
import { useState, useEffect } from "react";
import { GenericTable } from "../shared/table/Table";
import AddSupplier from "./addSupplier";
import { ISupplier } from "../../components/shared/table/Table.types";
import PopUp from "../shared/popup/Popup";
import { useNavigate } from "react-router-dom";
import useCustomAlert from '../../Hooks/useAlert';
import useCustomConfirmation from "../../Hooks/useConfirm";



export const Suppliers = () => {
  const [rows, setRows] = useState<ISupplier[]>([]);
  const [showComponent, setShowComponent] = useState<boolean>(false);
  const [currentSupplier, setCurrentSupplier] = useState<ISupplier>();
  const [newSupplier, setnewSupplier] = useState<boolean>();
  const [activeMode, setActiveMode] = useState<boolean>(true);
  const navigate = useNavigate();
  const { showAlert, renderAlert } = useCustomAlert();
  const { renderConfirmation, showConfirmation } = useCustomConfirmation(); 



  const fetchData = () => {
    if (activeMode) {
      getActiveSupplier().then((data: ISupplier[]) =>
        setRows(data)
      );
    } else {
      getAllSuppliers().then((data: ISupplier[]) => setRows(data));
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeMode]);

  const deleteSupplier = async (id: number | undefined) => {
    const check = await checkSupplier(id!);
    if (!check.data.delete) {
      showAlert(
        `לא ניתן למחוק ספק  \nקיימות הזמנות פתוחות עבור ספק זה \n מס' הזמנה : ${check.data.openOrders}`
      );
    } else {
      if (await showConfirmation("?האם אתה בטוח שברצונך למחוק את הספק") == true) {
        await deleteRow(id!);
        fetchData();
      }
    }
  };

  const addSupplier = () => {
    setShowComponent(true);
    setnewSupplier(true);
    setCurrentSupplier({
      business_number: "",
      supplier_name: "",
      contact_name: "",
      email: "",
      address: "",
      phone_number: "",
      min_order: 0,
      is_active: true,
    });
  };
  const makeActiveData = async (obj: any) => {
    await makeActive(obj);
    fetchData();
  };
  const updateSupplier = (object: ISupplier) => {
    setShowComponent(true);
    setnewSupplier(false);
    setCurrentSupplier(object);
  };
  const toggle = () => {
    setShowComponent(!showComponent);
  };
  const navigateToTabs =(obj:ISupplier) => {
      navigate(`/manager/suppliers/${obj.id}/products`)
    
  };

  return (
    <div>
      {showComponent && (
        <PopUp togglePop={toggle}>
          <AddSupplier
            fetchData={fetchData}
            showComponent={showComponent}
            setShowComponent={setShowComponent}
            currentSupplier={currentSupplier!}
            setCurrentSupplier={setCurrentSupplier}
            newSupplier={newSupplier}
            setnewSupplier={setnewSupplier}
            showAlert={showAlert}
          />
        </PopUp>
      )}
      {renderAlert()}
      {renderConfirmation()}
      <GenericTable
        props={{
          name: "ספקים",
          values: rows,
          onAdd: addSupplier,
          onDelete: deleteSupplier,
          onEdit: updateSupplier,
          activeMode: activeMode,
          setMode: setActiveMode,
          makeActiveData: makeActiveData,
          clickRow:navigateToTabs
        }}
      />
    </div>
  );
};
