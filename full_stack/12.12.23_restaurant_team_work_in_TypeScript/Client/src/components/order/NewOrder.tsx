import React, { useEffect, useState } from "react";
import * as styled from "./NewOrder.styles";
import OrderDishCard from "../../components/order/OrderDishCard";
import MetaDishCard from "../menu/metaDishCard/MetaDishCard";
import { getMenuData } from "../../services/menuService";
import { details, IDish, IdishCategory, orderDish } from "@/dataTypes/dish";
import {
  addReduceAvailability,
  returnAvailability,
} from "../../services/dinerOrderDishesService";

import PayOrder from "./PayOrder";
import PopUp from "../shared/popup/Popup";
import WorkDayContext from "../workDay/WorkDayContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import PrintComponent from "../shared/printer/print";
import OrderSlip from "./orderSlip";
import { getCategories } from "../../services/dishesCategoriesService";
import {addOrder, updateOrder} from "../../services/dinerOrdersService"
import { IFull } from "@/dataTypes/dinerOrder";


const PlaceAnOrder = () => {
  const location = useLocation();
  const { tableId, tableName, orderId, currentTotal } = location.state;
  const { setClickTableId, setAction} = useContext(WorkDayContext);
  const [currentDish, setCurrentDish] = useState<IDish>({} as IDish);
  const [orderDishes, setOrderDishes] = useState<orderDish[]>([]);
  const [categories, setCategories] = useState<IdishCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [payTakeAway, setPayTakeAway] = useState(false);
  const [menuData, setMenuData] = useState<IDish[]>([]);
  const [sendToKitchenPop, setSendToKitchenPop] = useState(false);
  const [editOrder, setEditOrder] = useState<details | undefined>();
  const [orderData, setOrderData] = useState<IFull>({order: {
    table_id: tableId || null, table_name: tableName }} as IFull)

  const totalPayment = orderDishes.reduce((acc, curr) => acc + curr.total, 0);

  useEffect(() => {
    if (!tableId && tableName !== "Take Away") {
      window.alert("שולחן לא קיים");
      window.location.href = "/work_day";
    }
  }, [tableId, tableName]);

  const togglePayTakeAway = () => {
    setPayTakeAway(!payTakeAway);
  };
  const togglesendToKitchenPop = () => {
    setSendToKitchenPop(!sendToKitchenPop);
  };
  const sendDishData = async (id: number, dishData: { dish: {} }) => {
    try {
      const calculateInstock = await addReduceAvailability(id, dishData);
      if (calculateInstock.status === 200) {
        console.log("res:", calculateInstock.data);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const returnAvailabilityCondition = async (dishes: orderDish[]) => {
    try {
      const updatedDishes = dishes.map((dish) => ({ ...dish, state: false }));

      const data = await returnAvailability(updatedDishes);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  const submit = async () => {
    if (tableName === "Take Away") {
      if(!orderData.order.id){
        const orderResponse = await addOrder(orderData);
        setOrderData(
          {
            order: {...orderData.order, id: orderResponse.newDishId},
            dishes: orderData.dishes
          });
      } else{
        updateOrder(orderData.order.id, orderData)
      }    
      togglePayTakeAway();
    } else {
      const totaltopay = totalPayment + currentTotal;
      await updateOrder(orderId, {order: { total: totaltopay}, dishes: orderDishes });
      togglesendToKitchenPop();
    } 
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(Number(event.target.value));
  };

  const updateInventory = async (newDishData: orderDish, add: boolean) => {
    try {
      const updatedDish = { ...newDishData, state: add };
      await sendDishData(updatedDish.dish_id, { dish: updatedDish });
      fetchData();
    } catch (error) {
      console.error("Error updating in_stock:", error);
    }
  };

  const onAddRow = (newDishData: orderDish) => {
    const newOrderDishes = [...orderDishes, newDishData];
    setOrderDishes(newOrderDishes);
    updateInventory(newDishData, true);
    setCurrentDish({} as IDish);
    onUpdateData(newOrderDishes)
  };

  /**maintain orderData for take away flow */
  const onUpdateData = (newOrderDishes: orderDish[]) => {
    const totalPayment = newOrderDishes.reduce((acc, curr) => acc + curr.total, 0);
    setOrderData(
    {order: {...orderData.order, total: totalPayment},
    dishes: newOrderDishes
    });
};

  const handleDelete = async (indexToDelete: number) => {
    try {
      const updatedOrders = [...orderDishes];
      updateInventory(orderDishes[indexToDelete], false);
      updatedOrders.splice(indexToDelete, 1);
      setOrderDishes(updatedOrders);
    } catch (error) {
      console.error("Error updating in_stock:", error);
    }
  };

  const onEditRow = (details: orderDish) => {
    var toEdit = orderDishes.find((_dish) => _dish.dish_id === details.dish_id);
    let amountForInventoryUpdate = details.amount - toEdit!.amount
    if (toEdit) {
      toEdit.amount = details.amount;
      toEdit.total = details.total;
      toEdit.notes = details.notes;
    }
    onUpdateData(orderDishes)
    setCurrentDish({} as IDish);
    updateInventory(
      {...details, amount: amountForInventoryUpdate}, 
      Boolean(amountForInventoryUpdate)
      );
    setEditOrder(undefined);
  };

  const handleRowClick = (
    dish: orderDish,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target instanceof HTMLButtonElement && e.target.name === "delete")
      return;
    var dishData: any = menuData.find((_dish) => _dish.id === dish.dish_id);
    setCurrentDish(dishData);
    var details: details = {
      amount: dish.amount,
      notes: dish.notes,
      total: dish.total,
    };
    setEditOrder(details);
  };

  const handleCardClick = (dish: IDish) => {
    dish.in_stock && setCurrentDish(dish);
  };

  const fixedNumber = (number: Number) => {
    const fixNum = parseFloat(String(number)).toFixed(2);
    return Number(fixNum);
  };
  
  const resetState = () => {
    setClickTableId(null);
    setAction("");
    returnAvailabilityCondition(orderDishes);
  };

  const fetchData = async () => {
    try {
      const data = await getMenuData();
      setMenuData(data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      let fetchedCategories: IdishCategory[]= await getCategories();
      fetchedCategories.sort((a, b) => a.id - b.id);
      setCategories(fetchedCategories);
      setSelectedCategory(1);
    } catch (error) {
      console.error("שגיאה בקבלת הקטגוריות:", error);
    }
  };

  useEffect(() =>{
    fetchData();
    fetchCategories();
  }, []);
 
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      resetState();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [orderDishes]);

  const filteredDishes = selectedCategory
    ? menuData.filter((dish) => dish.category_id === selectedCategory)
    : menuData;

  return (
    <styled.Wrapper>
      {sendToKitchenPop && (
        <PopUp togglePop={togglesendToKitchenPop}>
          <PrintComponent
            onclose={() => (window.location.href = "/work_day")}
            createComponent={(ref) => (
              <OrderSlip
                ref={ref}
                orderDishes={orderDishes}
                tableId={tableId}
              />
            )}
          />
        </PopUp>
      )}
      <styled.LeftWrapper>
        <styled.ItemMenu>
          {currentDish.id ? (
            <OrderDishCard
              data={currentDish}
              details={editOrder}
              onUpdate={editOrder ? onEditRow : onAddRow}
            ></OrderDishCard>
          ) : (
            <styled.Icon src="/generic-food-icon.png" alt="" />
          )}
        </styled.ItemMenu>
        <styled.OrderSummary>
          <styled.OrderTitle>:סיכום הזמנה </styled.OrderTitle>
          <styled.FixedTitle>
            <styled.OrderName>שם </styled.OrderName>
            <styled.OrderAmount>כמות</styled.OrderAmount>
            <styled.OrderPricePerItem>מחיר ליח' </styled.OrderPricePerItem>
            <styled.OrderTotal>סה"כ</styled.OrderTotal>
            <styled.OrderRemarks>הערות</styled.OrderRemarks>
            <styled.DeleteButton
              style={{ background: "transparent" }}
            ></styled.DeleteButton>
          </styled.FixedTitle>
          <styled.OrderLineWrapper>
            {orderDishes.map(function (data, index) {
              return (
                <styled.OrderLine
                  onClick={(e: any) => handleRowClick(data, e)}
                  index={index}
                >
                  <styled.OrderName>{data.dish_name}</styled.OrderName>
                  <styled.OrderAmount>{data.amount}</styled.OrderAmount>
                  <styled.OrderPricePerItem>
                    {data.total/data.amount}
                  </styled.OrderPricePerItem>
                  <styled.OrderPricePerItem>
                    {data.total}
                  </styled.OrderPricePerItem>
                  <styled.OrderRemarks title={data.notes}>{data.notes}</styled.OrderRemarks>
                  <styled.DeleteButton
                    name="delete"
                    onClick={() => handleDelete(index)}
                  >
                    x
                  </styled.DeleteButton>
                </styled.OrderLine>
              );
            })}
          </styled.OrderLineWrapper>
          <styled.totalDiv>
            <styled.TotalPayment>
              סה"כ לתשלום: &emsp;
              {Boolean(currentTotal) && fixedNumber(currentTotal)}
            </styled.TotalPayment>
            <styled.RedText>
              {Boolean(currentTotal) && `+ ${fixedNumber(totalPayment)} = `}
              {fixedNumber(totalPayment + (currentTotal || 0))} ש"ח
            </styled.RedText>
          </styled.totalDiv>
        </styled.OrderSummary>
        <styled.TwoBottons>
          <styled.CanceleButton
            onClick={() => {
              window.location.href = "/work_day";
            }}
          >
            בטל
          </styled.CanceleButton>
          <styled.SendToTheKitchen
            disabled={orderDishes.length === 0}
            onClick={submit}
          >
            שלח למטבח
          </styled.SendToTheKitchen>
        </styled.TwoBottons>
      </styled.LeftWrapper>
      <styled.RightWrapper>
        <styled.SideTextAndDishes>
          <styled.StyledSelect onChange={handleChange}>
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </styled.StyledSelect>
          {tableName === "Take Away" ? (
            <styled.RightSideText>Take Away</styled.RightSideText>
          ) : (
            <styled.RightSideText>
              הזמנה לשולחן {tableName}:
            </styled.RightSideText>
          )}
        </styled.SideTextAndDishes>
        <styled.Dishes>
          {filteredDishes.map((dish) => (
            <styled.DishCard>
              <MetaDishCard
                key={dish.id}
                dish={dish}
                onClick={handleCardClick}
              />
            </styled.DishCard>
          ))}
        </styled.Dishes>
      </styled.RightWrapper>
      {payTakeAway && (
        <PopUp togglePop={togglePayTakeAway}>
          <PayOrder
            onPay={() => {
              togglePayTakeAway()
              togglesendToKitchenPop()

            }}
            onClose={togglePayTakeAway}
            total={totalPayment}
            table_id={tableId}
            order_id={orderData.order.id}
          />
        </PopUp>
      )}
    </styled.Wrapper>
  );
};

export default PlaceAnOrder;
