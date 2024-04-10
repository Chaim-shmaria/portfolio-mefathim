import axios, { AxiosResponse } from 'axios';

import{
    getAll,
    addItem,
    deleteItem,
    updateItem,
    makeActiveItem,
    uploadImg,
    deleteImg,
    getActive,
} from './baseService'
import { IUser } from '@/dataTypes/user';

const url = process.env.REACT_APP_URL



export const sendImg = (data:FormData)=>{
    return uploadImg('users',data)
}


export const removeImg = (data:string|number)=>{
    return deleteImg('users',data)
}

export const  getActiveUsers = () => {
    return  getActive("users")
    .then((res: AxiosResponse<any, any>) =>{
        return res.data;
      })
}
export const allusers = () => {
  return getAll("users").then((res: AxiosResponse<any, any>) => {
    return res.data;
  });
};

export const deleteRow = (id: number) => {
  return deleteItem("users", id);
};

export const addRow = (data: any) => {
  return addItem("users", data);
};

export const updateRow = (id:number|null, data:any) => {
    return updateItem("users", id, data)
}
export const makeActive=(obj:IUser)=>{
    return makeActiveItem('users',obj)
  }


export const checkUserPassword = (userName:string, password:string) => {
    return axios.get(`${url}/users/check/?userName=${userName}&password=${password}`)
    .catch((error) => {
        return Promise.reject(error);
    })
}
