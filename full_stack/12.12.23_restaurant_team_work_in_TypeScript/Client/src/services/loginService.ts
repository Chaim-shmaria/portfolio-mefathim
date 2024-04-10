import axios from "axios";

const url = process.env.REACT_APP_URL || "http://localhost:8888"

const ROUTE_NAME = "login"

export const checkAccessDetails = (userName:string, password:string) => {
    return axios.get(`${url}/${ROUTE_NAME}?userName=${userName}&password=${password}`)
    .catch((error) => {
        return Promise.reject(error);
    })
}