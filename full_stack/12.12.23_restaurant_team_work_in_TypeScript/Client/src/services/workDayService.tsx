import { AxiosResponse } from 'axios';
import { addItem } from './baseService';

export const getData = async ( password: string) => {
  try {
    const response = await addItem('work_day', {password: password })as AxiosResponse<any, Record<string, any>>;
    return response.status


  } catch (error) {
    console.log("service respone", error);
  }

}; 