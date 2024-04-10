import React, { forwardRef, useRef } from 'react';
import * as styled from './orderSlip.styles';
import { orderDish } from '../../dataTypes/dish';
import { format } from 'date-fns';

const OrderSlip =({ orderDishes, tableId, ref }: {
   orderDishes: orderDish[], tableId: string ,ref: React.Ref<HTMLDivElement> | null} 
   ) => {

    const dateAndTime = new Date();

    return (
      <styled.Wrapper ref={ref}>
        <styled.title>הזמנה למטבח</styled.title>
        <styled.information>
          <styled.TableOrderId>{tableId} :מספר שולחן</styled.TableOrderId>
          <styled.TableOrderId>
            {orderDishes[0].dish_id} :מספר הזמנה
          </styled.TableOrderId>
          <styled.DateAndTimeBox>
            <styled.DateAndTime>
              {format(dateAndTime, 'dd/MM/yyyy')} : תאריך
            </styled.DateAndTime>
            <styled.DateAndTime>
              {format(dateAndTime, 'HH:mm:ss')} : שעה
            </styled.DateAndTime>
          </styled.DateAndTimeBox>
        </styled.information>
        <styled.TableLine>
          <styled.OrderDetails>שם המנה</styled.OrderDetails>
          <styled.OrderDetails>כמות</styled.OrderDetails>
          <styled.OrderDetails>הערות</styled.OrderDetails>
        </styled.TableLine>
        <styled.OrderDetailsBox>
          {orderDishes.map((data, index) => (
            <styled.OrderLine index={index}>
              <styled.OrderDetails>{data.dish_name}</styled.OrderDetails>
              <styled.OrderDetails>{data.amount}</styled.OrderDetails>
              <styled.OrderDetails>{data.notes}</styled.OrderDetails>
            </styled.OrderLine>
          ))}
        </styled.OrderDetailsBox>
      </styled.Wrapper>
    );
  }
;

export default OrderSlip;
