import { AxiosResponse } from "axios";
import { getAll, getByColumn, addItem, deleteItem, updateItem, getActive } from "./baseService";

export const getOrders = () => {
  return getAll('diners_orders').then((res: AxiosResponse | any) => {
    if (res && 'data' in res) {
      return res.data;
    } else {
      return [];
    }
  });
};

export const getByColumnData = (column: string, value: string) => {
  return getByColumn('diners_orders', column, value).then((res: AxiosResponse | any) => {
    if (res && 'data' in res) {
      return res.data;
    } else {
      return [];
    }
  });
};

export const getOrderWithDishes = (orderId: number) => {
  return getByColumn('diners_orders', 'id', orderId).then((res: AxiosResponse | any) => {
    if (res && 'data' in res) {
      return res.data;
    } else {
      return {};
    }
  });
};


export const getActiveOrders = () => {
  return getActive('diners_orders').then((res: AxiosResponse | any) => {
    if (res && 'data' in res) {
      return res.data;
    } else {
      return [];
    }
  });
};

export const addOrder = (data: any) => {
  return addItem('diners_orders', data).then((res: AxiosResponse | any) => {
    if (res && 'data' in res) {
      return res.data;
    } else {
      return { error: 'Error adding order'};
    }
  });
};

export const deleteOrder = (id: number) => {
  return deleteItem('diners_orders', id).then((res: AxiosResponse | any) => {
    if (res && 'data' in res) {
      return res.data;
    } else {
      return { error: 'Error deleting order' };
    }
  });
};

export const updateOrder = (id: number, data: any) => {
  return updateItem('diners_orders', id, data).then((res: AxiosResponse | any) => {
    if (res && 'data' in res) {
      return res.data;
    } else {
      return { error: 'Error updating order'};
    }
  });
};

export const payOrder = (id: number, data: any) => {
  return updateItem('diners_orders/pay', id, data).then((res: AxiosResponse | any) => {
    if (res && 'data' in res) {
      return res.data;
    } else {
      return { error: 'Error updating order'};
    }
  });
};