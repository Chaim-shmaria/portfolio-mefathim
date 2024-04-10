import * as styles from "./AddDish.styled";
import React, { useState, useEffect } from "react";
import { getDishWithInentories, navigateData } from "../../services/menuService";
import { IDish, IdishCategory } from "@/dataTypes/dish";
import { getInventoryData } from "../../services/inventoryService";
import ProductNameField from "./Autocomplete";
import { IInventory, dishInventory } from "@/dataTypes/inventory";
import { getCategories } from "../../services/dishesCategoriesService";

// ugly but works
const size_types: {[x: string]: any;} = {"1": 'ליטר', "2":'קילו'}
const AddEditDish = ({
  editDish,
  closePop,
}: {
  editDish: IDish;
  closePop: () => void;
}) => {
  const [addNewDish, setAddNewDish] = useState<IDish>(
    editDish || ({} as IDish)
  );
  const [disInventories, setDishInventories] = useState<dishInventory[]>(
    ([] as dishInventory[])
  );
  const [inventorysData, setInventorysData] = useState<IInventory[]>([]);
  const [categories, setCategories] = useState<IdishCategory[]>([]);
  const handleAddProductRow = () => {
    setDishInventories((prevProducts) => [
      ...prevProducts,
      {
        id: null,
        dish_id: "",
        inventory_id: 0,
        inventory_name: "",
        type: "",
        quantity: 0.01,
        necessary: true,
      },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    setDishInventories((prevProducts) => {
      const newArr = [...prevProducts];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  const handleinputFields = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setAddNewDish((prevDish) => ({
      ...prevDish,
      [e.target.name]: e.target.value,
    }));
  };

  const dropDownList: () => IInventory[] = () => {
    let list = [];

    if (disInventories.length === 0) {
      list = [...inventorysData];
    } else {
      list = inventorysData.filter((item) => {
        return !disInventories.some((inv) => inv.inventory_id == item.id);
      });
    }

    return list as IInventory[];
  };
  console.log(disInventories)

  const handlOnChangeFieldName = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    setDishInventories((prevProducts) => {
      const newProduct = [...prevProducts];
      newProduct[index].inventory_name = value;

      const matchingProduct = inventorysData.find(
        (item) => item.name === value
      );

      if (matchingProduct) {
        newProduct[index].type = matchingProduct.size_type;
        newProduct[index].inventory_id = matchingProduct.id;
      }
      return newProduct;
    });
  };

  const handleQuantityField = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const selectedProduct: number = parseFloat(e.target.value);

    setDishInventories((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts[index].quantity = selectedProduct;

      return newProducts;
    });
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setDishInventories((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts[index].necessary = e.target.checked;

      return newProducts;
    });
  };

  const errorMsg = (): boolean => {
    const errorMessages: string[] = [];

    const addError = (message: string, index?: number) => {
      errorMessages.push(index ? `${message} בשורה ${index}` : message);
    };

    !addNewDish.name && addError("הוסף שם מוצר");
    (addNewDish.category === "בחר:" || !addNewDish.category_id) &&
      addError("בחר קטגוריה");
    !addNewDish.price && addError("נא הכנס מחיר");
    !addNewDish.description && addError("נא הכנס תיאור מוצר");
    (!disInventories || disInventories.length === 0) && addError("נא הוסף רכיב");

    disInventories.forEach((element, index) => {
      !element.inventory_name && addError("חסר שם רכיב", index + 1);
      !element.quantity && addError("חסר כמות רכיב", index + 1);
    });

    if (errorMessages.length > 0) {
      alert(errorMessages.join("\n"));
      return false;
    }

    return true;
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (errorMsg()) {
      try {
        await navigateData(addNewDish, disInventories);
        closePop();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleCancel: React.MouseEventHandler<HTMLButtonElement> = () => {
    closePop();
  };

  const handleScroll: () => boolean = () => {
    if (disInventories.length >= 5) {
      return true;
    }
    return false;
  };

  const fetchCategories = async () => {
    try {
      let fetchedCategories: IdishCategory[] = await getCategories();
      fetchedCategories.sort((a, b) => a.id - b.id);
      await setCategories(fetchedCategories);

      !editDish.id && setAddNewDish((prevProducts) => {
        const newProduct: IDish = { ...prevProducts };
        newProduct.category_id = 0;
        return newProduct;
      });
    } catch (error) {
      console.error("שגיאה בקבלת הקטגוריות:", error);
    }
  };
  const fetchInventoryData = async () => {
    try {
      const data = await getInventoryData();
      setInventorysData(data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const fetchDishInventories = async() => {
      let data = await getDishWithInentories(editDish.id)
      setDishInventories(data.inventories)
  }

  useEffect(() => { 
    fetchInventoryData();
    fetchCategories();
    editDish.id && fetchDishInventories()
  }, []);

  return (
    <styles.MainWrapper className="AddDish">
      <styles.BoxTitle>
        <styles.Title className="title">{editDish.id? 'עריכה': 'הוספת מנה חדשה:'} </styles.Title>
        {/* <styles.AddPictureButton name="picture">
          + הוסף תמונה
        </styles.AddPictureButton> */}
      </styles.BoxTitle>
      <styles.DetailsBox>
        <styles.TextDetailsBox>
          <styles.TextBoxDish>שם:</styles.TextBoxDish>
          <styles.TextBoxDish>קטגוריה:</styles.TextBoxDish>
          <styles.TextBoxDish>מחיר:</styles.TextBoxDish>
        </styles.TextDetailsBox>
        <styles.FiledDetailsBox>
          <styles.DetailsFields
            className="name"
            name="name"
            type="text"
            value={addNewDish.name}
            onChange={handleinputFields}
          />
          <styles.DetailsFields
            className="category"
            as="select"
            name="category_id"
            value={addNewDish.category_id}
            onChange={handleinputFields}
          >
            <option value={""}>בחר:</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </styles.DetailsFields>

          <styles.DetailsFields
            className="price"
            name="price"
            type="number"
            value={addNewDish.price === 0 ? "" : addNewDish.price}
            min={0}
            onChange={handleinputFields}
          />
        </styles.FiledDetailsBox>
      </styles.DetailsBox>
      <styles.BoxProducts>
        <h3>רכיבים:</h3>
        <styles.TextProductBox>
          <styles.TextBoxProduct>שם</styles.TextBoxProduct>
          <styles.TextBoxProduct className="quantity">
            כמות
          </styles.TextBoxProduct>
          <styles.TextBoxProduct className="nessery">
            חובה
          </styles.TextBoxProduct>
          <styles.TextBoxProduct className="del">מחק</styles.TextBoxProduct>
        </styles.TextProductBox>

        <styles.MainProductFieldBox size={handleScroll()}>
          {disInventories.map((product, index) => (
            <styles.ProductFieldBox key={index}>
              <ProductNameField
                value={product.inventory_name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handlOnChangeFieldName(e, index);
                }}
                placeholder="חפש מוצר"
                options={dropDownList()}
                display={disInventories}
              />

              <styles.ProductQuantityField
                type="number"
                step="0.25"
                min={0.01}
                value={product.quantity || 0}
                onChange={(e) => {
                  handleQuantityField(e, index);
                }}
              />
              <styles.TypeBox>
                {inventorysData.length > 0 &&
                  disInventories[index].inventory_name &&
                  inventorysData
                    .filter(
                      (item) => item.name === disInventories[index].inventory_name
                    )
                    .map((filteredItem) => size_types[filteredItem.size_type])}
              </styles.TypeBox>

              <styles.CheckBox
                type="checkBox"
                checked={product.necessary}
                onChange={(e) => {
                  handleCheckboxChange(e, index);
                }}
              />
              <styles.RemoveRow onClick={() => handleRemoveRow(index)}>
                X
              </styles.RemoveRow>
            </styles.ProductFieldBox>
          ))}
        </styles.MainProductFieldBox>
      </styles.BoxProducts>
      <styles.AddProductButton onClick={handleAddProductRow}>
        הוסף רכיב
      </styles.AddProductButton>
      <styles.DesceptionsBox>
        <styles.TextBoxDish className="description">תיאור:</styles.TextBoxDish>
        <styles.DesceptionsField
          name="description"
          onChange={handleinputFields}
          value={addNewDish.description}
        />
      </styles.DesceptionsBox>
      <styles.ButtonBox>
        <styles.SubmitButton onClick={handleSubmit}>שמור</styles.SubmitButton>
        <styles.cancelButton onClick={handleCancel}>ביטול</styles.cancelButton>
      </styles.ButtonBox>
    </styles.MainWrapper>
  );
};

export default AddEditDish;
