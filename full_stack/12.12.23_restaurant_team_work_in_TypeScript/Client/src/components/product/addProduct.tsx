import { useEffect, useState } from "react";
import { IInventory, IProducts, ISupplier } from "../shared/table/Table.types";
import * as Styled from "./addProduct.styles";
import {
  getOtherData,
  addProduct,
  updateProduct,
  updateLInkTable,
} from "../../services/productService";
import { getSupplierNamesForProduct } from "../../services/baseService";
import useCustomAlert from '../../Hooks/useAlert';

const AddProduct = (props: {
  setSeen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
  currentProduct?: any;
  isAdd: boolean;
}) => {
  const [suppliers, setSuppliers] = useState([] as ISupplier[]);
  const [inventory, setInventory] = useState([] as IInventory[]);
  const [productData, setProductData] = useState({} as IProducts);
  const [selecteSuppliersNames, setSelecteSuppliersNames] = useState([""]);
  const [productSuppliers, setProductSupplier] = useState<any>("");
  const { showAlert, renderAlert } = useCustomAlert();
  const updateMyData = async (
    tableName: string,
    setData: (value: React.SetStateAction<any[]>) => void
  ) => {
    getOtherData(tableName).then((data) => {
      setData(data);
    });
  };
  const DataToAdd = (product: IProducts, suppliers: any[]) => {
    return { product, suppliers };
  };
  console.log(productData);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newProduct = {
      name: productData.name,
      category: productData.category,
      inventory_id: productData.inventory_id,
      size: productData.size,
      n_unit: productData.n_unit,
      size_type: productData.size_type,
      mkt: productData.mkt,
      is_active: true,
    };
    if (props.isAdd) {
      addProduct(DataToAdd(productData, productSuppliers));
      showAlert("המוצר נוסף בהצלחה");
    } else {
      const supplierProductsArray = productSuppliers.map((supplier: any) => ({
        supplier_id: supplier.supplier_id,
        product_id: productData.id,
        price: supplier.price,
        category: productData.category,
      }));
      updateProduct(productData);
      updateLInkTable(supplierProductsArray);
      showAlert("המוצר עודכן בהצלחה");
    }
    props.fetchData();
    props.setSeen(false);
  };

  useEffect(() => {
    updateMyData("suppliers", setSuppliers);
    updateMyData("inventory", setInventory);
    if (!props.isAdd) {
      getSupplierNamesForProduct(props.currentProduct.id!)
        .then((data) => {
          setProductSupplier(data.rows);
        })
        .catch((error) => {
          console.error("Error fetching supplier names:", error.message);
        });
      setProductData({
        ...productData,
        name: props.currentProduct.name,
        category: props.currentProduct.category,
        inventory_id: props.currentProduct.inventory_id!,
        size: props.currentProduct.size!,
        n_unit: props.currentProduct.n_unit!,
        size_type: props.currentProduct.size_type,
        mkt: props.currentProduct.mkt!,
        is_active: true,
        id: props.currentProduct.id,
      });
    }
  }, []);

  const uniqueCategories = new Set();
  const uniqueObjects = inventory.filter((obj) => {
    if (!uniqueCategories.has(obj.category)) {
      uniqueCategories.add(obj.category);
      return true;
    }
    return false;
  });
  return (
    <Styled.Wrapper onSubmit={handleSubmit}>
      {renderAlert()}
      <Styled.Header>
        {props.isAdd ? "מוצר חדש" : "ערוך מוצר"}
        <Styled.Cancel onClick={() => props.setSeen(false)}>x</Styled.Cancel>
      </Styled.Header>
      <Styled.Data>
        <Styled.DataLeft>
          <Styled.Product>
            <Styled.Row2>
              <Styled.Input
                required={true}
                id="mkt"
                type="number"
                width={64}
                placeholder="הזן מספר "
                value={productData.mkt}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    mkt: Number(e.target.value),
                  })
                }
              ></Styled.Input>
              :מק"ט
            </Styled.Row2>
            <Styled.Row2>
              <Styled.Input
                required={true}
                id="name"
                type="text"
                width={64}
                placeholder="הזן שם"
                value={productData.name}
                onChange={(e) =>
                  setProductData({ ...productData, name: e.target.value })
                }
              ></Styled.Input>
              :שם המוצר
            </Styled.Row2>
            <Styled.Row2>
              <Styled.Input
                required={true}
                width={65}
                id="category"
                disabled={true}
                placeholder="אנא בחר מלאי"
                value={productData.category}
              ></Styled.Input>
              :קטגוריה
            </Styled.Row2>
            <Styled.Row2>
              <Styled.Option
                required={true}
                id="inventory_name"
                width={66}
                value={
                  inventory?.find(({ id }) => id === productData?.inventory_id)
                    ?.name
                }
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    category: inventory.find(
                      ({ name }) => name === e.target.value
                    )!.category,
                    inventory_id: inventory.find(
                      ({ name }) => name === e.target.value
                    )!.id,
                    size_type: inventory.find(
                      ({ name }) => name === e.target.value
                    )!.size_type,
                  })
                }
              >
                <option disabled selected hidden>
                  בחר
                </option>
                {inventory && productData.category
                  ? inventory
                      .filter(
                        ({ category }) => category === productData.category
                      )
                      .map((inventory) => {
                        return (
                          <option key={inventory.name} value={inventory.name}>
                            {inventory.name}
                          </option>
                        );
                      })
                  : inventory.map((inventory) => {
                      return (
                        <option key={inventory.name} value={inventory.name}>
                          {inventory.name}
                        </option>
                      );
                    })}
              </Styled.Option>
              :שם מלאי
            </Styled.Row2>
          </Styled.Product>
          <Styled.Suppliers>
            <Styled.Row height={20}>
              <Styled.Field width={15}></Styled.Field>
              <Styled.Field width={60}>:מחיר</Styled.Field>
              <Styled.Field width={25}>:ספק</Styled.Field>
            </Styled.Row>
            <Styled.SelectedSuppliers>
              {productSuppliers &&
                productSuppliers.map((supplier: any, index: any) => {
                  return (
                    <Styled.Row height={44}>
                      <Styled.Field width={8}>
                        <Styled.DeleteButton
                          onClick={() => {
                            productSuppliers.splice(index, 1);
                            setProductData({
                              ...productData,
                              suppliers: productSuppliers,
                            });
                          }}
                        />
                      </Styled.Field>
                      <Styled.Input
                        required={true}
                        id={`${index}.price`}
                        type="number"
                        step="0.01"
                        placeholder="הזן מחיר"
                        width={25}
                        value={supplier.price}
                        onChange={(e) => {
                          const copy = [...productSuppliers];
                          copy[index].price = Number(e.target.value);
                          setProductSupplier(copy);
                        }}
                      ></Styled.Input>
                      <Styled.Input
                        id={`${index}.name`}
                        width={60}
                        disabled={true}
                        value={supplier.supplier_name}
                      ></Styled.Input>
                    </Styled.Row>
                  );
                })}
            </Styled.SelectedSuppliers>
            <Styled.Row height={20}>
              <Styled.Field width={7}></Styled.Field>
              {suppliers && (
                <Styled.Option
                  required={true}
                  width={55}
                  id="selectedSupplier"
                  onChange={(e) => {
                    if (productSuppliers) {
                      setProductSupplier((prevArray: any) => [
                        ...prevArray,
                        {
                          supplier_name: e.target.value,
                          supplier_id: suppliers.find(
                            ({ supplier_name }) =>
                              supplier_name === e.target.value
                          )!.id,
                        },
                      ]);
                    } else {
                      setProductSupplier(() => [
                        {
                          supplier_name: e.target.value,
                          id: suppliers.find(
                            ({ supplier_name }) =>
                              supplier_name === e.target.value
                          )!.id,
                        },
                      ]);
                    }
                  }}
                >
                  <option disabled selected hidden>
                    בחר
                  </option>
                  {suppliers &&
                    suppliers
                      // .filter(
                      //   (supplier) =>
                      //     !selecteSuppliersNames?.includes(
                      //       supplier.supplier_name
                      //     )
                      // )
                      .map((supplier) => {
                        return (
                          !productSuppliers?.includes(
                            supplier.supplier_name
                          ) && (
                            <option value={supplier.supplier_name}>
                              {supplier.supplier_name}
                            </option>
                          )
                        );
                      })}
                </Styled.Option>
              )}
              <Styled.Field width={5}></Styled.Field>
              <Styled.Field width={20}>:ספק</Styled.Field>
            </Styled.Row>
          </Styled.Suppliers>
        </Styled.DataLeft>
        <Styled.DataRight>
          <Styled.imageText>
            <h1>תמונה לא זמינה</h1>
          </Styled.imageText>
          {/* <Styled.Picture /> */}
          <Styled.Amount>
            <Styled.Row2 width={100}>
              <Styled.Input
                required={true}
                id="n_unit"
                type="number"
                placeholder="הזן מספר"
                min={1}
                width={35}
                value={productData.n_unit}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    n_unit: Number(e.target.value),
                  })
                }
              ></Styled.Input>
              <Styled.Field width={50}>:מספר יחידות</Styled.Field>
            </Styled.Row2>
            <Styled.Row2 width={100}>
              <Styled.Input
                required={true}
                id="size"
                type="number"
                step="0.01"
                placeholder="הזן מספר"
                min={1}
                width={35}
                value={productData.size}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    size: Number(e.target.value),
                  })
                }
              ></Styled.Input>
              <Styled.Field width={48}>:משקל / נפח</Styled.Field>
            </Styled.Row2>
            <Styled.Row2 width={100}>
              <Styled.Input
                required={true}
                width={36}
                id="size_type"
                disabled={true}
                value={productData.size_type}
              ></Styled.Input>
              <Styled.Field width={40}>:סוג גודל</Styled.Field>
            </Styled.Row2>
          </Styled.Amount>
        </Styled.DataRight>
      </Styled.Data>
      <Styled.Submit type="submit">
        {props.isAdd ? "הוסף מוצר" : "עדכן מוצר"}
      </Styled.Submit>
    </Styled.Wrapper>
  );
};
export default AddProduct;
