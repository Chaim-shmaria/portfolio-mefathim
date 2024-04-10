import { useEffect, useState } from "react";
import { GenericTable } from "../shared/table/Table";
import { deleteData, getData, makeActive } from "../../services/productService";
import { IProducts } from "../shared/table/Table.types";
import PopUp from "../shared/popup/Popup";
import AddProduct from "./addProduct";
import { Inventory } from "../inventory/Inventory";
import useCustomConfirmation from "../../Hooks/useConfirm";

const Products = () => {
  const [productsData, setProductsData] = useState([] as IProducts[]);
  const [activeMode, setActiveMode] = useState(true);
  const [currentRow, setCurrentRow] = useState({} as any);
  const [seen, setSeen] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const { renderConfirmation, showConfirmation } = useCustomConfirmation();
  const handleAdd = () => {
    setIsAdd(true);
    setSeen(!seen);
  };

  const handleEdit = (row: object) => {
    setCurrentRow(row);
    setIsAdd(false);
    setSeen(!seen);
  };

  const fetchData = () => {
    getData().then((data) => {
      setProductsData(data);
    });
  };

  const handleDelete = async (id: number) => {
    if (await showConfirmation("?האם אתה בטוח שברצונך למחוק")==true) {
    await deleteData(id);
    fetchData();
    }
  };

  const makeActiveData = async (obj: any) => {
  delete obj.inventory_name;
  delete obj.size_and_type;
  console.log(obj)    
    await makeActive(obj);
    fetchData();
  };
  

  useEffect(() => {
    fetchData();
  }, [activeMode]);
  return (
    <div>
      {seen && (
        <PopUp togglePop={handleAdd}>
          {!isAdd ? (
            <AddProduct
              setSeen={handleAdd}
              fetchData={fetchData}
              currentProduct={currentRow}
              isAdd={isAdd}
            />
          ) : (
            <AddProduct
              setSeen={handleAdd}
              fetchData={fetchData}
              isAdd={isAdd}
            />
          )}
        </PopUp>
      )}
      {renderConfirmation()}
      {productsData && (
        <GenericTable
          props={{
            name: "מוצרים",
            values: productsData,
            onAdd: handleAdd,
            onDelete: handleDelete,
            onEdit: handleEdit,
            makeActiveData: makeActiveData,
            activeMode: activeMode,
            setMode: setActiveMode,
          }}
        />
      )}
    </div>
  );
};
export default Products;
