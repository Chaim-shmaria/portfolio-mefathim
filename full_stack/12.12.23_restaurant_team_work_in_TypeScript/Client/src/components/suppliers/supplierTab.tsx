import { useNavigate, useParams } from "react-router-dom";
import * as style from "./supplierTab.styles";
import MyAutoComplete from "./autoCompleteSupplierTab";
import { useEffect, useState } from "react";
import { getActiveProducts } from "../../services/productService";
import {
  addSupplierProduct,
  deleteSupplierProduct,
  getByColumnSupplier,
  getSupplierProducts,
  updateSupplierProduct,
  getInventory,
} from "../../services/supplierService";
import { IInventory } from "@/dataTypes/inventory";
import { IProducts, ISupplier } from "../shared/table/Table.types";
import useCustomAlert from '../../Hooks/useAlert';
import useCustomConfirmation from "../../Hooks/useConfirm";
export type supplierProduct={
  [key:string]:string|number|boolean|undefined
  id:number,
  inventory_id:number,
  name:string,
  size:string,
  size_type?:string,
  price?:number,
  edit?:boolean,
  new?:boolean,
  mkt:number,
  supplier_products_id?:number
}
const SupplierTab = () => {

  const tableConfig: { [x: string]: any } = {
    business_number: { header: ".ח.פ", width: 1 },
    supplier_name: { header: "שם הספק", width: 1 },
    address: { header: "כתובת", width: 1 },
    phone_number: { header: "נייד איש קשר", width: 1 },
    email: { header: "מייל איש קשר", width: 2 },
    defaultSearch: "supplier_name",
  };
  const { id, collection: currentCollection } = useParams();
  const [current, setCurrent] = useState("products");
  const [products, setProducts] = useState([] as IProducts[]);
  const [currentSupplier, setCurrentSupplier] = useState({} as ISupplier);
  const [supplierProducts, setSupplierProducts] = useState([] as supplierProduct[]);
  const [inventory, setInventory] = useState({} as {[key:number]:string});
  const { showAlert, renderAlert } = useCustomAlert();
  const { renderConfirmation, showConfirmation } = useCustomConfirmation(); 

  
  useEffect(() => {
    primeFetch();
  }, []);
  const navigate = useNavigate();

  const keySupplierProducts = {
    mkt: 'מק"ט',
    name: "שם המוצר",
    inventory_name: "שם מלאי",
    size: "משקל אריזה",
    price: "מחיר",
  };

  const filterSupplierProducts = () => {
    let allIdSupProducts: number[] = [];
    supplierProducts.map((product: supplierProduct) => allIdSupProducts.push(product.id));
    let productFiltered = products.filter(
      (product: IProducts) => !allIdSupProducts.includes(product.id!)
    );
    return productFiltered;
  };

  const sizeTypes:any={
    1:"קילו",
    2:'ליטר'
  }

  const fetchSupplierProducts = () =>
    getSupplierProducts(id).then((supplierProducts) => {
      setSupplierProducts(supplierProducts);
    });

  const primeFetch = () => {
    getActiveProducts().then((products) => setProducts(products));
    fetchSupplierProducts();
    getInventory().then((inventory) => handleInventory(inventory));
    getByColumnSupplier("id", String(id)).then((supplier) =>
      setCurrentSupplier(supplier[0])
    );
  };
  const handleInventory = (allInventory: IInventory[]) => {
    let newInventory = {}as {[key:number]:string};
    allInventory.map((inventory: IInventory) => {
      newInventory[inventory.id] = inventory.name;
    });
    setInventory(newInventory);
  };

  const addProduct = (product: supplierProduct) => {
    let newProduct = { ...product };
    newProduct.price = 0;
    newProduct.size = sizeTypes[newProduct.size_type!]+" "+newProduct.size;
    newProduct.new = true;
    newProduct.edit = true;
    setSupplierProducts([...supplierProducts, newProduct]);
  };

  const changePrice = (newPrice: number, index: number) => {
    supplierProducts[index].price = newPrice;
    setSupplierProducts([...supplierProducts]);
  };

  const navigateOrders = (collection: string) => {
    if (currentCollection !== collection)
      navigate(`/manager/suppliers/${id}/${collection}`);
  };

  const activeEdit = (obj: supplierProduct) => {
    obj.edit = true;
    setSupplierProducts([...supplierProducts]);
  };

  const handleDelete = async(obj: supplierProduct, index: number) => {
    if (obj.new) {
    } else {
      if (await showConfirmation("?אתה בטוח שאתה רוצה למחוק")==true) {
        deleteSupplierProduct(obj.supplier_products_id!);
        showAlert("נמחק בהצלחה");
      }
    }
    supplierProducts.splice(index, 1);
    setSupplierProducts([...supplierProducts]);
  };

  const addEdit = async(object: supplierProduct) => {
    if (object.price! > 0) {
      let processProduct = {}as {[key: string]: string | number | undefined;
      };
      processProduct.product_id = object.id;
      processProduct.price = object.price;
      processProduct.supplier_id = id;
      showAlert(object.new ? "מוצר חדש התווסף" : "מוצר התעדכן");
      if (object.new) {
       const lastId:{data:number}= await addSupplierProduct(processProduct)
       object.supplier_products_id=lastId.data
        delete object.new;
      } else {
        updateSupplierProduct(object.supplier_products_id!, processProduct);
      }
      object.edit = false;
      setSupplierProducts([...supplierProducts]);
    } else {
      showAlert("מחיר לא תקין");
    }
  };


  return (
    <style.Screen>
      <style.WarpSupplierDetails>
        <style.SupplierDetails>
          {Object.values(tableConfig).map(({ header, width }) => {
            return <style.TabelCell width={width}>{header}</style.TabelCell>;
          })}
        </style.SupplierDetails>
        <style.SupplierDetails heder={true}>
          {currentSupplier &&
            Object.keys(tableConfig).map((key: string) => {
              return (
                <style.TabelCell width={tableConfig[key]["width"]}>
                  {currentSupplier[key]}
                </style.TabelCell>
              );
            })}
        </style.SupplierDetails>
      </style.WarpSupplierDetails>
      <style.TabHeader>
        <style.TabButton
          id="products"
          onClick={(e) => {
            navigateOrders(e.currentTarget.id);
            setCurrent("products");
          }}
          current={current === "products"}
        >
          מוצרים
        </style.TabButton>
        <style.TabButton
          id="orders"
          onClick={(e) => {
            navigateOrders(e.currentTarget.id);
            setCurrent("orders");
          }}
          current={current === "orders"}
        >
          הזמנות
        </style.TabButton>
        <style.TabButton
          onClick={() => setCurrent("deliver_sert")}
          current={current === "deliver_sert"}
        >
          ת.משלוח
        </style.TabButton>
        <style.TabButton
          onClick={() => setCurrent("bills")}
          current={current === "bills"}
        >
          חשבוניות
        </style.TabButton>
      </style.TabHeader>

      <style.SupplierTabs>
        {current!=='products'?<style.NotComplete>working on it...</style.NotComplete>:<>
        <style.AutoComplete>
          <MyAutoComplete
            olderData={filterSupplierProducts()}
            handleClick={addProduct}
          ></MyAutoComplete>
        </style.AutoComplete>
        <style.HederTable>
          {Object.values(keySupplierProducts).map((value: string) => {
            return <style.TabelCell width={1}>{value}</style.TabelCell>;
          })}
          <style.TabelCell width={1}></style.TabelCell>
        </style.HederTable>
        <style.SupplierProducts>
          {supplierProducts.map((object: supplierProduct, index: number) => {
            return (
              <style.TabelRow key={index}>
                {Object.keys(keySupplierProducts).map((key) => {
                  if (key === "price" && (object.edit || object.new))
                    return (
                      <style.TabelCell width={1}>
                        <style.InputPrice
                          type="number"
                          min={0}
                          value={Number(object[key])}
                          onChange={(e) => {
                            changePrice(Number(e.target.value), index);
                          }}
                        ></style.InputPrice>
                      </style.TabelCell>
                    );
                  return (
                    <style.TabelCell width={1}>
                      {key === "inventory_name"
                        ? inventory[object.inventory_id]
                        : object[key]}
                    </style.TabelCell>
                  );
                })}

                <style.TabelCell width={1}>
                  <style.DeleteButton
                    onClick={() => handleDelete(object, index)}
                  />
                  {object.edit || object.new ? (
                    <style.Submit
                      onClick={() => addEdit(object)}
                    ></style.Submit>
                  ) : (
                    <style.EditButton onClick={() => activeEdit(object)} />
                  )}
                </style.TabelCell>
              </style.TabelRow>
            );
          })}
        </style.SupplierProducts>
        </>}
      </style.SupplierTabs>
      {renderAlert()}
      {renderConfirmation()}
    </style.Screen>
  );
};
export default SupplierTab;
