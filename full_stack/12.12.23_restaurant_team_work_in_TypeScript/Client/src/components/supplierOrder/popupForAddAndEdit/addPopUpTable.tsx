import React, { useState, useEffect } from "react";
import * as Styled from "./addPopUpTable.styles";
import * as configJson from "../../shared/table/table.config.json";
import * as types from "./popupTypes";
import { ISupplierOrder } from "../../shared/table/Table.types";
import {
  getDataForNewOrder,
  addDataToOrderTables,
} from "../../../services/supplierOrderService";
import { getData } from "../../../services/productService";
import MyAutoComplete from "./addPopUpAutoComplete";
import * as Styledd from "./addPopUp.styles";
import AlertTitle from "@mui/material/AlertTitle";

import { OrderButton, suppliersInOrder, sumTotal } from "./addPopUp.styles";
import { Alert } from "@mui/material";
import useCustomConfirmation from "../../../Hooks/useConfirm";

const OrderTable: React.FC<{ props: types.ProductOrder }> = ({ props }) => {
  const json = configJson;
  const tableConfig: { [x: string]: any } = json["הזמנה חדשה"];
  const [productsData, setProductsData] = useState<ISupplierOrder[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);
  const [showSuccessOrder, setShowSuccessOrder] = useState<boolean>(false);
  const [numOfSuppliers, setNumOfSuppliers] = useState<number>(0);
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [minOrder, setMinOrder] = useState("");
  const { renderConfirmation, showConfirmation } = useCustomConfirmation(); 


  const handleNewProductData = (data: any, id: any) => {
    const { name, mkt, size_type } = data.product;
    const suppliers = data.suppliers;


    const result = {
      name,
      mkt,
      size_type,
      product_id: id,
      suppliers: suppliers,
      // supplier_id: ,
      amount: 1,
      sum: 0,
    };
    setDisplayData([...displayData, result]);
  };

  const fetchData = () => {
    getData().then((data: ISupplierOrder[]) => {
      setProductsData(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);



  const updateSumsInText = () => {
    setTotalSum(calculateTotalSum());
    setNumOfSuppliers(updateNumOfSuppliers());
  };

  const updateNumOfSuppliers = () => {
    const array = displayData.map((element: any) => element.supplier_id);
    let uniqueSet = new Set(array);
    return uniqueSet.size;
  };
  const calculateTotalSum = () => {
    return displayData.reduce((sum: number, item: any) => sum + item.sum, 0);
  };

  useEffect(updateSumsInText, [displayData]);

  const handleSelectedProduct = (id: any) => {
    let alreadySuppliers;
    getDataForNewOrder(id).then((data) => {
      handleNewProductData(data, id);
    });
  };

  const handleAmountOfProduct = (e: any, index: number) => {
    if (displayData[index].supplier_id) {
      if (minOrder) {
        setMinOrder("");
      }
      let parseAmount = parseInt(e);
      const findSupplier = displayData[index].suppliers.find(
        (supplier: any) => supplier.id == displayData[index].supplier_id
      );

      const updatedDisplayData = [...displayData];
      updatedDisplayData[index].amount = parseAmount;
      updatedDisplayData[index].sum =
        parseAmount * findSupplier.price > 0
          ? parseAmount * findSupplier.price
          : 0;
      setDisplayData(updatedDisplayData);
    }
  };

  const handleDeleteRow = async(index: number) => {
    if (minOrder) {
      setMinOrder("");
    }else if (await showConfirmation("?האם אתה בטוח שברצונך למחוק")==true) {
    const updatedDisplayData = [...displayData];
    updatedDisplayData.splice(index, 1);
    setDisplayData(updatedDisplayData);}
  };

  const handleOrderButton = async () => {
    if (displayData.length>0&&displayData[0].supplier_id) {
      try {

        let minError = await addDataToOrderTables(dataToSend(displayData));
        if (!minError) {
          setShowSuccessOrder(true);
          setTimeout(() => {
            props.handleToggle();
            props.fetchOrders();
          }, 2000);
        } else {
          setMinOrder(minError);
        }
      } catch (error) {}
    }
  };

  const handleChoosenSupplier = (id: string, index: number) => {
    let parseId = parseInt(id);
    let displayDataTemp = [...displayData];

    const findSupplier = displayData[index].suppliers.find(
      (supplier: any) => supplier.id == parseId
    );
    displayDataTemp[index].sum =
      displayDataTemp[index].amount * findSupplier.price;
    displayDataTemp[index].supplier_id = parseId;
    setDisplayData(displayDataTemp);
  };

  const dataToSend = (data: any) => {
    return data.map((obj: any) => {
      const { amount, sum, supplier_id, product_id } = obj;

      return { amount, sum, supplier_id, product_id };
    });
  };

  const checkUniqe = (currentIndex: number, currentSupplier: any) => {
    const currentObj = displayData[currentIndex];
    displayData.map((obj: any, index: number) => {
      if (
        currentIndex !== index &&
        currentObj.product_id === obj.product_id &&
        obj.supplier_id === Number(currentSupplier)
      ) {
        displayData[index].amount += Number(displayData[currentIndex].amount);
  

        displayData.splice(currentIndex, 1);

        setDisplayData([...displayData]);
        handleAmountOfProduct(displayData[index].amount, index);
      }
    });
  };

  return (
    <Styled.Page>
      {renderConfirmation()}
      <Styled.CloseIcon onClick={props.handleToggle} />
      <Styled.PageMode>
        <Styled.Search>
          <MyAutoComplete
            olderData={productsData}
            handleClick={handleSelectedProduct}
          />
        </Styled.Search>
        <Styled.TableHeader>הזמנה חדשה</Styled.TableHeader>
      </Styled.PageMode>
      <Styled.TabelHeader>
        {Object.values(tableConfig).map(({ header, width }) => (
          <Styled.TabelCell key={header} width={width}>
            {header}
          </Styled.TabelCell>
        ))}
        <Styled.TabelCell width={1}></Styled.TabelCell>
      </Styled.TabelHeader>
      <Styled.TableContainer>
        {displayData.map((object: any, index: number) => (
          <Styled.TabelRow key={index}>
            <Styled.TabelCell width={1}>{object.mkt}</Styled.TabelCell>
            <Styled.TabelCell width={1}>{object.name}</Styled.TabelCell>
            <Styled.TabelCell width={1.2}>
              {object.suppliers.name}
              <Styled.SelectCell>
                <Styled.Select
                  value={object.supplier_id}
                  onChange={(e) => {
                    handleChoosenSupplier(e.target.value, index);
                    checkUniqe(index, e.target.value);

                    minOrder && setMinOrder("");
                  }}
                >
                  <option hidden selected disabled>
                    בחר ספק
                  </option>

                  {object.suppliers.map((supplier: any) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}: {supplier.price}
                    </option>
                  ))}
                </Styled.Select>
              </Styled.SelectCell>
            </Styled.TabelCell>
            <Styled.TabelCell width={1}>{object.size_type}</Styled.TabelCell>
            <Styled.TabelCell width={1}>
              <Styled.amountCell
                type="number"
                value={object.amount}
                onChange={(e) => handleAmountOfProduct(e.target.value, index)}
                min={1}
              ></Styled.amountCell>
            </Styled.TabelCell>
            <Styled.TabelCell width={1}>{object.sum}</Styled.TabelCell>
            <Styled.TabelCell width={1}>
              <Styled.DeleteButton onClick={() => handleDeleteRow(index)} />
            </Styled.TabelCell>
          </Styled.TabelRow>
        ))}
      </Styled.TableContainer>

      <Styledd.minError> {minOrder}</Styledd.minError>
      <Styledd.buttonAndText>
        <OrderButton onClick={handleOrderButton}>הזמן</OrderButton>
        <Styledd.sumTotal> {totalSum} :סה"כ </Styledd.sumTotal>
        <Styledd.suppliersInOrder>
          {numOfSuppliers} :מספר ספקים בהזמנה זו
        </Styledd.suppliersInOrder>
      </Styledd.buttonAndText>

      {showSuccessOrder && (
        <Styled.Popup>
          <Styled.pop>
            <Styled.message>!הזמנתך התקבלה בהצלחה</Styled.message>
          </Styled.pop>
        </Styled.Popup>
      )}
    </Styled.Page>
  );
};

export default OrderTable;
